import {FormControl, HStack, Image, Link, Pressable, Text, VStack} from "native-base";
import {Platform, TextInput} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import {useContext} from "react";
import {styles} from "../../../shared/components/styles";
import GradientButtonComponent from "../../../shared/components/gradient-button.component";
import loginService from "../login.service";
import LoginService from "../login.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AppContext} from "../../../../../App";
import {LoginNavigationProps} from "../login-navigation.props";
import * as Google from "expo-auth-session/providers/google";
import {makeRedirectUri} from "expo-auth-session";
import {DynamicLinkComponent} from "../../../shared/components/dynamic-link.component";
export default function LoginFormComponent({navigation}: LoginNavigationProps) {
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "409953552731-ntvvsac4l7puqt3vnke3b61o9jp3mbn3.apps.googleusercontent.com",
        iosClientId: "409953552731-balks0c557np9556tlqdl69llpkgtogd.apps.googleusercontent.com",
        androidClientId: "409953552731-si4ntgth3u05eroseo5k2d4du8q9gpq7.apps.googleusercontent.com",
        redirectUri: makeRedirectUri({
            scheme: "collectoro-frontend"
        }),
        scopes: ["profile", "email"],
    });
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const {setIsLoggedIn} = useContext(AppContext)
    const [showPassword, setShowPassword] = React.useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return <VStack space={3} mt="5">
        <FormControl style={styles.textInputContainer}>
            <TextInput style={styles.textInput} placeholder={"Email"} placeholderTextColor="#aaa"
                       onChangeText={newText => setEmail(newText)}/>
        </FormControl>
        <FormControl style={styles.textInputContainer}>
            <TextInput
                secureTextEntry={!showPassword}
                onChangeText={newPassword => setPassword(newPassword)}
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#aaa"
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
                        console.log(AsyncStorage.getItem("token"));
                        setIsLoggedIn(true);
                    })
                    .catch(error => {
                        console.log(error);
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
                LoginService.loginWithGoogle(promptAsync).then(() => {
                    setIsLoggedIn(true);
                });
            }}>
            <Image alt="google" source={require("../../../../assets/btn.png")}
                   style={{width: 300, height: 40}}/>
        </Pressable>
        <HStack mt="5" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
                color: "warmGray.200"
            }}>
                Don't have an account?{" "}
            </Text>
            <DynamicLinkComponent text={"Sign Up"} linkOnPress={() => navigation.navigate('Register')}/>
        </HStack>
    </VStack>;
}
