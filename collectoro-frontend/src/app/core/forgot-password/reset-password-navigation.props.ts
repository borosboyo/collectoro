import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../shared/root-stack-param-list";

export type ResetPasswordNavigation = StackNavigationProp<
    RootStackParamList,
    'Login'
>;

export type ResetPasswordNavigationProps = {
    navigation: ResetPasswordNavigation;
};