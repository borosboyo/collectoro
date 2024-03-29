import {axiosConfig, baseOptions} from "../../shared/config/axios-config";
import {AuthenticationControllerApiFactory} from "../../../../swagger/index";

const SaveForgotPasswordService = {
    authenticationController: AuthenticationControllerApiFactory(axiosConfig),
    saveForgotPassword: function(token: string, password: string): Promise<any> {
        return this.authenticationController.saveForgotPassword({
            token: token,
            newPassword: password
        }, baseOptions).then(() => {

        })
    }
}

export default SaveForgotPasswordService;
