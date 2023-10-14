import {Platform} from "react-native";
import GradientButtonComponent from "./gradient-button.component";
import * as React from "react";

export function DynamicBackButtonComponent({navigation}: any) {
    return <>
        {
            Platform.OS === "web" ?
                <GradientButtonComponent text={"Back"} mt="2"
                                         onPress={() => {
                                    navigation.goBack();
                                }}>
                </GradientButtonComponent> :
                <></>
        }
    </>;
}
