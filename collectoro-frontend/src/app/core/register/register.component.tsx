import * as React from "react";
import {Box, Center, FormControl, Heading, HStack, Image, useColorModeValue, VStack} from "native-base";
import {RegisterNavigationProps} from "./register-navigation.props";
import {Platform, TextInput, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import GradientButtonComponent from "../../shared/components/gradient-button.component";
import {styles} from "../../shared/components/styles";
import Toast from "react-native-toast-message";
import {ErrorMessageComponent} from "../../shared/components/error-message.component";
import registerService from "./register.service";
import {DynamicBackButtonComponent} from "../../shared/components/dynamic-back-button.component";

export default function RegisterComponent({navigation}: RegisterNavigationProps) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [firstNameError, setFirstNameError] = React.useState("");
    const [lastNameError, setLastNameError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "coolGray.100");
    const subtitleColor = useColorModeValue("#ffffff", "#c9c9c9");
    const inputBackgroundColor = useColorModeValue("gray.700", "white");

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    function resetValidators() {
        setFirstNameError("");
        setLastNameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
    }

    const validate = () => {
        resetValidators();
        validateEmail();
        validatePassword();
        validateConfirmPassword();
        validateFirstName();
        validateLastName();
        return !checkErrors();
    };

    const checkErrors = () => {
        return firstNameError !== "" || lastNameError !== "" || emailError !== "" || passwordError !== "" || confirmPasswordError !== "";
    }

    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(formData.email)) {
            setEmailError('Email is not valid');
        }
        if (formData.email === "") {
            setEmailError('Email is required');
        }
    };

    const validatePassword = () => {
        if (formData.password.length < 6) {
            setPasswordError('Password must be at least 6 characters')
        }
        if (formData.password === "") {
            setPasswordError('Password is required')
        }
    };

    const validateConfirmPassword = () => {
        if (formData.confirmPassword !== formData.password) {
            setConfirmPasswordError('Passwords do not match')
        }
        if (formData.confirmPassword === "") {
            setConfirmPasswordError('Confirm password is required')
        }
    };

    const validateFirstName = () => {
        if (formData.firstName === "") {
            setFirstNameError('First name is required')
        }
        if (formData.firstName.length < 3) {
            setFirstNameError('First name must be at least 3 characters')
        }
    };

    const validateLastName = () => {
        if (formData.lastName === "") {
            setLastNameError('Last name is required')
        }
        if (formData.lastName.length < 3) {
            setLastNameError('Last name must be at least 3 characters')
        }
    };

    const onSubmit = () => {
        validate() ?
            showSuccess()
            : showError();
    };

    const showSuccess = () => {
        Toast.show({
            type: 'success',
            text1: 'Register',
            text2: 'Succesful registration! 🥳'
        });
        registerService.register(formData.email, formData.password, formData.firstName, formData.lastName).then(
            () => {
                navigation.navigate("EnableAccount");
            }
        ).catch(error => {
                Toast.show(
                    {
                        type: 'error',
                        text1: 'Error',
                        text2: error.message
                    }
                )
            }
        )
    }

    const showError = () => {
        Toast.show({
            type: 'error',
            text1: 'Register',
            text2: 'Registration failed! 😢'
        });
    }

    return (<Center w="100%" h="100%" bgColor={bgColor}>
        <Box safeArea p="2" w="90%" maxW="290" py="8">
            <HStack mb="5" justifyContent="center">
                <Image alt="logo" source={require("../../../assets/logo.png")} style={{width: 150, height: 150}}/>
            </HStack>
            <HStack mb="5" justifyContent="center">
                <Heading size="lg" fontWeight="600" color={textColor}>
                    Sign Up
                </Heading>
            </HStack>
            <View style={styles.textInputContainer}>

            </View>
            <VStack mt="5">
                <FormControl isRequired isInvalid={firstNameError !== ''} backgroundColor={inputBackgroundColor}
                             style={styles.textInputContainer}>
                    <TextInput style={{flex: 1,
                paddingVertical: 10,
                paddingRight: 10,
                fontSize: 12,
                color: textColor}} placeholder={"First name"}
                               placeholderTextColor={subtitleColor}
                               onChangeText={newText => {
                                   setData({...formData, firstName: newText});
                               }}/>
                </FormControl>
                {<ErrorMessageComponent condition={firstNameError !== ''}
                                        text={firstNameError}></ErrorMessageComponent>}
                <FormControl isRequired isInvalid={lastNameError !== ''} backgroundColor={inputBackgroundColor}
                             style={styles.textInputContainer}>
                    <TextInput style={{flex: 1,
                paddingVertical: 10,
                paddingRight: 10,
                fontSize: 12,
                color: textColor}} placeholder={"Last name"}
                               placeholderTextColor={subtitleColor}
                               onChangeText={newText => {
                                   setData({...formData, lastName: newText});
                               }}/>
                </FormControl>
                {<ErrorMessageComponent condition={lastNameError !== ''}
                                        text={lastNameError}></ErrorMessageComponent>}
                <FormControl isRequired isInvalid={emailError !== ''} backgroundColor={inputBackgroundColor}
                             style={styles.textInputContainer}>
                    <TextInput style={{flex: 1,
                paddingVertical: 10,
                paddingRight: 10,
                fontSize: 12,
                color: textColor}} placeholder={"Email"}
                               placeholderTextColor={subtitleColor}
                               onChangeText={newText => {
                                   setData({...formData, email: newText});
                               }}/>
                </FormControl>
                {<ErrorMessageComponent condition={emailError !== ''}
                                        text={emailError}></ErrorMessageComponent>}
                <FormControl isRequired isInvalid={passwordError !== ''} backgroundColor={inputBackgroundColor}
                             style={styles.textInputContainer}>
                    <TextInput
                        secureTextEntry={!showPassword}
                        onChangeText={newPassword => {
                            setData({...formData, password: newPassword});
                        }}
                        style={{flex: 1,
                paddingVertical: 10,
                paddingRight: 10,
                fontSize: 12,
                color: textColor}}
                        placeholder="Password"
                        placeholderTextColor={subtitleColor}
                    />
                    <MaterialCommunityIcons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#aaa"
                        style={styles.passwordIcon}
                        onPress={toggleShowPassword}
                    />
                </FormControl>
                {<ErrorMessageComponent condition={passwordError !== ''}
                                        text={passwordError}></ErrorMessageComponent>}
                <FormControl isRequired isInvalid={confirmPasswordError !== ''} backgroundColor={inputBackgroundColor}
                             style={styles.textInputContainer}>
                    <TextInput
                        secureTextEntry={!showPassword}
                        onChangeText={newPassword => {
                            setData({...formData, confirmPassword: newPassword})
                        }}
                        style={{flex: 1,
                paddingVertical: 10,
                paddingRight: 10,
                fontSize: 12,
                color: textColor}}
                        placeholder="Confirm Password"
                        placeholderTextColor={subtitleColor}
                    />
                    <MaterialCommunityIcons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#aaa"
                        style={styles.passwordIcon}
                        onPress={toggleShowPassword}
                    />
                </FormControl>
                {<ErrorMessageComponent condition={confirmPasswordError !== ''}
                                        text={confirmPasswordError}></ErrorMessageComponent>}
                <GradientButtonComponent mt="2"
                                         onPress={onSubmit}
                                         text={"Submit"}>
                </GradientButtonComponent>
                <DynamicBackButtonComponent/>
            </VStack>
        </Box>
        <Toast/>
    </Center>);
}
