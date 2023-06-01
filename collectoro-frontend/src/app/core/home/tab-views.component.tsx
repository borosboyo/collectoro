import React, {useState} from "react";
import {Box, Pressable, StatusBar, useColorModeValue} from "native-base";
import {Animated, Dimensions, StyleSheet, View} from "react-native";
import {SceneMap, TabView} from "react-native-tab-view";
import {TabPageComponent} from "./tab-page.component";
import {GetHomepageByUserEmailResp} from "../../../../swagger";

export function TabViewsComponent({homePage, routeArray, scenes}: {homePage: GetHomepageByUserEmailResp | undefined, routeArray: Array<any>, scenes: any}) {
    const initialLayout = {
        width: Dimensions.get('window').width
    };

    const [index, setIndex] = React.useState(1);
    let renderScene = SceneMap(scenes);
    const [routes] = useState(routeArray);

    const renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return <Box flexDirection="row">
            {props.navigationState.routes.map((route, i) => {
                const opacity = props.position.interpolate({
                    inputRange,
                    outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
                });
                const color = index === i ? useColorModeValue('#000', '#e5e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
                const borderColor = index === i ? 'cyan.500' : useColorModeValue('coolGray.200', 'gray.400');
                return <Pressable key={i}
                                  borderBottomWidth="3"
                                  borderColor={borderColor}
                                  flex={1}
                                  alignItems="center"
                                  p="3" onPress={() => {
                    setIndex(i);
                }}>
                    <Animated.Text style={{color}}>{route.title}</Animated.Text>
                </Pressable>;
            })}
        </Box>;
    };

    if(homePage?.groups?.length == 1 || homePage?.groups?.length == undefined) {
        return <TabPageComponent></TabPageComponent>
    } else {
        return <TabView navigationState={{index, routes}}
                        renderScene={renderScene}
                        renderTabBar={renderTabBar}
                        onIndexChange={setIndex}
                        initialLayout={initialLayout}
                        style={{
                            marginTop: StatusBar.length
                        }}></TabView>;
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 70,
        right: 40,
        backgroundColor: "#26653A",
        paddingHorizontal: 20,
        paddingVertical: 10,
        padding: 10,
        borderRadius: 25,
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
    fab: {
        left: '50%',
        marginBottom: 10,
    },
});