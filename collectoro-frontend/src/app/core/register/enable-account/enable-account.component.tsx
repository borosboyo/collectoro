import * as React from "react";
import {
    Box,
    Center,
    FormControl,
    Heading, HStack, Image, useColorModeValue,
    VStack
} from "native-base";
import {EnableAccountNavigationProps} from "./enable-account-navigation.props"
import registerService from "../register.service";
import {TextInput} from "react-native";
import {styles} from "../../../shared/components/styles";
import GradientButtonComponent from "../../../shared/components/gradient-button.component";
import Toast from "react-native-toast-message";

export default function EnableAccountComponent({navigation}: EnableAccountNavigationProps) {
    const [enableToken, setEnableToken] = React.useState("");
    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "coolGray.100");
    const subtitleColor = useColorModeValue("#ffffff", "#c9c9c9");
    const inputBackgroundColor = useColorModeValue("gray.700", "white");
    return (<Center w="100%" h="100%" bgColor={bgColor}>
        <Box safeArea p="2" w="90%" maxW="290" py="8">
            <HStack mb="5" justifyContent="center">
                <Image alt="logo" source={require("../../../../assets/logo.png")} style={{width: 150, height: 150}}/>
            </HStack>
            <HStack mb="5" justifyContent="center">
                <Heading textAlign={"center"} size="md" fontWeight="600" color={textColor}>
                    Check your email for token token to enable your account.
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
                               onChangeText={newText => setEnableToken(newText)}/>
                </FormControl>
                <GradientButtonComponent
                    onPress={() => {
                        registerService.enable(enableToken).then(() => {
                            navigation.navigate("Login");
                        }).catch((error) => {
                            Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: error,
                            });
                        })
                    }}
                    text={"Enable account"}>
                </GradientButtonComponent>
            </VStack>
        </Box>
        <Toast/>
    </Center>);
}
