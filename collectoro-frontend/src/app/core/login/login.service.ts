import {AuthSessionResult, makeRedirectUri} from "expo-auth-session";
import axios, {AxiosResponse} from "axios";
import {
    AuthenticationControllerApiFactory, AuthenticationResp,
    GoogleAuthenticationReq
} from "../../../../swagger";
import {axiosConfig, baseOptions} from "../../shared/axios-config";
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
            console.log(req);

            this.authenticationController.authenticateGoogle(req, baseOptions).then(async (response: AxiosResponse<AuthenticationResp>) => {
                await AsyncStorage.setItem("token", response.data.token!!);
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
    },

    loginWithEmail: function() {
        // TODO
    }

}
export default LoginService;