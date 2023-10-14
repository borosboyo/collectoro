import * as React from "react";
import {
    Box,
    Center,
    Heading,
    HStack,
    Image,
} from "native-base";
import {LoginNavigationProps} from "./login-navigation.props";
import LoginFormComponent from "./login-form/login-form.component";


export default function LoginComponent({navigation}: LoginNavigationProps) {
    return (<Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
            <HStack mb="5" justifyContent="center">
                <Image alt="logo" source={require("../../../assets/logo.png")} style={{width: 150, height: 150}}/>
            </HStack>
            <Heading size="lg" fontWeight="600" color="coolGray.600" _dark={{
                color: "warmGray.50"
            }}>
                Welcome!
            </Heading>
            <LoginFormComponent navigation={navigation}/>
        </Box>
    </Center>);
}
