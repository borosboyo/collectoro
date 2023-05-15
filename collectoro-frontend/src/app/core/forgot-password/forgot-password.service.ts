import {
    AuthenticationControllerApiFactory,
} from "../../../../swagger";
import {axiosConfig} from "../../shared/axios-config";

const ForgotPasswordService = {
    authenticationController: AuthenticationControllerApiFactory(axiosConfig),
}

export default ForgotPasswordService;