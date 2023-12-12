
import Modal from "react-native-modal";
import {
    Button,
    Heading,
    HStack,
    useColorModeValue,
    View,
} from "native-base";
import React from "react";

export default function DiscardTransactionModalComponent(props: {
    visible: boolean,
    keep: () => void,
    discard: () => void,
}) {
    const textColor = useColorModeValue("coolGray.100", "black");
    const bgColor = useColorModeValue("black", "coolGray.100");
    const subtitleColor = useColorModeValue("#6E1DCE", "#7DD6FF");

    return <Modal isVisible={props.visible}>
        <View backgroundColor={bgColor} style={{paddingTop: 20, paddingBottom:20, alignItems: 'center', justifyContent: 'center'}}>
            <Heading alignItems={"center"} color={textColor} justifyContent={"center"} fontSize={18}>
                Do you wish to discard this transaction?
            </Heading>
            <HStack mt={5} alignItems="center" space="2">
                <Button minWidth={100} variant={"solid"} style={{
                    backgroundColor: '#22c55e',
                }} onPress={props.keep}>Keep</Button>
                <Button minWidth={100} variant={"solid"} style={{
                    backgroundColor: '#ef4444'
                }} onPress={props.discard}>Discard</Button>
            </HStack>
        </View>
    </Modal>;
}
