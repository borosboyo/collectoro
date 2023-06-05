import {GroupControllerApiFactory, UserControllerApiFactory} from "../../../../swagger";
import {axiosConfig, baseOptions} from "../../shared/axios-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeService = {
    userController: UserControllerApiFactory(axiosConfig),
    groupController: GroupControllerApiFactory(axiosConfig),

    getHomepageByUserEmail: async function(email: string): Promise<any> {
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        return this.userController.getHomePageByUserEmail({ email: email }, baseOptions);
    },

    getGroupPageAdditionalData: async function(groupId: number): Promise<any> {
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

    getUsersByIds: async function(ids: any): Promise<any> {
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        return this.userController.getUsersByIds({
            ids: ids
        }, baseOptions)
    }
}

export default HomeService;