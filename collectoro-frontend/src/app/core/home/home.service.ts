import {GroupControllerApiFactory, UserControllerApiFactory} from "../../../../swagger";
import {axiosConfig, baseOptions} from "../../shared/axios-config";

const HomeService = {
    userController: UserControllerApiFactory(axiosConfig),
    groupController: GroupControllerApiFactory(axiosConfig),

    getHomepageByUserEmail: function(email: string): Promise<any> {
        return this.userController.getHomePageByUserEmail({
            email: email
        }, baseOptions)
    },
}

export default HomeService;