import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../../shared/root-stack-param-list";

export type EnableAccountNavigation = StackNavigationProp<
    RootStackParamList,
    'Register',
    'EnableAccount'
>;

export type EnableAccountNavigationProps = {
    navigation: EnableAccountNavigation;
};