import {
    Box,
    CloseIcon,
    Divider,
    Pressable,
    Text,
    VStack
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";
import {DrawerContentComponentProps} from "@react-navigation/drawer";
import {SidebarModalHolderComponent} from "./sidebar-modal-holder/sidebar-modal-holder.component";
import SidebarProfileSection from "./sidebar-sections/sidebar-profile-section";
import SideBarButtonsSection from "./sidebar-sections/sidebar-buttons-section";
import SidebarService from "../sidebar.service";
import {styles} from "../../../shared/components/styles";
import {SidebarNavigation} from "../sidebar-navigation.props";
import { AppContext } from "../../../../../App";
import {GetProfileByUserEmailResp} from "../../../../../swagger";

type SidebarContentComponentProps = DrawerContentComponentProps & {
    navigation: SidebarNavigation;
}
export default function SidebarContentComponent(props: SidebarContentComponentProps) {
    const [profile, setProfile] = useState<GetProfileByUserEmailResp>({});
    const [isProfileModalVisible, setIsProfileModalVisible] = useState<boolean>(false);
    const [isMyGroupsModalVisible, setIsMyGroupsModalVisible] = useState<boolean>(false);
    const [isJoinGroupModalVisible, setIsJoinGroupModalVisible] = useState<boolean>(false);
    const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] = useState<boolean>(false);

    useEffect(() => {
        AsyncStorage.getItem('email').then((email) => {
            SidebarService.getProfileByUserEmail(email!).then((response) => {
                setProfile(response.data)
            });
        })
    }, [])

    const openProfile = () => {
        props.navigation.toggleDrawer()
        setIsProfileModalVisible(true)
    }

    const openMyGroups = () => {
        props.navigation.toggleDrawer()
        setIsMyGroupsModalVisible(true)
    }

    const openJoinGroup = () => {
        props.navigation.toggleDrawer()
        setIsJoinGroupModalVisible(true)
    }

    const openCreateGroup = () => {
        props.navigation.toggleDrawer()
        setIsCreateGroupModalVisible(true)
    }

    const closeModal = () => {
        setIsProfileModalVisible(false)
        setIsMyGroupsModalVisible(false)
        setIsJoinGroupModalVisible(false)
        setIsCreateGroupModalVisible(false)
        props.navigation.toggleDrawer()
    }

    return (
        <Box bg="black" mt="0">
            <VStack
                bg="black"
                space="4"
                pt="16"
                divider={<Divider thickness="0.4"/>}>
                <SidebarProfileSection profile={profile} onPress={() => openProfile()}/>
            </VStack>
            <Divider m="4" thickness="0.4"/>
            <VStack space="2" w="100%">
                <SideBarButtonsSection onPress={() => openMyGroups()} onPress1={() => openCreateGroup()}
                                       onPress2={() => openJoinGroup()}/>
                <SidebarModalHolderComponent isProfileModalVisible={isProfileModalVisible}
                                             isMyGroupsModalVisible={isMyGroupsModalVisible}
                                             isCreateGroupModalVisible={isCreateGroupModalVisible}
                                             isJoinGroupModalVisible={isJoinGroupModalVisible}
                                             closeModal={() => closeModal()}></SidebarModalHolderComponent>
                <AppContext.Consumer>
                    {({isLoggedIn, setIsLoggedIn}) => (
                        <Pressable style={styles.sideBarPressable}
                                   onPress={() => {
                                       SidebarService.logout().then(() => {
                                           setIsLoggedIn(false)
                                           AsyncStorage.removeItem('token')
                                       });
                                   }}
                        >
                            <CloseIcon style={{marginEnd: 10}} size="sm" color="white"/>
                            <Text color="warmGray.100" fontSize="md">Sign out</Text>
                        </Pressable>
                    )}
                </AppContext.Consumer>
            </VStack>
        </Box>
    )
}
