import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../shared/root-stack-param-list";

export type RegisterNavigation = StackNavigationProp<
    RootStackParamList,
    'Login',
    'EnableAccount'
>;

export type RegisterNavigationProps = {
    navigation: RegisterNavigation;
};