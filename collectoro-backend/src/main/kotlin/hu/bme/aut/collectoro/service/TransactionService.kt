package hu.bme.aut.collectoro.service

import hu.bme.aut.collectoro.domain.Balance
import hu.bme.aut.collectoro.domain.transaction.*
import hu.bme.aut.collectoro.dto.transaction.DeleteTransactionReq
import hu.bme.aut.collectoro.dto.transaction.DeleteTransactionResp
import hu.bme.aut.collectoro.dto.transaction.ProcessTransactionReq
import hu.bme.aut.collectoro.dto.transaction.ProcessTransactionResp
import hu.bme.aut.collectoro.repository.*
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class TransactionService(
    private val transactionRepository: TransactionRepository,
    private val groupRepository: GroupRepository,
    private val userRepository: UserRepository,
    private val balanceRepository: BalanceRepository,
    private val subTransactionRepository: SubTransactionRepository
) {

    @Transactional
    fun processTransaction(req: ProcessTransactionReq): ProcessTransactionResp {
        val transaction: Transaction = Transaction.Builder()
            .purpose(req.purpose)
            .currency(req.currency)
            .type(req.type)
            .who(req.who)
            .forWhom(req.forWhom)
            .groupEntity(groupRepository.findById(req.groupEntityId).get())
            .build()
        transactionRepository.save(transaction)
        when (req.type) {
            TransactionType.TRANSFER -> processTransfer(req)
            TransactionType.INCOME -> processIncome(req)
            TransactionType.EXPENSE -> processExpense(req)
        }

        return ProcessTransactionResp()
    }

    private fun calculateNumberOfParticipants(req: ProcessTransactionReq): Pair<Int, Int> {
        var numberOfPeopleWho: Int = 0
        var numberOfPeopleForWhom: Int = 0
        for (userWithAmount in req.who) {
            if (userWithAmount.amount != 0.0) numberOfPeopleWho++
        }
        for (userWithAmount in req.forWhom) {
            if (userWithAmount.amount != 0.0) numberOfPeopleForWhom++
        }
        return Pair(numberOfPeopleWho, numberOfPeopleForWhom)
    }

    private fun processExpense(req: ProcessTransactionReq) {
        calculateSubTransactionsForExpense(req)
        for (userWithAmount in req.who) {
            val balanceDelta = userWithAmount.amount - req.forWhom.find { it.userId == userWithAmount.userId }!!.amount
            val userWallet = userRepository.findById(userWithAmount.userId).get().wallet
            val balance: Balance = balanceRepository.findBalanceByGroupIdAndWallet(req.groupEntityId, userWallet!!)
            balance.amount += balanceDelta
            balanceRepository.save(balance)
        }

    }

    private fun calculateSubTransactionsForExpense(req: ProcessTransactionReq) {
        val (numberOfPeopleWho, numberOfPeopleForWhom) = calculateNumberOfParticipants(req)
        for (userWithWhoAmount in req.who) {
            if (userWithWhoAmount.amount != 0.0) {
                val transactionAmountPerPerson = userWithWhoAmount.amount / numberOfPeopleForWhom
                for (userWithForWhomAmount in req.forWhom) {
                    if (userWithForWhomAmount.amount != 0.0) {
                        val subTransaction = SubTransaction.Builder()
                            .amount(transactionAmountPerPerson)
                            .fromId(userWithWhoAmount.userId)
                            .toId(userWithForWhomAmount.userId)
                            .build()
                        subTransactionRepository.save(subTransaction)
                        break
                    }
                }
            }
        }
    }

    private fun processIncome(req: ProcessTransactionReq) {
        calculateSubTransactionsForIncome(req)
        for (userWithAmount in req.who) {
            val balanceDelta = userWithAmount.amount - req.forWhom.find { it.userId == userWithAmount.userId }!!.amount
            val userWallet = userRepository.findById(userWithAmount.userId).get().wallet
            val balance: Balance = balanceRepository.findBalanceByGroupIdAndWallet(req.groupEntityId, userWallet!!)
            balance.amount -= balanceDelta
            balanceRepository.save(balance)
        }
    }

    private fun calculateSubTransactionsForIncome(req: ProcessTransactionReq) {
        val (numberOfPeopleWho, numberOfPeopleForWhom) = calculateNumberOfParticipants(req)
        for (userWithWhoAmount in req.who) {
            if (userWithWhoAmount.amount != 0.0) {
                val transactionAmountPerPerson = userWithWhoAmount.amount / numberOfPeopleForWhom
                for (userWithForWhomAmount in req.forWhom) {
                    if (userWithForWhomAmount.amount != 0.0) {
                        val subTransaction = SubTransaction.Builder()
                            .amount(-transactionAmountPerPerson)
                            .fromId(userWithWhoAmount.userId)
                            .toId(userWithForWhomAmount.userId)
                            .build()
                        subTransactionRepository.save(subTransaction)
                        break
                    }
                }
            }
        }
    }

    private fun processTransfer(req: ProcessTransactionReq) {
        for (userWithWhoAmount in req.who) {
            val userWallet = userRepository.findById(userWithWhoAmount.userId).get().wallet
            val balance: Balance = balanceRepository.findBalanceByGroupIdAndWallet(req.groupEntityId, userWallet!!)
            balance.amount += userWithWhoAmount.amount
            balanceRepository.save(balance)
        }
        for (userWithForWhomAmount in req.forWhom) {
            val userWallet = userRepository.findById(userWithForWhomAmount.userId).get().wallet
            val balance: Balance = balanceRepository.findBalanceByGroupIdAndWallet(req.groupEntityId, userWallet!!)
            balance.amount -= userWithForWhomAmount.amount
            balanceRepository.save(balance)
        }
    }

    private fun calculateSubTransactionsForTransfer(req: ProcessTransactionReq) {
        val (numberOfPeopleWho, numberOfPeopleForWhom) = calculateNumberOfParticipants(req)
        for (userWithWhoAmount in req.who) {
            if (userWithWhoAmount.amount != 0.0) {
                val transactionAmountPerPerson = userWithWhoAmount.amount / numberOfPeopleForWhom
                for (userWithForWhomAmount in req.forWhom) {
                    if (userWithForWhomAmount.amount != 0.0) {
                        val subTransaction = SubTransaction.Builder()
                            .amount(transactionAmountPerPerson)
                            .fromId(userWithWhoAmount.userId)
                            .toId(userWithForWhomAmount.userId)
                            .build()
                        subTransactionRepository.save(subTransaction)
                        break
                    }
                }
            }
        }
    }

    @Transactional
    fun deleteTransaction(req: DeleteTransactionReq): DeleteTransactionResp {
        transactionRepository.deleteById(req.transactionId)
        return DeleteTransactionResp()
    }


    @Transactional
    fun balanceOutBalances() {

    }

    @Transactional
    fun test() : ProcessTransactionReq {
        var userWithAmount = UserWithAmount.Builder()
            .userId(1)
            .amount(100.0)
            .build()
        return ProcessTransactionReq.Builder()
            .purpose("req.purpose")
            .currency(Currency.HUF)
            .type(TransactionType.EXPENSE)
            .who(mutableListOf(userWithAmount,userWithAmount,userWithAmount))
            .forWhom(mutableListOf(userWithAmount,userWithAmount,userWithAmount))
            .groupEntityId(1)
            .build()
    }
}