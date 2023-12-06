import * as React from "react";
import {ResetPasswordNavigationProps} from "./reset-password-navigation.props";
import {Box, Center, FormControl, Heading, HStack, Image, Text, useColorModeValue, VStack} from "native-base";
import resetPasswordService from "./reset-password.service";
import GradientButtonComponent from "../../shared/components/gradient-button.component";
import {TextInput} from "react-native";
import {styles} from "../../shared/components/styles";
import {DynamicBackButtonComponent} from "../../shared/components/dynamic-back-button.component";

export default function ResetPasswordComponent({props}: ResetPasswordNavigationProps) {
    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "coolGray.100");
    const subtitleColor = useColorModeValue("#ffffff", "#c9c9c9");
    const inputBackgroundColor = useColorModeValue("gray.700", "white");
    const [email, setEmail] = React.useState("");
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
                    <TextInput color={textColor} style={styles.textInput} placeholder={"Email"}
                               placeholderTextColor={subtitleColor}
                               onChangeText={newText => setEmail(newText)}/>
                </FormControl>
                <GradientButtonComponent text={"Reset password"} mt="2"
                                         onPress={() => {
                                             resetPasswordService.resetPassword(email).then(() => {
                                                 navigation.navigate('SaveForgotPassword');
                                             });
                                         }}>
                </GradientButtonComponent>
                <DynamicBackButtonComponent/>
            </VStack>
        </Box>
    </Center>);
}
