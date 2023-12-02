import * as React from "react";
import {
    Box,
    Button,
    Center,
    FormControl,
    Heading, HStack, Image,
    Input,
    VStack
} from "native-base";
import {RegisterNavigationProps} from "./register-navigation.props";
import registerService from "./register.service";
import {Platform, StyleSheet, TextInput, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import GradientButtonComponent from "../../shared/components/gradient-button.component";
export default function RegisterComponent({navigation}: RegisterNavigationProps) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    // Function to toggle the password visibility state
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (<Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
            <HStack mb="5" justifyContent="center">
                <Image alt="logo" source={require("../../../assets/logo.png")} style={{width: 150, height: 150}}/>
            </HStack>
            <HStack mb="5" justifyContent="center">
                <Heading size="lg" fontWeight="600" color="coolGray.600" _dark={{
                    color: "warmGray.50"
                }}>
                    Sign Up
                </Heading>
            </HStack>
            <View style={styles.textInputContainer}>

            </View>
            <VStack space={3} mt="5">
                <FormControl style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} placeholder={"First name"} placeholderTextColor='#aaa' onChangeText={newText => setFirstName(newText)}/>
                </FormControl>
                <FormControl style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} placeholder={"Last name"} placeholderTextColor='#aaa' onChangeText={newText => setLastName(newText)}/>
                </FormControl>
                <FormControl style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} placeholder={"Email"} placeholderTextColor='#aaa' onChangeText={newText => setEmail(newText)}/>
                </FormControl>
                <FormControl style={styles.textInputContainer}>
                    <TextInput
                        secureTextEntry={!showPassword}
                        onChangeText={setPassword}
                        style={styles.textInput}
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                    />
                    <MaterialCommunityIcons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#aaa"
                        style={styles.passwordIcon}
                        onPress={toggleShowPassword}
                    />
                </FormControl>
                <FormControl style={styles.textInputContainer}>
                    <TextInput
                        secureTextEntry={!showPassword}
                        onChangeText={setPassword}
                        style={styles.textInput}
                        placeholder="Confirm password"
                        placeholderTextColor="#aaa"
                    />
                    <MaterialCommunityIcons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#aaa"
                        style={styles.passwordIcon}
                        onPress={toggleShowPassword}
                    />
                </FormControl>
                <GradientButtonComponent mt="2"
                onPress={() => {
                    registerService.register(email, password, firstName, lastName)
                        .then(() => {
                            navigation.navigate("EnableAccount");
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }}
                text={"Submit"}>
                </GradientButtonComponent>
                {
                    Platform.OS === "web" ?
                        <GradientButtonComponent text={"Back"} mt="2"
                                        onPress={() => {
                                            navigation.goBack();
                                        }}>
                        </GradientButtonComponent> :
                        <></>
                }
            </VStack>
        </Box>
    </Center>);
}


const styles= StyleSheet.create({
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    textInput: {
        flex: 1,
        paddingVertical: 10,
        paddingRight: 10,
        fontSize: 12,
    },
    passwordIcon: {
        marginLeft: 10,
    },
    heading: {
        alignItems: 'center',
        fontSize: 20,
        color: 'green',
        marginBottom: 20,
    },
});
