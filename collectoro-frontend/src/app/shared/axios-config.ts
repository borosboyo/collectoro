import {AxiosRequestConfig} from "axios";
import {Configuration} from "../../../swagger";
import {Platform} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';


export const baseOptions: AxiosRequestConfig = (AsyncStorage.getItem("token") === null
    ? {
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    : {
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${AsyncStorage.getItem("token")}`
    }
} )

export const axiosConfig : Configuration = new Configuration({
    baseOptions: baseOptions
})