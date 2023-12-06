import * as React from "react";
import {
    Box,
    Center,
    Heading,
    HStack,
    Image, useColorModeValue,
} from "native-base";
import {LoginNavigationProps} from "./login-navigation.props";
import LoginFormComponent from "./login-form/login-form.component";


export default function LoginComponent({navigation}: LoginNavigationProps) {
    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "coolGray.100");
    return (<Center w="100%" h="100%" bgColor={bgColor}>
        <Box safeArea p="2" py="8" w="90%" maxW="290" bgColor={bgColor}>
            <HStack mb="5" justifyContent="center">
                <Image alt="logo" source={require("../../../assets/logo.png")} style={{width: 150, height: 150}}/>
            </HStack>
            <Heading size="lg" fontWeight="600" color={textColor}>
                Welcome!
            </Heading>
            <LoginFormComponent navigation={navigation}/>
        </Box>
    </Center>);
}
