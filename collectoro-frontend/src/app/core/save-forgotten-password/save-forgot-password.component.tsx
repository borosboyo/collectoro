import * as React from "react";
import {SaveForgotPasswordNavigationProps} from "./save-forgot-password-navigation.props";
import {Box, Button, Center, FormControl, Heading, Input, VStack} from "native-base";
import saveForgotPasswordService from "./save-forgot-password.service";

export default function SaveForgotPasswordComponent ({navigation}: SaveForgotPasswordNavigationProps) {
    const [verificationCode, setVerificationCode] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPasswordAgain, setNewPasswordAgain] = React.useState("");
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
                    <Input onChangeText={newText => setVerificationCode(newText)}/>
                    <FormControl.Label>New password</FormControl.Label>
                    <Input type="password" onChangeText={newText => setNewPassword(newText)}/>
                    <FormControl.Label>New password again</FormControl.Label>
                    <Input type="password" onChangeText={newText => setNewPasswordAgain(newText)}/>
                </FormControl>
                <Button mt="2" colorScheme="indigo"
                onPress={() => {
                    saveForgotPasswordService.saveForgotPassword(verificationCode, newPasswordAgain).then(() => {
                        navigation.navigate('Login');
                    });
                }}>
                    Change password
                </Button>
            </VStack>
        </Box>
    </Center>);
}