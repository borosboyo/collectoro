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
        }).then((googleResponse) => {
            this.authenticationController.authenticateGoogle({
                email: googleResponse.data.email,
                firstName: googleResponse.data.given_name,
                lastName: googleResponse.data.family_name,
            }, baseOptions).then(async (backendResponse: AxiosResponse<AuthenticationResp>) => {
                await AsyncStorage.setItem("token", backendResponse.data.token!!);
                await AsyncStorage.setItem("email", googleResponse.data.email!!);
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
            await AsyncStorage.setItem("email", email);
        })
    },

}
export default LoginService;