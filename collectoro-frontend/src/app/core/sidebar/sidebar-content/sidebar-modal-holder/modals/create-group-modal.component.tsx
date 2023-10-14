import Modal from "react-native-modal";
import {Button, Text, View} from "native-base";
import React from "react";

export default function CreateGroupModalComponent(props: { visible: boolean, onPress: () => void }) {
    return <Modal isVisible={props.visible}>
        <View backgroundColor={"white"} style={{flex: 1}}>
            <Text>Hello!</Text>

            <Button onPress={props.onPress}>
                Back
            </Button>
        </View>
    </Modal>;
}
