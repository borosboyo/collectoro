import {AuthSessionResult} from "expo-auth-session";
import axios, {AxiosResponse} from "axios";
import {axiosConfig, baseOptions} from "../../shared/config/axios-config";
import {AuthenticationControllerApiFactory, AuthenticationResp} from "../../../../swagger";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
                    console.log(result)
                    axios.get("https://www.googleapis.com/userinfo/v2/me", {
                        headers: {Authorization: `Bearer ${result.authentication?.accessToken}`}
                    }).then((googleResponse) => {
                        console.log(googleResponse);
                    });
                }
            }
        );
    },

    loginWithEmail: function (email: string, password: string): Promise<any> {
        return this.authenticationController.authenticate({
            email: email,
            password: password
        }, baseOptions).then(async (response: AxiosResponse<AuthenticationResp>) => {
            console.log(response)
            await AsyncStorage.setItem("token", response.data.token!!);
            await AsyncStorage.setItem("email", email);
        })
    },

}
export default LoginService;
