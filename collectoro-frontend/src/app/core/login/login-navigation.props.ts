import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../shared/config/root-stack-param-list";

export type LoginNavigation = StackNavigationProp<
    RootStackParamList,
    'Register'
>;

export type LoginNavigationProps = {
    navigation: LoginNavigation;
};
