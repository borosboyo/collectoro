
import React from "react";
import {Button, Image, Text, View} from "react-native";
import {HomeNavigationProps} from "./home-navigation.props";
import {axiosConfig} from "../shared/axios-config";
import {Configuration, UserControllerApi} from "../../swagger";
import axios, {AxiosRequestConfig} from "axios";


const HomeComponent = ({navigation}: HomeNavigationProps) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../../assets/logo.png')} style={{width: 200, height: 200}}/>
            <View style={{marginTop: 50}}>
                <Button
                    title="Sign in with Email"
                    onPress={() =>
                        navigation.navigate('Group')
                    }/>
                <Button
                    title="Sign in with Google"
                    onPress={() => axios.get('http://localhost:8080/api/auth/google/login').then((response) => {
                        console.log(response);
                    })
                   }/>
                <Text>
                    By Signing in, you agree to our Terms of Service and Privacy Policy.
                </Text>
            </View>

        </View>
    );
};

export default HomeComponent;