package hu.bme.aut.collectoro.service

import hu.bme.aut.collectoro.domain.Balance
import hu.bme.aut.collectoro.domain.transaction.SubTransaction
import hu.bme.aut.collectoro.domain.transaction.Transaction
import hu.bme.aut.collectoro.domain.transaction.TransactionType
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

    private fun calculateNumberOfParticiapnts(req: ProcessTransactionReq): Pair<Int, Int> {
        var numberOfPeopleWho: Int = 0
        var numberOfPeopleForWhom: Int = 0
        for ((userId, amount) in req.who) {
            if (amount != 0.0) numberOfPeopleWho++
            if (req.forWhom[userId] != 0.0) numberOfPeopleForWhom++
        }
        return Pair(numberOfPeopleWho, numberOfPeopleForWhom)
    }

    private fun processExpense(req: ProcessTransactionReq) {
        calculateSubTransactionsForExpense(req)
        for ((userId, amount) in req.who) {
            val balanceDelta = amount - req.forWhom[userId]!!
            val userWallet = userRepository.findById(userId).get().wallet
            val balance: Balance = balanceRepository.findBalanceByGroupIdAndWallet(req.groupEntityId, userWallet!!)
            balance.amount += balanceDelta
            balanceRepository.save(balance)
        }

    }

    private fun calculateSubTransactionsForExpense(req: ProcessTransactionReq) {
        val (numberOfPeopleWho, numberOfPeopleForWhom) = calculateNumberOfParticiapnts(req)
        for ((whoUserId, whoAmount) in req.who) {
            if (whoAmount != 0.0) {
                val transactionAmountPerPerson = whoAmount / numberOfPeopleForWhom
                for ((forWhomUserId, forWhomAmount) in req.forWhom) {
                    if (forWhomAmount != 0.0) {
                        val subTransaction = SubTransaction.Builder()
                            .amount(transactionAmountPerPerson)
                            .fromId(whoUserId)
                            .toId(forWhomUserId)
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
        for ((userId, amount) in req.who) {
            val balanceDelta = amount - req.forWhom[userId]!!
            val userWallet = userRepository.findById(userId).get().wallet
            val balance: Balance = balanceRepository.findBalanceByGroupIdAndWallet(req.groupEntityId, userWallet!!)
            balance.amount -= balanceDelta
            balanceRepository.save(balance)
        }
    }

    private fun calculateSubTransactionsForIncome(req: ProcessTransactionReq) {
        val (numberOfPeopleWho, numberOfPeopleForWhom) = calculateNumberOfParticiapnts(req)
        for ((whoUserId, whoAmount) in req.who) {
            if (whoAmount != 0.0) {
                val transactionAmountPerPerson = whoAmount / numberOfPeopleForWhom
                for ((forWhomUserId, forWhomAmount) in req.forWhom) {
                    if (forWhomAmount != 0.0) {
                        val subTransaction = SubTransaction.Builder()
                            .amount(-transactionAmountPerPerson)
                            .fromId(whoUserId)
                            .toId(forWhomUserId)
                            .build()
                        subTransactionRepository.save(subTransaction)
                    }
                }
            }
        }
    }

    private fun processTransfer(req: ProcessTransactionReq) {
        for ((userId, amount) in req.who) {
            val userWallet = userRepository.findById(userId).get().wallet
            val balance: Balance = balanceRepository.findBalanceByGroupIdAndWallet(req.groupEntityId, userWallet!!)
            balance.amount += amount
            balanceRepository.save(balance)
        }
        for ((userId, amount) in req.forWhom) {
            val userWallet = userRepository.findById(userId).get().wallet
            val balance: Balance = balanceRepository.findBalanceByGroupIdAndWallet(req.groupEntityId, userWallet!!)
            balance.amount -= amount
            balanceRepository.save(balance)
        }
    }

    private fun calculateSubTransactionsForTransfer(req: ProcessTransactionReq) {
        val (numberOfPeopleWho, numberOfPeopleForWhom) = calculateNumberOfParticiapnts(req)
        for ((whoUserId, whoAmount) in req.who) {
            if (whoAmount != 0.0) {
                val transactionAmountPerPerson = whoAmount / numberOfPeopleForWhom
                for ((forWhomUserId, forWhomAmount) in req.forWhom) {
                    if (forWhomAmount != 0.0) {
                        val subTransaction = SubTransaction.Builder()
                            .amount(transactionAmountPerPerson)
                            .fromId(whoUserId)
                            .toId(forWhomUserId)
                            .build()
                        subTransactionRepository.save(subTransaction)
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
}