import {
    AuthenticationControllerApiFactory,
} from "../../../../swagger";
import {axiosConfig} from "../../shared/axios-config";

const SaveForgottenPasswordService = {
    authenticationController: AuthenticationControllerApiFactory(axiosConfig),
}

export default SaveForgottenPasswordService;