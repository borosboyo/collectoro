import { StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList} from "../shared/root-stack-param-list";

export type GroupNavigation = StackNavigationProp<
    RootStackParamList,
    'Home'
>;

export type GroupNavigationProps = {
    navigation: GroupNavigation;
};