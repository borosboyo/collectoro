import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../shared/root-stack-param-list";

export type ForgotPasswordNavigation = StackNavigationProp<
    RootStackParamList,
    'Login'
>;

export type ForgotPasswordNavigationProps = {
    navigation: ForgotPasswordNavigation;
};