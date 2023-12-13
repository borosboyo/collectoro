import {AuthSessionResult} from "expo-auth-session";
import axios, {AxiosResponse} from "axios";
import {
    AuthenticationControllerApiFactory, AuthenticationResp,
} from "../../../../swagger/index";
import {axiosConfig, baseOptions} from "../../shared/config/axios-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginService = {

    authenticationController: AuthenticationControllerApiFactory(axiosConfig),

    fetchUserInfo: function (accessToken: any) {
        return axios.get("https://www.googleapis.com/userinfo/v2/me", {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then((async (googleResponse) => {
            await AsyncStorage.setItem("email", googleResponse.data.email);
            await AsyncStorage.setItem("firstName", googleResponse.data.given_name);
            await AsyncStorage.setItem("lastName", googleResponse.data.family_name);
        }));
    },

     loginWithGoogle: function (promptAsync: any): Promise<any> {
        return promptAsync().then(
            (result: AuthSessionResult) => {
                if (result.type === "success") {
                    return this.fetchUserInfo(result.authentication?.accessToken)
                }
            }
        );
    },

    loginWithEmail: function (email: string, password: string): Promise<any> {
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
