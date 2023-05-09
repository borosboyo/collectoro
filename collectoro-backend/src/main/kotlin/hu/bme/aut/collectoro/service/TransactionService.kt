package hu.bme.aut.collectoro.service

import hu.bme.aut.collectoro.domain.transaction.Transaction
import hu.bme.aut.collectoro.domain.transaction.TransactionType
import hu.bme.aut.collectoro.dto.transaction.DeleteTransactionReq
import hu.bme.aut.collectoro.dto.transaction.DeleteTransactionResp
import hu.bme.aut.collectoro.dto.transaction.ProcessTransactionReq
import hu.bme.aut.collectoro.dto.transaction.ProcessTransactionResp
import hu.bme.aut.collectoro.repository.GroupRepository
import hu.bme.aut.collectoro.repository.TransactionRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class TransactionService(
    private val transactionRepository: TransactionRepository,
    private val groupRepository: GroupRepository
) {

    //ProcessTransaction
    @Transactional
    fun processTransaction(req: ProcessTransactionReq): ProcessTransactionResp {
        val transaction : Transaction = Transaction.Builder()
            .purpose(req.purpose)
            .currency(req.currency)
            .type(req.type)
            .who(req.who)
            .forWhom(req.forWhom)
            .groupEntity(groupRepository.findById(req.groupEntityId).get())
            .build()
        when(req.type) {
            TransactionType.TRANSFER -> processTransfer(req)
            TransactionType.INCOME -> processIncome(req)
            TransactionType.EXPENSE -> processExpense(req)
        }

        return ProcessTransactionResp()
    }

    private fun processExpense(req: ProcessTransactionReq) {
        //iterate req.who
        for((userId, amount) in req.who) {
            var perUserDeductible = amount / req.who.size
            var balanceDeltaForWho = amount
            if(req.forWhom.get(userId) != null) {
                balanceDeltaForWho = amount - req.forWhom.get(userId)!!
            }
        }
    }

    private fun processIncome(req: ProcessTransactionReq) {

    }

    private fun processTransfer(req: ProcessTransactionReq) {

    }

    //DeleteTransaction
    @Transactional
    fun deleteTransaction(req: DeleteTransactionReq): DeleteTransactionResp {
        return DeleteTransactionResp()
    }


    //Balance out algorithm
    @Transactional
    fun balanceOut() {

    }
}