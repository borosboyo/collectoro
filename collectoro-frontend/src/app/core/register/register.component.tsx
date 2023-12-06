import * as React from "react";
import {Box, Center, FormControl, Heading, HStack, Image, useColorModeValue, VStack} from "native-base";
import {RegisterNavigationProps} from "./register-navigation.props";
import registerService from "./register.service";
import {Platform, TextInput, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import GradientButtonComponent from "../../shared/components/gradient-button.component";
import {styles} from "../../shared/components/styles";

export default function RegisterComponent({navigation}: RegisterNavigationProps) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [errors, setErrors] = React.useState({});

    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "coolGray.100");
    const subtitleColor = useColorModeValue("#ffffff", "#c9c9c9");
    const inputBackgroundColor = useColorModeValue("gray.700", "white");

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const validate = () => {
        validateEmail();
        validatePassword();
        validateConfirmPassword();
        validateFirstName();
        validateLastName();
        return Object.keys(errors).length === 0;
    };

    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setErrors({
                ...errors,
                email: 'Email is invalid'
            });
        }
        if (email === "") {
            setErrors({
                ...errors,
                email: 'Email is required'
            });
        }
    };

    const validatePassword = () => {
        console.log(password)
        if (password.length < 6) {
            setErrors({
                ...errors,
                password: 'Password must be at least 6 characters'
            });
        }
        if (password === "") {
            setErrors({
                ...errors,
                password: 'Password is required'
            });
        }
    };

    const validateConfirmPassword = () => {
        if (confirmPassword !== password) {
            setErrors({
                ...errors,
                confirmPassword: 'Passwords must match'
            });
        }
        if (confirmPassword === "") {
            setErrors({
                ...errors,
                confirmPassword: 'Confirm password is required'
            });
        }
    };

    const validateFirstName = () => {
        if (firstName === "") {
            setErrors({
                ...errors,
                firstName: 'First name is required'
            });
        }
        if (firstName.length < 3) {
            setErrors({
                ...errors,
                firstName: 'First name must be at least 3 characters'
            });
        }
    };

    const validateLastName = () => {
        if (lastName === "") {
            setErrors({
                ...errors,
                lastName: 'Last name is required'
            });
        }
        if (lastName.length < 3) {
            setErrors({
                ...errors,
                lastName: 'Last name must be at least 3 characters'
            });
        }
    };

    const onSubmit = () => {
        console.log('valami')
        console.log(errors)
        validate() ?
            console.log('Submitted')
            : console.log('Validation Failed');
    };


    const submitRegister = () => {
        registerService.register(email, password, firstName, lastName)
            .then(() => {
                navigation.navigate("EnableAccount");
            })
            .catch(error => {
                console.log(error);
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
            <VStack space={3} mt="5">
                <FormControl backgroundColor={inputBackgroundColor} style={styles.textInputContainer}>
                    <TextInput color={textColor} style={styles.textInput} placeholder={"First name"}
                               placeholderTextColor={subtitleColor}
                               onChangeText={newText => {
                                   setFirstName(newText);
                               }}/>
                    {'firstName' in errors ?
                        <FormControl.ErrorMessage>{errors.firstName}</FormControl.ErrorMessage> : <></>}
                </FormControl>
                <FormControl backgroundColor={inputBackgroundColor} style={styles.textInputContainer}>
                    <TextInput color={textColor} style={styles.textInput} placeholder={"Last name"}
                               placeholderTextColor={subtitleColor}
                               onChangeText={newText => {
                                   setLastName(newText);
                               }}/>
                    {'lastName' in errors ?
                        <FormControl.ErrorMessage>{errors.lastName}</FormControl.ErrorMessage> : <></>}
                </FormControl>
                <FormControl backgroundColor={inputBackgroundColor} style={styles.textInputContainer}>
                    <TextInput color={textColor} style={styles.textInput} placeholder={"Email"}
                               placeholderTextColor={subtitleColor}
                               onChangeText={newText => {
                                   setEmail(newText);
                               }}/>
                    {'email' in errors ? <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage> : <></>}
                </FormControl>
                <FormControl backgroundColor={inputBackgroundColor} style={styles.textInputContainer}>
                    <TextInput
                        secureTextEntry={!showPassword}
                        onChangeText={newPassword => {
                            setPassword(newPassword);
                        }}
                        style={styles.textInput}
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
                    {'password' in errors ?
                        <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage> : <></>}
                </FormControl>
                <FormControl backgroundColor={inputBackgroundColor} style={styles.textInputContainer}>
                    <TextInput
                        secureTextEntry={!showPassword}
                        onChangeText={newPassword => {
                            setConfirmPassword(newPassword);
                        }}
                        style={styles.textInput}
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
                    {'confirmPassword' in errors ?
                        <FormControl.ErrorMessage>{errors.confirmPassword}</FormControl.ErrorMessage> : <></>}
                </FormControl>
                <GradientButtonComponent mt="2"
                                         onPress={onSubmit}
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
