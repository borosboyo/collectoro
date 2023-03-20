import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../shared/root-stack-param-list";

export type HomeNavigation = StackNavigationProp<
    RootStackParamList,
    'Profile'
>;

export type HomeNavigationProps = {
    navigation: HomeNavigation;
};