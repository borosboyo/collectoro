import * as Google from "expo-auth-session/providers/google";
import {AuthSessionResult, makeRedirectUri} from "expo-auth-session";
import {Button, Image, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {useEffect} from "react";
import axios, {AxiosResponse} from "axios";
import {AuthenticationControllerApiFactory, AuthenticationResp, GoogleAuthenticationReq} from "../../../../swagger";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {axiosConfig} from "../../shared/axios-config";
import LoginService from "./login.service";

export default function LoginComponent() {
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "409953552731-ntvvsac4l7puqt3vnke3b61o9jp3mbn3.apps.googleusercontent.com",
        iosClientId: "409953552731-balks0c557np9556tlqdl69llpkgtogd.apps.googleusercontent.com",
        androidClientId: "409953552731-si4ntgth3u05eroseo5k2d4du8q9gpq7.apps.googleusercontent.com",
        redirectUri: makeRedirectUri(
            {
                scheme: "collectoro-frontend"
            }
        ),
        scopes: ["profile", "email"],
    });

    return (
        <View>
            <Text>Please log in</Text>
            <TouchableOpacity
                onPress={() => {
                    LoginService.loginWithGoogle(promptAsync);
                }}
            >
                <Image source={require("../../../assets/btn.png")} style={{width: 300, height: 40}} />
            </TouchableOpacity>

            <Button
                title="Press me"

            />
        </View>
    );

}