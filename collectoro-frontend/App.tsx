import React, {useEffect} from "react";
import type {StorageManager} from "native-base";
import {ColorMode, NativeBaseProvider} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterComponent from "./src/app/core/register/register.component";
import ResetPasswordComponent from "./src/app/core/forgot-password/reset-password.component";
import SaveForgotPasswordComponent from "./src/app/core/save-forgotten-password/save-forgot-password.component";
import HomeComponent from "./src/app/core/home/home.component";
import {createDrawerNavigator} from "@react-navigation/drawer";
import SidebarComponent from "./src/app/core/sidebar/sidebar.component";
import EnableAccountComponent from "./src/app/core/register/enable-account/enable-account.component";
import {RootStackParamList} from "./src/app/shared/config/root-stack-param-list";
import LoginComponent from "./src/app/core/login/login.component";
import {AppContext} from "./src/app/shared/components/appcontext";
import EditWhoComponent from "./src/app/core/transaction-editor/edit-who.component";
import EditWhoMultipleMembersComponent from "./src/app/core/transaction-editor/edit-who-multiple-members.component";
import TransactionSaveComponent from "./src/app/core/transaction-editor/transaction-save.component";

WebBrowser.maybeCompleteAuthSession();
const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();
import { LogBox } from 'react-native';

export default ({children, theme}: any) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [token, setToken] = React.useState<string | null>(null);

    useEffect(() => {
        LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
        LogBox.ignoreAllLogs();//Ignore all log notifications
        const checkLoginStatus = async () => {
            try {
                // Retrieve the JWT token from AsyncStorage
                const token = await AsyncStorage.getItem("token");
                if (token) {
                    setIsLoggedIn(true);
                    setToken(token)
                }
            } catch (error) {
                console.log(error);
            }
        };
        checkLoginStatus();
    }, []);

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
            <Stack.Screen name={"SaveForgotPassword"} component={SaveForgotPasswordComponent}
                          options={{headerShown: false}}/>
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
            unmountOnBlur: true,
        }}
                          drawerContent={(props) => <SidebarComponent {...props}/>}>
            <Drawer.Screen name={"Home"} component={HomeComponent} options={{headerShown: false}}/>
            <Drawer.Screen name={"EditWho"} component={EditWhoComponent} options={{headerShown: false}}/>
            <Drawer.Screen name={"EditWhoMultipleMembers"} component={EditWhoMultipleMembersComponent} options={{headerShown: false}}/>
            <Drawer.Screen name={"TransactionSave"} component={TransactionSaveComponent} options={{headerShown: false}}/>
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
