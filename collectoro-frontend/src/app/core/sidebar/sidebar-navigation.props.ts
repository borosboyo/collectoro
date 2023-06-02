import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../shared/root-stack-param-list";

export type SidebarNavigation = StackNavigationProp<
    RootStackParamList,
    'Home',
    'TransactionEditor'
>;

export type SidebarNavigationProps = {
    navigation: SidebarNavigation;
};