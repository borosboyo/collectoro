import Modal from "react-native-modal";
import {
    ArrowBackIcon,
    Avatar,
    Button,
    FormControl,
    Heading,
    HStack,
    Pressable,
    useColorModeValue,
    View,
    VStack
} from "native-base";
import React from "react";
import {TextInput} from "react-native";
import {styles} from "../../../../../shared/components/styles";
import GradientButtonComponent from "../../../../../shared/components/gradient-button.component";
import sidebarService from "../../../sidebar.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateGroupModalComponent(props: { visible: boolean, onPress: () => void }) {
    const [groupName, setGroupName] = React.useState("");
    const [selectedColorName, setSelectedColorName] = React.useState("green.500");
    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "coolGray.100");
    const subtitleColor = useColorModeValue("#ffffff", "#c9c9c9");
    const inputBackgroundColor = useColorModeValue("gray.700", "white");

    return <Modal isVisible={props.visible}>
        <View backgroundColor={bgColor} style={{flex: 1}}>
            <HStack mt={5} alignItems="center" space="16">
                <Button onPress={props.onPress} backgroundColor={"transparent"}>
                    <ArrowBackIcon
                        color={textColor}
                        name="close"
                        size="md"/>
                </Button>
                <Heading alignItems={"center"} color={selectedColorName} justifyContent={"center"} fontSize={18}>
                    Create new group
                </Heading>
            </HStack>
            <VStack m="5" space={5}>
                <FormControl backgroundColor={inputBackgroundColor} style={styles.textInputContainer}>
                    <TextInput style={{
                        flex: 1,
                        paddingVertical: 10,
                        paddingRight: 10,
                        fontSize: 12,
                        color: textColor
                    }} placeholder={"Group name"}
                               placeholderTextColor={subtitleColor}
                               onChangeText={newText => setGroupName(newText)}/>
                </FormControl>
                <HStack space={2} mt={2} mb={2}>
                    <Pressable onPress={() => {
                        setSelectedColorName("green.500");
                    }}>
                        <Avatar bg={'green.500'} size={"sm"}></Avatar>
                    </Pressable>
                    <Pressable onPress={() => {
                        setSelectedColorName("blue.500");
                    }}>
                        <Avatar bg={'blue.500'} size={"sm"}></Avatar>
                    </Pressable>
                    <Pressable onPress={() => {
                        setSelectedColorName("teal.500");
                    }}>
                        <Avatar bg={'teal.500'} size={"sm"}></Avatar>
                    </Pressable>
                    <Pressable onPress={() => {
                        setSelectedColorName("red.500");
                    }}>
                        <Avatar bg={'red.500'} size={"sm"}></Avatar>
                    </Pressable>
                    <Pressable onPress={() => {
                        setSelectedColorName("orange.500");
                    }}>
                        <Avatar bg={'orange.500'} size={"sm"}></Avatar>
                    </Pressable>
                    <Pressable onPress={() => {
                        setSelectedColorName("purple.500");
                    }}>
                        <Avatar bg={'purple.500'} size={"sm"}></Avatar>
                    </Pressable>
                </HStack>
                <GradientButtonComponent
                    onPress={() => {
                        AsyncStorage.getItem('email').then((email) => {
                            sidebarService.createGroup(groupName, selectedColorName, email!!).then(() => {
                                props.onPress()
                            })
                        })
                    }}
                    text={"Create"}
                    elevation={5}>
                </GradientButtonComponent>
            </VStack>
        </View>
    </Modal>;
}



