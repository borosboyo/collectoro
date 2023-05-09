package hu.bme.aut.collectoro.controller

import hu.bme.aut.collectoro.dto.transaction.ProcessTransactionReq
import hu.bme.aut.collectoro.dto.transaction.ProcessTransactionResp
import hu.bme.aut.collectoro.service.TransactionService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.jetbrains.annotations.NotNull
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
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
    @ApiOperation(value = "processTransaction", response = ProcessTransactionResp::class)
    fun register(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "ProcessTransactionReq"
        ) request: ProcessTransactionReq
    ): ResponseEntity<ProcessTransactionResp> {
        return ResponseEntity.ok(transactionService.processTransaction(request))
    }


}