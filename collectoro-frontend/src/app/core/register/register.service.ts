import {
    AuthenticationControllerApiFactory,
} from "../../../../swagger";
import {axiosConfig} from "../../shared/axios-config";

const RegisterService = {
    authenticationController: AuthenticationControllerApiFactory(axiosConfig),
}

export default RegisterService;