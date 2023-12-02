import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../shared/config/root-stack-param-list";

export type SaveForgotPasswordNavigation = StackNavigationProp<
    RootStackParamList,
    'ForgotPassword'
>;

export type SaveForgotPasswordNavigationProps = {
    navigation: SaveForgotPasswordNavigation;
};
