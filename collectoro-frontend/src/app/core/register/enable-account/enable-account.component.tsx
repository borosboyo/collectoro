import * as React from "react";
import {
    Box,
    Center,
    FormControl,
    Heading, HStack, Image,
    VStack
} from "native-base";
import {EnableAccountNavigationProps} from "./enable-account-navigation.props"
import registerService from "../register.service";
import {TextInput} from "react-native";
import {styles} from "../../../shared/components/styles";
import GradientButtonComponent from "../../../shared/components/gradient-button.component";

export default function EnableAccountComponent({navigation}: EnableAccountNavigationProps) {
    const [enableToken, setEnableToken] = React.useState("");
    return (<Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
            <HStack mb="5" justifyContent="center">
                <Image alt="logo" source={require("../../../../assets/logo.png")} style={{width: 150, height: 150}}/>
            </HStack>
            <HStack mb="5" justifyContent="center">
                <Heading textAlign={"center"} size="md" fontWeight="600" color="coolGray.600" _dark={{
                    color: "warmGray.50"
                }}>
                    Check your email for token token to enable your account.
                </Heading>
            </HStack>
            <VStack space={3} mt="5">
                <FormControl backgroundColor={inputBackGroundColor} style={styles.textInputContainer}>
                    <TextInput color={textColor} style={styles.textInput} placeholder={"Token"}
                               placeholderTextColor="#aaa"
                               onChangeText={newText => setEnableToken(newText)}/>
                </FormControl>
                <GradientButtonComponent
                    onPress={() => {
                        registerService.enable(enableToken).then(() => {
                            navigation.navigate("Login");
                        });
                    }}
                    text={"Enable account"}>
                </GradientButtonComponent>
            </VStack>
        </Box>
    </Center>);
}
