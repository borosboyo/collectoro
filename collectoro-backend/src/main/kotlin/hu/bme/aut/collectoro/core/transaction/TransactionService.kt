package hu.bme.aut.collectoro.core.transaction

import hu.bme.aut.collectoro.core.group.GroupRepository
import hu.bme.aut.collectoro.core.transaction.dto.DeleteTransactionReq
import hu.bme.aut.collectoro.core.transaction.dto.DeleteTransactionResp
import hu.bme.aut.collectoro.core.transaction.dto.ProcessTransactionReq
import hu.bme.aut.collectoro.core.transaction.dto.ProcessTransactionResp
import hu.bme.aut.collectoro.core.transaction.util.*
import hu.bme.aut.collectoro.core.user.UserRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.math.RoundingMode
import java.util.*
import kotlin.math.abs

@Service
class TransactionService(
    private val transactionRepository: TransactionRepository,
    private val groupRepository: GroupRepository,
    private val userRepository: UserRepository,
    private val balanceRepository: BalanceRepository,
    private val userWithAmountRepository: UserWithAmountRepository
) {
    private val parm: MutableMap<Long, Double> = mutableMapOf()

    @Transactional
    fun processTransaction(req: ProcessTransactionReq): ProcessTransactionResp {
        var resp = ProcessTransactionResp()
        val transaction = Transaction(
            purpose = req.purpose,
            currency = req.currency,
            type = req.type,
            who = req.who,
            forWhom = req.forWhom,
            groupEntity = groupRepository.findById(req.groupEntityId).get()
        )
        val savedTransaction = transactionRepository.save(transaction)
        req.who.forEach {
            it.transaction = savedTransaction
            userWithAmountRepository.save(it)
        }
        req.forWhom.forEach {
            it.transaction = savedTransaction
            userWithAmountRepository.save(it)
        }
        when (req.type) {
            TransactionType.TRANSFER -> processTransfer(req, resp)
            TransactionType.INCOME -> processIncome(req, resp)
            TransactionType.EXPENSE -> processExpense(req, resp)
        }
        return resp
    }

    private fun processExpense(req: ProcessTransactionReq, resp: ProcessTransactionResp) {
        for (userWithAmount in req.who) {
            val userWithAmountInForWhom = req.forWhom.find { it.userId == userWithAmount.userId }
            var balanceDelta = userWithAmount.amount
            if (userWithAmountInForWhom != null) {
                balanceDelta -= userWithAmountInForWhom.amount
            }
            val userWallet = userRepository.findById(userWithAmount.userId).get().wallet
            val balance: Balance = userWallet?.balances?.find { it.groupId == req.groupEntityId }!!
            balance.amount += balanceDelta
            balanceRepository.save(balance)
        }
        for (userWithAmountInForWhom in req.forWhom) {
            val userWallet = userRepository.findById(userWithAmountInForWhom.userId).get().wallet
            val balance: Balance = userWallet?.balances?.find { it.groupId == req.groupEntityId }!!
            balance.amount -= userWithAmountInForWhom.amount
            balanceRepository.save(balance)
        }
        resp.debtBalanceResult = balanceOutBalances(req.groupEntityId)
    }

    private fun processIncome(req: ProcessTransactionReq, resp: ProcessTransactionResp) {
        for (userWithAmount in req.who) {
            val userWithAmountInForWhom = req.forWhom.find { it.userId == userWithAmount.userId }
            var balanceDelta = userWithAmount.amount
            if (userWithAmountInForWhom != null) {
                balanceDelta += userWithAmountInForWhom.amount
            }
            val userWallet = userRepository.findById(userWithAmount.userId).get().wallet
            val balance: Balance = userWallet?.balances?.find { it.groupId == req.groupEntityId }!!
            balance.amount -= balanceDelta
            balanceRepository.save(balance)
        }
        for (userWithAmountInForWhom in req.forWhom) {
            val userWallet = userRepository.findById(userWithAmountInForWhom.userId).get().wallet
            val balance: Balance = userWallet?.balances?.find { it.groupId == req.groupEntityId }!!
            balance.amount += userWithAmountInForWhom.amount
            balanceRepository.save(balance)
        }
        resp.debtBalanceResult = balanceOutBalances(req.groupEntityId)
    }

    private fun processTransfer(req: ProcessTransactionReq, resp: ProcessTransactionResp) {
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
        resp.debtBalanceResult = balanceOutBalances(req.groupEntityId)
    }

    fun balanceOutBalances(groupId: Long): MutableList<Debt>? {
        val balances: List<Balance> = balanceRepository.findBalancesByGroupId(groupId)
        val details: MutableMap<Long, Double> = mutableMapOf()
        for (balance in balances) {
            balance.wallet?.userEntity?.id?.let { details.put(it, balance.amount) }
        }
        return findPath(details)
    }

    //@Transactional
    //fun test(): ProcessTransactionReq {
    //    findPath(this.parm)
    //    //return ProcessTransactionReq.Builder()
    //    //    .purpose("req.purpose")
    //    //    .currency(Currency.HUF)
    //    //    .type(TransactionType.EXPENSE)
    //    //    .who(mutableListOf(UserWithAmount.Builder().userId(2).lastName("Test2").amount(100.0).build()))
    //    //    .forWhom(mutableListOf(UserWithAmount.Builder().userId(3).lastName("Test3").amount(100.0).build()))
    //    //    .groupEntityId(7)
    //    //    .build()
    //    return ProcessTransactionReq()
    //}

    fun findPath(details: MutableMap<Long, Double>): MutableList<Debt>? {
        var debtBalanceResult: MutableList<Debt> = mutableListOf()
        val maxValue = Collections.max(details.values) as Double
        val minValue = Collections.min(details.values) as Double
        if (maxValue != minValue) {
            val maxKey: Long? = getKeyFromValue(details, maxValue)
            val minKey: Long? = getKeyFromValue(details, minValue)
            if (maxKey == null || minKey == null) return null
            var result = maxValue + minValue
            result = round(result, 1)
            if (result >= 0.0) {
                debtBalanceResult.add(
                    Debt.Builder()
                        .fromUserId(minKey).fromUserLastName(userRepository.findById(minKey).get().lastName)
                        .toUserId(maxKey).toUserLastName(userRepository.findById(maxKey).get().lastName)
                        .amount(round(abs(minValue), 2)).build()
                )
                details.remove(maxKey)
                details.remove(minKey)
                details[maxKey] = result
                details[minKey] = 0.0
            } else {
                debtBalanceResult.add(
                    Debt.Builder()
                        .fromUserId(minKey).fromUserLastName(userRepository.findById(minKey).get().lastName)
                        .toUserId(maxKey).toUserLastName(userRepository.findById(maxKey).get().lastName)
                        .amount(round(abs(maxValue), 2)).build()
                )
                details.remove(maxKey)
                details.remove(minKey)
                details[maxKey] = 0.0
                details[minKey] = result
            }
            findPath(details)
        }
        return debtBalanceResult
    }

    fun getKeyFromValue(hm: MutableMap<Long, Double>, value: Double): Long? {
        for (o in hm.keys) {
            if (hm[o] == value) {
                return o
            }
        }
        return null
    }

    fun round(value: Double, places: Int): Double {
        require(places >= 0)
        var bd = BigDecimal(value)
        bd = bd.setScale(places, RoundingMode.HALF_UP)
        return bd.toDouble()
    }


    @Transactional
    fun deleteTransaction(req: DeleteTransactionReq): DeleteTransactionResp {
        transactionRepository.deleteById(req.transactionId)
        return DeleteTransactionResp()
    }

}