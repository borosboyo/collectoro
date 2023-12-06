import {Heading, HStack, Image, useColorModeValue, View} from "native-base";
import * as React from "react";

export default function EmptyTabPageComponent() {
    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "coolGray.100");
    return <View style={{flex: 1, alignItems: "center", justifyContent: "center"}} backgroundColor={bgColor}>
        <HStack justifyContent="center">
            <Image alt="logo" source={require("../../../assets/logo.png")}
                   style={{width: 150, height: 150}}/>
        </HStack>
        <Heading textAlign={"center"} size="lg" fontWeight="600" color={textColor}>
            It's empty here. Join a group to manage your finances!
        </Heading>
    </View>;
}

