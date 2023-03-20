import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GroupComponent from './domain/group/group.component';
import HomeComponent from "./domain/home/home.component";
import {RootStackParamList} from "./domain/shared/root-stack-param-list";

const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home"
                              options={{headerShown: false}}
                              component={HomeComponent}/>
                <Stack.Screen name="Group"
                              component={GroupComponent}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
