import * as React from "react";
import {SaveForgotPasswordNavigationProps} from "./save-forgot-password-navigation.props";
import {Box, Center, FormControl, Heading, HStack, Image, useColorModeValue, VStack} from "native-base";
import saveForgotPasswordService from "./save-forgot-password.service";
import {styles} from "../../shared/components/styles";
import {TextInput} from "react-native";
import GradientButtonComponent from "../../shared/components/gradient-button.component";

export default function SaveForgotPasswordComponent({navigation}: SaveForgotPasswordNavigationProps) {
    const [verificationCode, setVerificationCode] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPasswordAgain, setNewPasswordAgain] = React.useState("");
    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "coolGray.100");
    const subtitleColor = useColorModeValue("#c9c9c9", "#424242");

    const inputBackgroundColor = useColorModeValue("gray.700", "white");

    return (<Center w="100%" h="100%" bgColor={bgColor}>
        <Box safeArea p="2" w="90%" maxW="290" py="8">
            <HStack mb="5" justifyContent="center">
                <Image alt="logo" source={require("../../../assets/logo.png")} style={{width: 150, height: 150}}/>
            </HStack>
            <HStack mb="5" justifyContent="center">
                <Heading textAlign={"center"} size="md" fontWeight="600" color={textColor}>
                    Check your mails for your token to change your password.
                </Heading>
            </HStack>
            <VStack space={3} mt="5">
                <FormControl backgroundColor={inputBackgroundColor} style={styles.textInputContainer}>
                    <TextInput style={{flex: 1,
                paddingVertical: 10,
                paddingRight: 10,
                fontSize: 12,
                color: textColor}} placeholder={"Token"}
                               placeholderTextColor={subtitleColor}
                               onChangeText={newText => setVerificationCode(newText)}/>
                </FormControl>
                <FormControl backgroundColor={inputBackgroundColor} style={styles.textInputContainer}>
                    <TextInput style={{flex: 1,
                paddingVertical: 10,
                paddingRight: 10,
                fontSize: 12,
                color: textColor}} secureTextEntry={true} placeholder={"Password"}
                               placeholderTextColor={subtitleColor}
                               onChangeText={newText => setNewPassword(newText)}/>
                </FormControl>
                <FormControl backgroundColor={inputBackgroundColor} style={styles.textInputContainer}>
                    <TextInput style={{flex: 1,
                paddingVertical: 10,
                paddingRight: 10,
                fontSize: 12,
                color: textColor}} secureTextEntry={true} placeholder={"Confirm password"}
                               placeholderTextColor={subtitleColor}
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
