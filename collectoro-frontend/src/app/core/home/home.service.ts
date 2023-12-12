import {axiosConfig, baseOptions} from "../../shared/config/axios-config";
import {GroupControllerApiFactory, UserControllerApiFactory} from "../../../../swagger/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeService = {
    userController: UserControllerApiFactory(axiosConfig),
    groupController: GroupControllerApiFactory(axiosConfig),

    getHomepageByUserEmail: async function (email: string): Promise<any> {
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        return this.userController.getHomePageByUserEmail({email: email}, baseOptions);
    },

    getGroupPageAdditionalData: async function (groupId: number): Promise<any> {
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        return this.groupController.getGroupPageAdditionalData({
            groupId: groupId
        }, baseOptions)
    },
}

export default HomeService;
