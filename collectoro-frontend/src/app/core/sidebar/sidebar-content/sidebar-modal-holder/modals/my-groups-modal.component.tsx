import Modal from "react-native-modal";
import {
    ArrowBackIcon,
    Avatar,
    Box,
    Button,
    Divider,
    Heading,
    HStack,
    Text,
    useColorModeValue,
    View,
    VStack
} from "native-base";
import React from "react";
import {GetProfileByUserEmailResp, GroupEntity} from "../../../../../../../swagger";
import {ImageBackground} from "react-native";

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
                <Divider thickness="2" bgColor={textColor}/>
            </>
        } else {
            return props.groups.map((group: GroupEntity) => {
                return <>
                    {group.archived === false ?
                        <>
                            <View mt={3} mb={3} style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View ml={5} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{fontSize: 16, fontWeight: 'bold', color: textColor}}>
                                        {group?.name}
                                    </Text>
                                </View>
                            </View>
                            <Divider thickness="2" bgColor={textColor}/>
                        </>
                        : <></>}
                </>
            })
        }
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
                    <Divider thickness="2" bgColor={textColor}/>
                    {checkGroups()}
                </Box>
            </ImageBackground>
            <VStack mt={3} ml={3} space={2}>
                <Text color={textColor} fontSize="md" bold>
                    Archived groups
                </Text>
                <ImageBackground source={require('../../../../../../assets/sidebar-background.png')}
                                 resizeMode="cover"
                                 style={{justifyContent: 'center'}}>
                    <Box w="100%">
                        <Divider thickness="2" bgColor={textColor}/>
                        {checkArchivedgroups()}
                    </Box>
                </ImageBackground>
            </VStack>
        </View>
    </Modal>;
}
