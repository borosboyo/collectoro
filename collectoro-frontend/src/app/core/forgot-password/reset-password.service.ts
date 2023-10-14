import {AuthenticationControllerApiFactory} from "../../../../swagger";
import {axiosConfig, baseOptions} from "../../shared/config/axios-config";

const ResetPasswordService = {
    authenticationController: AuthenticationControllerApiFactory(axiosConfig),

    resetPassword: function(email: string): Promise<any> {
        return this.authenticationController.resetPassword({
            email: email
        }, baseOptions).then(() => {

        })
    }
}

export default ResetPasswordService;
