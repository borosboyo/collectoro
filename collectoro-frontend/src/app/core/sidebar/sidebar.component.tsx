import {
    DrawerContentScrollView,
    DrawerContentComponentProps
} from '@react-navigation/drawer';
import React, {useContext} from "react";
import {AppContext} from "../../../../App";
import SidebarContentComponent from "./sidebar-content.component";

export default function SidebarComponent(props: DrawerContentComponentProps) {

    return (
        <DrawerContentScrollView {...props} style={{display: 'flex'}}>
            <SidebarContentComponent {...props}></SidebarContentComponent>
        </DrawerContentScrollView>
);
}