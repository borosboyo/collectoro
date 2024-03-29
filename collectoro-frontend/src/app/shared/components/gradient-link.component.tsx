import {LinearGradient} from "expo-linear-gradient";
import React from "react";
import {Link, Text} from "native-base";
import MaskedView from '@react-native-masked-view/masked-view'

export default function GradientLinkComponent(props: any) {
    return (
        <MaskedView maskElement={
            <Text style={[props.style, {backgroundColor: 'transparent'}]}>{props.text}</Text>
        }>
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#6E1DCE', '#7DD6FF']}>
                <Link fontSize={props.fontSize} onPress={props.onPress} style={[props.style, {opacity: 0}]}>  {props.text}</Link>

            </LinearGradient>
        </MaskedView>
    )
}

