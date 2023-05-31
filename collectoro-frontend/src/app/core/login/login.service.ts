import {AuthSessionResult} from "expo-auth-session";
import axios, {AxiosResponse} from "axios";
import {
    AuthenticationControllerApiFactory, AuthenticationResp,
} from "../../../../swagger";
import {axiosConfig, baseOptions} from "../../shared/axios-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginService = {

    authenticationController: AuthenticationControllerApiFactory(axiosConfig),

    fetchUserInfo: function(accessToken: any) {
        axios.get("https://www.googleapis.com/userinfo/v2/me", {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then((response) => {
            this.authenticationController.authenticateGoogle({
                email: response.data.email,
                firstName: response.data.given_name,
                lastName: response.data.family_name,
            }, baseOptions).then(async (response: AxiosResponse<AuthenticationResp>) => {
                await AsyncStorage.setItem("token", response.data.token!!);
            })
        });
    },

     loginWithGoogle: function(promptAsync: any): Promise<any> {
        return promptAsync().then(
            (result: AuthSessionResult) => {
                if (result.type === "success") {
                    this.fetchUserInfo(result.authentication?.accessToken);
                }
            }
        );
    },

    loginWithEmail: function(email: string, password: string): Promise<any> {
        return this.authenticationController.authenticate({
            email: email,
            password: password
        }, baseOptions).then(async (response: AxiosResponse<AuthenticationResp>) => {
            await AsyncStorage.setItem("token", response.data.token!!);
        })
    },

}
export default LoginService;