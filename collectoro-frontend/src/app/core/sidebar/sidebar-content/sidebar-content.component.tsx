import {Box, CloseIcon, Divider, Pressable, Text, useColorModeValue, VStack} from "native-base";
import React, {useEffect, useState} from "react";
import {DrawerContentComponentProps} from "@react-navigation/drawer";
import {SidebarModalHolderComponent} from "./sidebar-modal-holder/sidebar-modal-holder.component";
import SidebarProfileSection from "./sidebar-sections/sidebar-profile-section";
import SideBarButtonsSection from "./sidebar-sections/sidebar-buttons-section";
import SidebarService from "../sidebar.service";
import {styles} from "../../../shared/components/styles";
import {SidebarNavigation} from "../sidebar-navigation.props";
import {GetProfileByUserEmailResp} from "../../../../../swagger";
import {AppContext} from "../../../shared/components/appcontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeService from "../../home/home.service";

type SidebarContentComponentProps = DrawerContentComponentProps & {
    navigation: SidebarNavigation;
}
export default function SidebarContentComponent(props: SidebarContentComponentProps) {
    const [profile, setProfile] = useState<GetProfileByUserEmailResp>({});
    const [homePage, setHomePage] = useState<any>({});
    const [isProfileModalVisible, setIsProfileModalVisible] = useState<boolean>(false);
    const [isMyGroupsModalVisible, setIsMyGroupsModalVisible] = useState<boolean>(false);
    const [isJoinGroupModalVisible, setIsJoinGroupModalVisible] = useState<boolean>(false);
    const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] = useState<boolean>(false);
    const textColor = useColorModeValue("white", "black");
    const bgColor = "transparent";

    useEffect(() => {
        AsyncStorage.getItem('email').then((email) => {
            SidebarService.getProfileByUserEmail(email!).then((response) => {
                setProfile(response.data)
            });
        })
        AsyncStorage.getItem('email').then((email) => {
            HomeService.getHomepageByUserEmail(email!).then((response) => {
                setHomePage(response.data);
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
        <Box bg={bgColor} mt="0">
            <VStack
                bg={bgColor}
                space="4"
                pt="16"
                divider={<Divider thickness="0.4"/>}>
                <SidebarProfileSection profile={profile} onPress={() => openProfile()}/>
            </VStack>
            <Divider mt={4} mb={4} thickness="1" color={textColor}/>
            <VStack space="2" w="100%">
                <SideBarButtonsSection onPress={() => openMyGroups()} onPress1={() => openCreateGroup()}
                                       onPress2={() => openJoinGroup()}/>
                <SidebarModalHolderComponent
                    profile={profile}
                    groups={homePage?.groups}
                    isProfileModalVisible={isProfileModalVisible}
                    isMyGroupsModalVisible={isMyGroupsModalVisible}
                    isCreateGroupModalVisible={isCreateGroupModalVisible}
                    isJoinGroupModalVisible={isJoinGroupModalVisible}
                    closeModal={() => closeModal()}></SidebarModalHolderComponent>
                <AppContext.Consumer>
                    {({isLoggedIn, setIsLoggedIn}) => (
                        <Pressable style={styles.sideBarPressable}
                                   onPress={() => {
                                       SidebarService.logout().then(() => {
                                           AsyncStorage.removeItem("token")
                                           setIsLoggedIn(false)
                                       });
                                   }}
                        >
                            <CloseIcon style={{marginEnd: 10}} size="sm" color={textColor}/>
                            <Text color={textColor} fontSize="md">Sign out</Text>
                        </Pressable>
                    )}
                </AppContext.Consumer>
            </VStack>
        </Box>
    )
}
