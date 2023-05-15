import * as Google from "expo-auth-session/providers/google";
import {makeRedirectUri} from "expo-auth-session";
import * as React from "react";
import {
    Box,
    Button,
    Center,
    FormControl,
    Heading,
    Input,
    VStack
} from "native-base";
import {RegisterNavigationProps} from "./register-navigation.props";

export default function RegisterComponent({navigation}: RegisterNavigationProps) {
    return (<Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading size="lg" color="coolGray.800" _dark={{
                color: "warmGray.50"
            }} fontWeight="semibold">
                Collectoro
            </Heading>
            <Heading mt="1" color="coolGray.600" _dark={{
                color: "warmGray.200"
            }} fontWeight="medium" size="xs">
                Sign up to continue!
            </Heading>
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password" />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Confirm Password</FormControl.Label>
                    <Input type="password" />
                </FormControl>
                <Button mt="2" colorScheme="indigo">
                    Sign up
                </Button>
            </VStack>
        </Box>
    </Center>);
}