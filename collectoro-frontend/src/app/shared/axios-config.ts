import {AxiosRequestConfig} from "axios";
import {Platform} from "react-native";
import {Configuration} from "../../../swagger"

const baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';


export const baseOptions: AxiosRequestConfig = {
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

export const axiosConfig : Configuration = new Configuration({
    baseOptions: baseOptions
})
