import {
    DrawerContentScrollView,
    DrawerContentComponentProps
} from '@react-navigation/drawer';
import React from "react";
import SidebarContentComponent from "./sidebar-content/sidebar-content.component";

export default function SidebarComponent(props: DrawerContentComponentProps) {

    return (
        <DrawerContentScrollView {...props} style={{display: 'flex'}}>
            <SidebarContentComponent {...props}/>
        </DrawerContentScrollView>
);
}
