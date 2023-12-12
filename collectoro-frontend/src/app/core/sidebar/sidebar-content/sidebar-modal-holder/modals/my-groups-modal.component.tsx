import Modal from "react-native-modal";
import {
    ArrowBackIcon,
    Box,
    Button,
    Divider,
    Heading,
    HStack,
    Pressable,
    Text,
    useColorModeValue,
    View,
    VStack
} from "native-base";
import React from "react";
import {GroupEntity} from "../../../../../../../swagger";
import {ImageBackground} from "react-native";
import sidebarService from "../../../sidebar.service";
import Toast from "react-native-toast-message";

export default function MyGroupsModalComponent(props: {
    visible: boolean,
    onPress: () => void,
    groups: Array<GroupEntity>
}) {
    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "coolGray.100");
    const subtitleColor = useColorModeValue("#6E1DCE", "#7DD6FF");

    const checkGroups = () => {
        if (props.groups === undefined || props.groups.length === 0) {
            return <>
                <View mt={3} mb={3} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: textColor}}>
                        You are not in any group yet.
                    </Text>
                </View>
                <Divider thickness="1" bgColor={textColor}/>
            </>
        } else {
            return props.groups.map((group: GroupEntity) => {
                return <Box key={group.id}>
                    {group.archived == false ?
                        <Box>
                            <View mt={3} mb={3} style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View ml={5} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{fontSize: 16, fontWeight: 'bold', color: textColor}}>
                                        {group?.name}
                                    </Text>
                                    <Pressable onPress={() => {
                                        sidebarService.toggleGroupArchive(group.id!!).then(() => {
                                            props.onPress()
                                        });
                                    }}>
                                        <Text mr={5} style={{fontSize: 14, color: textColor}}>
                                            Archive
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                            <Divider thickness="1" bgColor={textColor}/>
                        </Box>
                        : <></>}
                </Box>
            })
        }
    }

    const checkArchivedGroups = () => {
        if (props.groups === undefined || props.groups.length === 0 || !checkIfArchivedGroupsExist()) {
            return <>
                <View mt={3} mb={3} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 16, color: textColor}}>
                        You have no archived groups.
                    </Text>
                </View>
                <Divider thickness="1" bgColor={textColor}/>
            </>
        } else {
            return props.groups.map((group: GroupEntity) => {
                return <Box key={group.id}>
                    {group.archived == true ?
                        <Box key={group.id}>
                            <View mt={3} mb={3} style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View ml={5} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{fontSize: 16, fontWeight: 'bold', color: textColor}}>
                                        {group?.name}
                                    </Text>
                                    <Pressable onPress={() => {
                                        sidebarService.toggleGroupArchive(group.id!!).then(() => {
                                            props.onPress()
                                        });
                                    }}>
                                        <Text mr={5} style={{fontSize: 14, color: textColor}}>
                                            Unarchive
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                            <Divider thickness="1" bgColor={textColor}/>
                        </Box>
                        : <></>}
                </Box>
            })
        }
    }

    const checkIfArchivedGroupsExist = () => {
        let archivedGroupsExist = false;
        props.groups.forEach((group: GroupEntity) => {
            if (group.archived === true) {
                archivedGroupsExist = true;
            }
        })
        return archivedGroupsExist;
    }

    return <Modal isVisible={props.visible}>
        <View backgroundColor={bgColor} style={{flex: 1}}>
            <HStack mt={5} alignItems="center" space="20">
                <Button onPress={props.onPress} backgroundColor={"transparent"} style={{marginLeft: 5}}>
                    <ArrowBackIcon
                        color={textColor}
                        name="close"
                        size="md"/>
                </Button>
                <Heading alignItems={"center"} color={textColor} justifyContent={"center"} fontSize={18}>
                    My groups
                </Heading>
            </HStack>
            <ImageBackground source={require('../../../../../../assets/sidebar-background.png')}
                             resizeMode="cover"
                             style={{justifyContent: 'center'}}>
                <Box w="100%">
                    <Divider thickness="1" bgColor={textColor}/>
                    {checkGroups()}
                </Box>
            </ImageBackground>
            <Text mt={3} ml={3} color={textColor} fontSize="md" bold>
                Archived groups
            </Text>
            <VStack mt={3} space={2}>

                <ImageBackground source={require('../../../../../../assets/sidebar-background.png')}
                                 resizeMode="cover"
                                 style={{justifyContent: 'center'}}>
                    <Box w="100%">
                        <Divider thickness="1" bgColor={textColor}/>
                        {checkArchivedGroups()}
                    </Box>
                </ImageBackground>
            </VStack>
        </View>
    </Modal>;
}
