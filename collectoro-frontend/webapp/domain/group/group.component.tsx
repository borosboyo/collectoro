
import React from "react";
import {Button, View} from "react-native";
import {GroupNavigationProps} from "./group-navigation.props";


const GroupComponent = ({navigation}: GroupNavigationProps) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button
                title="Go Home"
                onPress={() =>
                    navigation.navigate('Home')
                }
            />
        </View>
    );
};

export default GroupComponent;