import Modal from "react-native-modal";
import {
    ArrowBackIcon,
    Avatar,
    Box,
    Button,
    Divider,
    FormControl,
    Heading,
    HStack, Pressable,
    Text,
    useColorModeValue,
    View, VStack
} from "native-base";
import React from "react";
import {GroupEntity} from "swagger/models";
import {styles} from "../../../shared/components/styles";
import {TextInput} from "react-native";
import GradientButtonComponent from "../../../shared/components/gradient-button.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
//TODO Jogosultságok kezelése editnél, userek kezelése
export default function EditGroupModalComponent(props: {
    visible: boolean,
    closeModal: () => void,
    group: GroupEntity
}) {
    const [groupName, setGroupName] = React.useState("");
    const [selectedColorName , setSelectedColorName] = React.useState(props.group.color);
    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "coolGray.100");
    const subtitleColor = useColorModeValue("#ffffff", "#4b4b4b");
    const inputBackgroundColor = useColorModeValue("gray.700", "white");

    return <Modal isVisible={props.visible}>
        <View backgroundColor={bgColor} style={{flex: 1}}>
            <HStack mt={5} alignItems="center" space="16">
                <Button onPress={props.closeModal} backgroundColor={"transparent"}>
                    <ArrowBackIcon
                        color={textColor}
                        name="close"
                        size="md"/>
                </Button>
                <Heading ml={7} alignItems={"center"} color={selectedColorName} justifyContent={"center"} fontSize={18}>
                    Edit group
                </Heading>
            </HStack>
            <VStack m="5" space={5}>
                <FormControl backgroundColor={inputBackgroundColor} style={styles.textInputContainer}>
                    <TextInput style={{flex: 1,
                        paddingVertical: 10,
                        paddingRight: 10,
                        fontSize: 12,
                        color: textColor}} placeholder={props?.group?.name}
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
                        setSelectedColorName("cyan.500");
                    }}>
                        <Avatar bg={'red.500'} size={"sm"}></Avatar>
                    </Pressable>
                    <Pressable onPress={() => {
                        setSelectedColorName("pink.500");
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
                            //TODO
                            //sidebarService.createGroup(groupName, email!!).then(() => {
                            //    props.closeModal
                            //})
                        })
                    }}
                    text={"Create"}
                    elevation={5}>
                </GradientButtonComponent>
            </VStack>
        </View>
    </Modal>;
}
