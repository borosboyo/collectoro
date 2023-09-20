import * as Google from "expo-auth-session/providers/google";
import {makeRedirectUri} from "expo-auth-session";
import * as React from "react";
import {
    Box,
    Button,
    Center,
    FormControl,
    Heading,
    HStack,
    Image,
    Input,
    Link,
    Pressable,
    Text,
    VStack
} from "native-base";
import LoginService from "./login.service";
import {LoginNavigationProps} from "./login-navigation.props";
import loginService from "./login.service";
import {useContext} from "react";
import { AppContext } from "../../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function LoginComponent({navigation}: LoginNavigationProps) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { setIsLoggedIn } = useContext(AppContext)
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "409953552731-ntvvsac4l7puqt3vnke3b61o9jp3mbn3.apps.googleusercontent.com",
        iosClientId: "409953552731-balks0c557np9556tlqdl69llpkgtogd.apps.googleusercontent.com",
        androidClientId: "409953552731-si4ntgth3u05eroseo5k2d4du8q9gpq7.apps.googleusercontent.com",
        redirectUri: makeRedirectUri({
            scheme: "collectoro-frontend"
        }),
        scopes: ["profile", "email"],
    });

    return (<Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                color: "warmGray.50"
            }}>
                Collectoro
            </Heading>
            <Heading mt="1" _dark={{
                color: "warmGray.200"
            }} color="coolGray.600" fontWeight="medium" size="xs">
                Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Email ID</FormControl.Label>
                    <Input onChangeText={newText => setEmail(newText)}/>
                </FormControl>
                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password" onChangeText={newText => setPassword(newText)}/>
                    <Link _text={{
                        fontSize: "xs", fontWeight: "500", color: "indigo.500"
                    }} alignSelf="flex-end" mt="1"
                          onPress={() => {
                              navigation.navigate('ForgotPassword');
                          }}>
                        Forget Password?
                    </Link>
                </FormControl>
                <Button mt="2" colorScheme="indigo"
                        onPress={() => {
                            loginService.loginWithEmail(email,password)
                                .then(() => {
                                    console.log(AsyncStorage.getItem("token"));
                                    setIsLoggedIn(true);
                            })
                                .catch(error => {
                                    console.log(error);
                                });
                        }}>
                    Sign in
                </Button>
                <HStack mt="6" justifyContent="center">
                    <Text fontSize="sm" color="coolGray.600" _dark={{
                        color: "warmGray.200"
                    }}>
                        I'm a new user.{" "}
                    </Text>
                    <Link
                        _text={{
                            color: "indigo.500", fontWeight: "medium", fontSize: "sm"
                        }}
                        onPress={() => {
                            navigation.navigate('Register');
                        }}>
                        Sign Up
                    </Link>
                </HStack>
                <Pressable
                    mt="6"
                    onPress={() => {
                        LoginService.loginWithGoogle(promptAsync).then(() => {
                            setIsLoggedIn(true);
                        });
                    }}>
                    <Image alt="google" source={require("../../../../assets/btn.png")} style={{width: 300, height: 40}}/>
                </Pressable>
            </VStack>
        </Box>
    </Center>);

}