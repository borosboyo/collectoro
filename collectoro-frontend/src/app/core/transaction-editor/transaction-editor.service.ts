
import {axiosConfig, baseOptions} from "../../shared/axios-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ProcessTransactionReqCurrencyEnum, TransactionControllerApiFactory} from "../../../../swagger";

const TransactionEditorService = {
    transactionController: TransactionControllerApiFactory(axiosConfig),

    processTransaction: async function(purpose: string, who: any, forWhom: any, groupEntityId: number, amount: number, type: ProcessTransactionReqTypeEnum): Promise<any> {
        //remove elements from who and forWhom arrays that have 0 amount
        who = who.filter((element: any) => element.amount > 0);
        forWhom = forWhom.filter((element: any) => element.amount > 0);
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        return this.transactionController.processTransaction({
            purpose: purpose,
            type: type,
            currency: ProcessTransactionReqCurrencyEnum.HUF,
            who: who,
            forWhom: forWhom,
            groupEntityId: groupEntityId
        }, baseOptions)
    },

}

export default TransactionEditorService;
