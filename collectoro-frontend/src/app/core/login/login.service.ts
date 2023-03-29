import {AuthSessionResult, makeRedirectUri} from "expo-auth-session";
import axios, {AxiosResponse} from "axios";
import * as Google from "expo-auth-session/providers/google";
import {
    AuthenticationControllerApiFactory, AuthenticationResp,
    GoogleAuthenticationReq
} from "../../../../swagger";
import {axiosConfig} from "../../shared/axios-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginService = {

    authenticationController: AuthenticationControllerApiFactory(axiosConfig),

    fetchUserInfo: function(accessToken: any) {
        axios.get("https://www.googleapis.com/userinfo/v2/me", {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then((response) => {

            const req : GoogleAuthenticationReq = {
                email: response.data.email,
                firstName: response.data.given_name,
                lastName: response.data.family_name,
            }

            this.authenticationController.authenticateGoogle().then((response: AxiosResponse<AuthenticationResp>) => {
                AsyncStorage.setItem("token", response.data.token!!).then(() => {
                    console.log("Token saved!");
                    console.log(AsyncStorage.getItem("token"));
                });
            })
        });
    },

     loginWithGoogle: function(promptAsync: any) {
        promptAsync().then(
            (result: AuthSessionResult) => {
                if (result.type === "success") {
                    this.fetchUserInfo(result.authentication?.accessToken);
                }
            }
        );
    }

}
export default LoginService;