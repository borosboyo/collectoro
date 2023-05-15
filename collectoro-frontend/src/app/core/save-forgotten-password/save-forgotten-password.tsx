import * as React from "react";
import {SaveForgottenPasswordNavigationProps} from "./save-forgotten-password-navigation.props";
import {Box, Button, Center, FormControl, Heading, Input, VStack} from "native-base";

export default function SaveForgottenPasswordComponent ({navigation}: SaveForgottenPasswordNavigationProps) {
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
                Save forgotten password
            </Heading>
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Verification code</FormControl.Label>
                    <Input/>
                    <FormControl.Label>New password</FormControl.Label>
                    <Input/>
                    <FormControl.Label>New password again</FormControl.Label>
                    <Input/>
                </FormControl>
                <Button mt="2" colorScheme="indigo">
                    Change password
                </Button>
            </VStack>
        </Box>
    </Center>);
}