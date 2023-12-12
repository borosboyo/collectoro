import {GroupEntity} from "../../../../swagger/index";

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
    TransactionSave: undefined,
    EditWho: { group: GroupEntity | undefined },
    EditWhoMultipleMember: { group: GroupEntity | undefined },
};
