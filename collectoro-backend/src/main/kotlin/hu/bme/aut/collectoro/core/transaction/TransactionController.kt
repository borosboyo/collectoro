package hu.bme.aut.collectoro.core.transaction

import hu.bme.aut.collectoro.core.transaction.dto.ProcessTransactionReq
import hu.bme.aut.collectoro.core.transaction.dto.ProcessTransactionResp
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.jetbrains.annotations.NotNull
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.ws.rs.Consumes
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces

@Api(value = "TransactionController", description = "REST APIs related to Transaction")
@Path("/api/transaction")
@RestController
@RequestMapping("/api/transaction")
class TransactionController(
    private val transactionService: TransactionService
) {

    @POST
    @PostMapping("/processTransaction")
    @Path("/processTransaction")
    @Produces("application/json")
    @Consumes("application/json;charset=UTF-8")
    @ApiOperation(value = "processTransaction", response = ProcessTransactionResp::class)
    fun processTransaction(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "ProcessTransactionReq"
        ) request: ProcessTransactionReq
    ): ResponseEntity<ProcessTransactionResp> {
        return ResponseEntity.ok(transactionService.processTransaction(request))
    }

    //@GetMapping("/test")
    //fun test(): ProcessTransactionReq {
    //    return transactionService.test();
    //}
//
}