import {Platform} from "react-native";
import {Link} from "native-base";
import GradientLinkComponent from "./gradient-link.component";
import * as React from "react";

export function DynamicLinkComponent(props: any) {
    return <>
        {
            Platform.OS === "web" ?
                <Link
                    onPress={props.linkOnPress}>
                </Link> :
                <GradientLinkComponent onPress={props.linkOnPress} text={props.text}>
                </GradientLinkComponent>
        }
    </>;
}
