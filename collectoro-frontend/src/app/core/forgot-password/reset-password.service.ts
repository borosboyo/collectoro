import {axiosConfig, baseOptions} from "../../shared/axios-config";
import {AuthenticationControllerApiFactory} from "../../../../swagger";

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
