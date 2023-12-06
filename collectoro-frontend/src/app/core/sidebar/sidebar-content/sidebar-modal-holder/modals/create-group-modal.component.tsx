import Modal from "react-native-modal";
import {ArrowBackIcon, Button, FormControl, Heading, HStack, useColorModeValue, View, VStack} from "native-base";
import React from "react";
import {TextInput} from "react-native";
import {styles} from "../../../../../shared/components/styles";
import GradientButtonComponent from "../../../../../shared/components/gradient-button.component";
import sidebarService from "../../../sidebar.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateGroupModalComponent(props: { visible: boolean, onPress: () => void }) {
    const [groupName, setGroupName] = React.useState("");
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
                <Heading alignItems={"center"} color={textColor} justifyContent={"center"} fontSize={18}>
                    Create new group
                </Heading>
            </HStack>
            <VStack m="5" space={5}>
                <FormControl backgroundColor={inputBackgroundColor} style={styles.textInputContainer}>
                    <TextInput color={textColor} style={styles.textInput} placeholder={"Group name"}
                               placeholderTextColor={subtitleColor}
                               onChangeText={newText => setGroupName(newText)}/>
                </FormControl>
                <GradientButtonComponent
                    onPress={() => {
                        AsyncStorage.getItem('email').then((email) => {
                            sidebarService.createGroup(groupName, email!!).then(() => {
                                props.onPress
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


