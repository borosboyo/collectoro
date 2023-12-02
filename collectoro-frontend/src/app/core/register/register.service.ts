import {axiosConfig, baseOptions} from "../../shared/config/axios-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AxiosResponse} from "axios";
import {AuthenticationControllerApiFactory, EnableResp} from "../../../../swagger";

const RegisterService = {
    authenticationController: AuthenticationControllerApiFactory(axiosConfig),

    register: function(email: string, password: string, firstName: string, lastName: string): Promise<any> {
        return this.authenticationController.register({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        }, baseOptions).then(async (response) => {
        })
    },

    enable: function(token: string): Promise<any> {
        return this.authenticationController.enable({
            token: token
        }, baseOptions).then(async (response: AxiosResponse<EnableResp>) => {
            await AsyncStorage.setItem("token", response.data.token!!);
        })
    }
}

export default RegisterService;
