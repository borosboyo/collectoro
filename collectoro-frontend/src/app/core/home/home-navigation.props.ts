import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../shared/config/root-stack-param-list";

export type HomeNavigation = StackNavigationProp<
    RootStackParamList,
    'EditWho'
>;

export type HomeNavigationProps = {
    navigation: HomeNavigation;
};

