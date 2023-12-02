import {DrawerContentComponentProps, DrawerContentScrollView} from '@react-navigation/drawer';
import React from "react";
import SidebarContentComponent from "./sidebar-content/sidebar-content.component";
import {ImageBackground} from "react-native";

export default function SidebarComponent(props: DrawerContentComponentProps) {

    return (
        <ImageBackground source={require('../../../assets/sidebar-background.png')}
                         resizeMode="cover"
                         style={{flex: 1, justifyContent: 'center'}}>
            <DrawerContentScrollView {...props} style={{display: 'flex'}}>
                <SidebarContentComponent {...props}/>
            </DrawerContentScrollView>
        </ImageBackground>
    );
}
