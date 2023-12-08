import {Text, View} from "native-base";
import * as React from "react";

export function ErrorMessageComponent(props: any) {
    return <View marginBottom={3}>
        {props.condition ? <Text color={"red.600"} fontSize={'xs'} italic>{props.text}</Text> : <></>}
    </View>
}
