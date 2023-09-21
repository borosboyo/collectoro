import {AuthSessionResult} from "expo-auth-session";
import axios, {AxiosResponse} from "axios";
import {axiosConfig, baseOptions} from "../../shared/axios-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthenticationControllerApiFactory} from "../../../../swagger";

const LoginService = {

    authenticationController: AuthenticationControllerApiFactory(axiosConfig),

    fetchUserInfo: async function(accessToken: any) {
        let resp : AxiosResponse<any>;
        await axios.get("https://www.googleapis.com/userinfo/v2/me", {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then((googleResponse) => {
            resp = googleResponse;
        });
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        await this.authenticationController.authenticateGoogle({
            email: resp.data.email,
            firstName: resp.data.given_name,
            lastName: resp.data.family_name,
        }, baseOptions).then(async (backendResponse: AxiosResponse<AuthenticationResp>) => {
            await AsyncStorage.setItem("token", backendResponse.data.token!!);
            await AsyncStorage.setItem("email", resp.data.email!!);
        })
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
