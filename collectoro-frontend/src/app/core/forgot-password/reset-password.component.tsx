import * as React from "react";
import {ResetPasswordNavigationProps} from "./reset-password-navigation.props";
import {Box, Button, Center, FormControl, Heading, Input, VStack} from "native-base";
import resetPasswordService from "./reset-password.service";

export default function ResetPasswordComponent({navigation}: ResetPasswordNavigationProps) {
    const [email, setEmail] = React.useState("");
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
                    <Input onChangeText={newText => setEmail(newText)}/>
                </FormControl>
                <Button mt="2" colorScheme="indigo"
                        onPress={() => {
                            resetPasswordService.resetPassword(email).then(() => {
                                navigation.navigate('Home');
                            });
                        }}>
                    Send email
                </Button>
            </VStack>
        </Box>
    </Center>);
}