import * as React from "react";
import {SaveForgotPasswordNavigationProps} from "./save-forgot-password-navigation.props";
import {Box, Center, FormControl, Heading, HStack, Image, VStack} from "native-base";
import saveForgotPasswordService from "./save-forgot-password.service";
import {styles} from "../../shared/components/styles";
import {TextInput} from "react-native";
import GradientButtonComponent from "../../shared/components/gradient-button.component";

export default function SaveForgotPasswordComponent({navigation}: SaveForgotPasswordNavigationProps) {
    const [verificationCode, setVerificationCode] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPasswordAgain, setNewPasswordAgain] = React.useState("");
    return (<Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
            <HStack mb="5" justifyContent="center">
                <Image alt="logo" source={require("../../../assets/logo.png")} style={{width: 150, height: 150}}/>
            </HStack>
            <HStack mb="5" justifyContent="center">
                <Heading textAlign={"center"} size="md" fontWeight="600" color="coolGray.600" _dark={{
                    color: "warmGray.50"
                }}>
                    Check your mails for your token to change your password.
                </Heading>
            </HStack>
            <VStack space={3} mt="5">
                <FormControl style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} placeholder={"Token"} placeholderTextColor="#aaa"
                               onChangeText={newText => setVerificationCode(newText)}/>
                </FormControl>
                <FormControl style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} placeholder={"Password"} placeholderTextColor="#aaa"
                               onChangeText={newText => setNewPassword(newText)}/>
                </FormControl>
                <FormControl style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} placeholder={"Confirm password"} placeholderTextColor="#aaa"
                               onChangeText={newText => setNewPasswordAgain(newText)}/>
                </FormControl>
                <GradientButtonComponent
                    onPress={() => {
                        saveForgotPasswordService.saveForgotPassword(verificationCode, newPasswordAgain).then(() => {
                            navigation.navigate('Login');
                        });
                    }}
                    text={"Change password"}>
                </GradientButtonComponent>
            </VStack>
        </Box>
    </Center>);
}
