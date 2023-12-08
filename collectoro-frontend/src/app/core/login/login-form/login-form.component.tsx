import {FormControl, HStack, Image, Pressable, Text, useColorModeValue, VStack} from "native-base";
import {TextInput} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import {useContext} from "react";
import {styles} from "../../../shared/components/styles";
import GradientButtonComponent from "../../../shared/components/gradient-button.component";
import loginService from "../login.service";
import LoginService from "../login.service";
import {LoginNavigationProps} from "../login-navigation.props";
import * as Google from "expo-auth-session/providers/google";
import {makeRedirectUri} from "expo-auth-session";
import {DynamicLinkComponent} from "../../../shared/components/dynamic-link.component";
import {AppContext} from "../../../shared/components/appcontext";
import {baseOptions} from "../../../shared/config/axios-config";
import {AxiosResponse} from "axios";
import {AuthenticationResp} from "../../../../../swagger";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function LoginFormComponent({navigation}: LoginNavigationProps) {
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "409953552731-ntvvsac4l7puqt3vnke3b61o9jp3mbn3.apps.googleusercontent.com",
        iosClientId: "409953552731-balks0c557np9556tlqdl69llpkgtogd.apps.googleusercontent.com",
        androidClientId: "409953552731-si4ntgth3u05eroseo5k2d4du8q9gpq7.apps.googleusercontent.com",
        redirectUri: makeRedirectUri({
            scheme: "hu.bme.aut.collectoro.frontend"
        }),
        scopes: ["profile", "email"],
    });
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const {setIsLoggedIn} = useContext(AppContext)
    const [showPassword, setShowPassword] = React.useState(false);
    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "coolGray.100");
    const subtitleColor = useColorModeValue("#ffffff", "#c9c9c9");
    const inputBackgroundColor = useColorModeValue("gray.700", "white");
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const showSuccessMessage = () => {
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: "Welcome back! 🥰",
        });
    }

    const showErrorMessage = (error: string) => {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error,
        });
    }

    return <VStack space={3} mt="5">
        <FormControl backgroundColor={inputBackgroundColor} style={styles.textInputContainer}>
            <TextInput color={textColor} style={styles.textInput} placeholder={"Email"}
                       placeholderTextColor={subtitleColor}
                       onChangeText={newText => setEmail(newText)}/>
        </FormControl>
        <FormControl backgroundColor={inputBackgroundColor} style={styles.textInputContainer}>
            <TextInput
                secureTextEntry={!showPassword}
                onChangeText={newPassword => setPassword(newPassword)}
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor={subtitleColor}
            />
            <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
                style={styles.passwordIcon}
                onPress={toggleShowPassword}
            />
        </FormControl>
        <GradientButtonComponent
            onPress={() => {
                loginService.loginWithEmail(email, password)
                    .then(() => {
                        showSuccessMessage();
                        setIsLoggedIn(true);
                    })
                    .catch(error => {
                        showErrorMessage(error);
                    });
            }}
            text={"Sign in"}
            elevation={5}>
        </GradientButtonComponent>
        <HStack mt="5" justifyContent="center">
            <DynamicLinkComponent text={"Forgot password?"} linkOnPress={() => navigation.navigate('ForgotPassword')}/>
        </HStack>
        <Pressable
            style={{
                borderRadius: 25,
                overflow: "hidden"
            }}
            mt="5"
            onPress={() => {
                LoginService.loginWithGoogle(promptAsync).then(async () => {
                    let email = await AsyncStorage.getItem("email");
                    let firstName = await AsyncStorage.getItem("firstName");
                    let lastName = await AsyncStorage.getItem("lastName");
                    baseOptions.headers = {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    };
                    LoginService.authenticationController.authenticateGoogle({
                        email: email!!,
                        firstName: firstName!!,
                        lastName: lastName!!,
                    }, baseOptions).then(async (backendResponse: AxiosResponse<AuthenticationResp>) => {
                        await AsyncStorage.setItem("token", backendResponse.data.token);
                        showSuccessMessage();
                        setIsLoggedIn(true);
                    }).catch((error) => {
                        showErrorMessage(error);
                    });
                });
            }}>
            <Image alt="google" source={require("../../../../assets/btn.png")}
                   style={{width: 300, height: 40}}/>
        </Pressable>
        <HStack mt="5" justifyContent="center">
            <Text fontSize="sm" color={textColor}>
                Don't have an account?{" "}
            </Text>
            <DynamicLinkComponent text={"Sign Up"} linkOnPress={() => navigation.navigate('Register')}/>
        </HStack>
        <Toast/>
    </VStack>;
}
