import {axiosConfig, baseOptions} from "../../shared/config/axios-config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GroupControllerApiFactory, UserControllerApiFactory} from "../../../../swagger";

const SidebarService = {
    userController: UserControllerApiFactory(axiosConfig),
    groupController: GroupControllerApiFactory(axiosConfig),

    getProfileByUserEmail: async function (email: string): Promise<any> {
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        return this.userController.getProfileByUserEmail({
            email: email
        }, baseOptions)
    },

    createGroup: async function (name: string, email: string | null): Promise<any> {
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        if (email != null) {
            return this.groupController.createGroup({
                name: name,
                userEmail: email
            }, baseOptions)
        } else {
            throw new Error("Email is undefined");
        }
    },

    joinGroup: async function (joinLink: string, email: string | null): Promise<any> {
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        if (email != null) {
            return this.groupController.joinGroup({
                userEmail: email,
                joinLink: joinLink
            }, baseOptions)
        } else {
            throw new Error("Email is undefined");
        }
    },

    leaveGroup: async function (groupId: number | undefined, email: string | null): Promise<any> {
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        if (email != null && groupId != null) {
            return this.groupController.leaveGroup({
                userEmail: email,
                groupId: groupId
            }, baseOptions)
        } else {
            throw new Error("Email is undefined");
        }
    },

    logout: async function () {
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        axios.get("http://localhost:8080/api/auth/logout", baseOptions).then((response) => {
        })
    }
}
export default SidebarService;
