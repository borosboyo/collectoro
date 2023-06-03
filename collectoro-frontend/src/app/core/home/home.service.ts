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

    getGroupPageAdditionalData: function(groupId: number): Promise<any> {
        return this.groupController.getGroupPageAdditionalData({
            groupId: groupId
        }, baseOptions)
    }
}

export default HomeService;