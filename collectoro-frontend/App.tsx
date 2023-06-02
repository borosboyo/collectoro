import React from "react";
import type {StorageManager} from "native-base";
import {ColorMode, NativeBaseProvider} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginComponent from "./src/app/core/login/login.component";
import RegisterComponent from "./src/app/core/register/register.component";
import ResetPasswordComponent from "./src/app/core/forgot-password/reset-password.component";
import SaveForgotPasswordComponent from "./src/app/core/save-forgotten-password/save-forgot-password.component";
import HomeComponent from "./src/app/core/home/home.component";
import {RootStackParamList} from "./src/app/shared/root-stack-param-list";
import {createDrawerNavigator} from "@react-navigation/drawer";
import SidebarComponent from "./src/app/core/sidebar/sidebar.component";
import TransactionEditorComponent from "./src/app/core/transaction-editor/transaction-editor.component";
import EnableAccountComponent from "./src/app/core/register/enable-account/enable-account.component";
import HomeHolderComponent from "./src/app/core/home/home-holder.component";

WebBrowser.maybeCompleteAuthSession();
const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();
export const AppContext = React.createContext({
    isLoggedIn: false, setIsLoggedIn: (value: boolean) => {
    }
});

export default ({children, theme}: any) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(true);

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

    const PublicStack = () => (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name={"Login"} component={LoginComponent} options={{headerShown: false}}/>
            <Stack.Screen name={"Register"} component={RegisterComponent} options={{headerShown: false}}/>
            <Stack.Screen name={"ForgotPassword"} component={ResetPasswordComponent} options={{headerShown: false}}/>
            <Stack.Screen name={"SaveForgotPassword"} component={SaveForgotPasswordComponent} options={{headerShown: false}}/>
            <Stack.Screen name={"EnableAccount"} component={EnableAccountComponent} options={{headerShown: false}}/>
        </Stack.Navigator>
    );

    const ProtectedStack = () => (
        <Drawer.Navigator screenOptions={{
            drawerStyle: {
                backgroundColor: "black",
            },
            drawerPosition: "left",
            swipeEnabled: isLoggedIn,
        }}
                          drawerContent={(props) => <SidebarComponent {...props}/>}>
            <Drawer.Screen name={"Home"} component={HomeComponent}/>
            <Drawer.Screen name={"TransactionEditor"} component={TransactionEditorComponent}/>
        </Drawer.Navigator>
    );

    return (
        <AppContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
                <NavigationContainer>
                        {isLoggedIn ? (
                            ProtectedStack()
                        ) : (
                            PublicStack()
                        )}
                </NavigationContainer>
            </NativeBaseProvider>
        </AppContext.Provider>
    );
};