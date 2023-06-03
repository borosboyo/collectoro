import {RootStackParamList} from "../../shared/root-stack-param-list";
import {DrawerNavigationProp} from "@react-navigation/drawer";

export type TransactionEditorNavigation = DrawerNavigationProp<
    RootStackParamList
>;

export type TransactionEditorNavigationProps = {
    navigation: TransactionEditorNavigation;
};