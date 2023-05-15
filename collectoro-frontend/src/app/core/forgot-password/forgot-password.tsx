import * as React from "react";
import {ForgotPasswordNavigationProps} from "./forgot-password-navigation.props";
import {Box, Button, Center, FormControl, Heading, Input, VStack} from "native-base";
import LoginService from "../login/login.service";

export default function ForgotPasswordComponent({navigation}: ForgotPasswordNavigationProps) {
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
                Forgot password
            </Heading>
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input />
                </FormControl>
                <Button mt="2" colorScheme="indigo"
                        onPress={() => {
                            navigation.navigate("SaveForgottenPassword");
                        }}>
                    Send email
                </Button>
            </VStack>
        </Box>
    </Center>);
}