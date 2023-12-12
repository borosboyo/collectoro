import {axiosConfig, baseOptions, baseURL} from "../../shared/config/axios-config";
import axios from "axios";
import {
    GroupControllerApiFactory,
    ImageControllerApiFactory,
    UserControllerApiFactory
} from "../../../../swagger/index";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SidebarService = {
    userController: UserControllerApiFactory(axiosConfig),
    groupController: GroupControllerApiFactory(axiosConfig),
    imageController: ImageControllerApiFactory(axiosConfig),

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

    createGroup: async function (name: string, color: string, email: string | null): Promise<any> {
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        if (email != null) {
            return this.groupController.createGroup({
                name: name,
                userEmail: email,
                selectedColorName: color
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
    },

    editUserName: async function (firstName: string, lastName: string, email: string): Promise<any> {
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        return this.userController.editUserName({
            email: email,
            firstName: firstName,
            lastName: lastName
        }, baseOptions)
    },


    toggleGroupArchive: async function (groupId: number): Promise<any> {
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        return this.groupController.toggleGroupArchive({
            groupId: groupId
        }, baseOptions)
    },

    deleteUserByEmail: async function (email: string): Promise<any> {
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        return this.userController.deleteUserByEmail({
            email: email
        }, baseOptions)
    },

    uploadImage: async function (base64: string, email: string): Promise<any> {
        const token = await AsyncStorage.getItem("token");
        let myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "multipart/form-data");
        let formData = new FormData();

        formData.append("userEmail", email);
        formData.append("base64", base64);
        return fetch(baseURL + "/api/image/uploadImage", {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    },

    downloadImage: async function (email: string): Promise<any> {
        const token = await AsyncStorage.getItem("token");
        baseOptions.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        return this.imageController.downloadImage({
            imageName: email
        }, baseOptions)
    },
}
export default SidebarService;
