import React from "react";
import { NativeBaseProvider, ColorMode } from "native-base";
import type { StorageManager } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginComponent from "./src/app/core/login/login.component";
import RegisterComponent from "./src/app/core/register/register.component";
import ForgotPasswordComponent from "./src/app/core/forgot-password/forgot-password";
import SaveForgottenPasswordComponent from "./src/app/core/save-forgotten-password/save-forgotten-password.component";
import HomeComponent from "./src/app/core/home/home.component";
import SidebarComponent from "./src/app/core/sidebar/sidebar.component";

WebBrowser.maybeCompleteAuthSession();
const Stack = createNativeStackNavigator();

export default ({ children, theme }: any) => {
    const colorModeManager: StorageManager = {
        get: async () => {
            try {
                let val = await AsyncStorage.getItem("@my-app-color-mode");
                return val === "dark" ? "dark" : "light";
            } catch (e) {
                console.log(e);
                return "light";
            }
        },
        set: async (value: ColorMode) => {
            try {
                await AsyncStorage.setItem("@my-app-color-mode", value as string);
            } catch (e) {
                console.log(e);
            }
        },
    };
    return (
            <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Login" component={LoginComponent} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={RegisterComponent} options={{ headerShown: false }} />
                        <Stack.Screen name={"ForgotPassword"} component={ForgotPasswordComponent} options={{ headerShown: false }} />
                        <Stack.Screen name={"SaveForgottenPassword"} component={SaveForgottenPasswordComponent} options={{ headerShown: false }} />
                        <Stack.Screen name={"Home"} component={HomeComponent} options={{ headerShown: false }} />
                        <Stack.Screen name={"Sidebar"} component={SidebarComponent} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </NativeBaseProvider>
    );
};