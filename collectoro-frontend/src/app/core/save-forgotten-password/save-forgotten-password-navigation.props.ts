import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../shared/root-stack-param-list";

export type SaveForgottenPasswordNavigation = StackNavigationProp<
    RootStackParamList,
    'ForgotPassword'
>;

export type SaveForgottenPasswordNavigationProps = {
    navigation: SaveForgottenPasswordNavigation;
};