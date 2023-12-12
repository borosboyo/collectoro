import * as React from "react";
import {ResetPasswordNavigationProps} from "./reset-password-navigation.props";
import {Box, Center, FormControl, Heading, HStack, Image, Text, useColorModeValue, VStack} from "native-base";
import resetPasswordService from "./reset-password.service";
import GradientButtonComponent from "../../shared/components/gradient-button.component";
import {TextInput} from "react-native";
import {styles} from "../../shared/components/styles";
import {DynamicBackButtonComponent} from "../../shared/components/dynamic-back-button.component";
import Toast from "react-native-toast-message";

export default function ResetPasswordComponent({navigation}: ResetPasswordNavigationProps) {
    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "coolGray.100");
    const subtitleColor = useColorModeValue("#ffffff", "#c9c9c9");
    const inputBackgroundColor = useColorModeValue("gray.700", "white");
    const [email, setEmail] = React.useState("");

    const showErrorMessage = (error: string) => {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error,
        });
    }

    const showSuccessMessage = () => {
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Successful password reset! 🥳',
        });
    }

    return (<Center w="100%" h="100%" bgColor={bgColor}>
        <Box safeArea p="2" py="8" maxW="350">
            <HStack mb="5" justifyContent="center">
                <Image alt="logo" source={require("../../../assets/logo.png")} style={{width: 150, height: 150}}/>
            </HStack>
            <HStack mb="5" justifyContent="center">
                <Heading size="lg" fontWeight="600" color={textColor}>
                    Forgot your password?
                </Heading>
            </HStack>
            <HStack mb="5" justifyContent="center">
                <Text color={textColor}>Enter the email associated with your account.</Text>
            </HStack>
            <VStack ml={3} space={3} justifyContent={"center"} maxW="290">
                <FormControl backgroundColor={inputBackgroundColor} style={styles.textInputContainer}>
                    <TextInput style={{flex: 1,
                paddingVertical: 10,
                paddingRight: 10,
                fontSize: 12,
                color: textColor}} placeholder={"Email"}
                               placeholderTextColor={subtitleColor}
                               onChangeText={newText => setEmail(newText)}/>
                </FormControl>
                <GradientButtonComponent text={"Reset password"} mt="2"
                                         onPress={() => {
                                             resetPasswordService.resetPassword(email).then(() => {
                                                 showSuccessMessage();
                                                 navigation.navigate('SaveForgotPassword');
                                             }).catch((error) => {
                                                 showErrorMessage(error);
                                             })
                                         }}>
                </GradientButtonComponent>
                <DynamicBackButtonComponent/>
            </VStack>
        </Box>
        <Toast/>
    </Center>);
}
