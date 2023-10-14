import {GroupEntity} from "../../../../swagger";

export type RootStackParamList = {
    Home: undefined,
    TransactionEditor: { group: GroupEntity | undefined },
    LoginStack: undefined,
    Register: undefined,
    ForgotPassword: undefined,
    SaveForgotPassword: undefined,
    Login: undefined,
    EnableAccount: undefined,
    Calculator: undefined,
};
