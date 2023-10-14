import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../shared/config/root-stack-param-list";
import {DrawerContentComponentProps} from "@react-navigation/drawer";

export type SidebarNavigation = StackNavigationProp<
    RootStackParamList,
    'Home',
    'TransactionEditor'
>;

export type SidebarNavigationProps = DrawerContentComponentProps & {
    navigation: SidebarNavigation;
}

