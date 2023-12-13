import {axiosConfig, baseOptions} from "../../shared/config/axios-config";
import {
    ImageControllerApiFactory,
    ProcessTransactionReqCurrencyEnum,
    ProcessTransactionReqTypeEnum,
    TransactionControllerApiFactory, UserControllerApi, UserControllerApiFactory
} from "../../../../swagger/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TransactionEditorService = {
    transactionController: TransactionControllerApiFactory(axiosConfig),
    userController: UserControllerApiFactory(axiosConfig),
    imageController: ImageControllerApiFactory(axiosConfig),

    processTransaction: async function (purpose: string, who: any, forWhom: any, groupEntityId: number, type: ProcessTransactionReqTypeEnum): Promise<any> {
        //remove elements from who and forWhom arrays that have 0 amount
        who = who.filter((element: any) => element.amount > 0);
        forWhom = forWhom.filter((element: any) => element.amount > 0);
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        console.log("purpose: " + purpose);
        console.log(who);
        console.log(forWhom);
        console.log("groupEntityId: " + groupEntityId);
        console.log("type: " + type);
        return this.transactionController.processTransaction({
            purpose: purpose,
            currency: ProcessTransactionReqCurrencyEnum.HUF,
            type: type,
            who: who,
            forWhom: forWhom,
            groupEntityId: groupEntityId
        }, baseOptions)
    },

    getSelectedAvatar: async function (email: string): Promise<any> {
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        return this.imageController.downloadImage({
            imageName: email
        }, baseOptions)
    }

}

export default TransactionEditorService;
