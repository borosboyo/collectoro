import React, {useState, useEffect} from 'react';
import {Animated, Dimensions, RefreshControl, ScrollView, StatusBar} from 'react-native';
import {Box, Pressable, useColorModeValue} from "native-base";
import {TabView} from 'react-native-tab-view'; // Import TabView from the appropriate library
import HomeService from "./home.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TabPageComponent} from "./tab-page.component";
import EmptyTabPageComponent from "./empty-tab-page.component";

// Define the type for props
interface HomeComponentProps {
    navigation: any;
}

const HomeComponent = (props: HomeComponentProps) => {
    const [homePage, setHomePage] = useState<any>(undefined);
    const [routes, setRoutes] = useState<any[]>([]);
    const [scenes, setScenes] = useState<any>({});
    const [index, setIndex] = useState<number>(1);
    const [inputRange, setInputRange] = useState<number[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {
        AsyncStorage.getItem('email').then((email) => {
            HomeService.getHomepageByUserEmail(email!).then((response) => {
                setHomePage(response.data);
                updateRoutesAndScenes();
            });
            updateRoutesAndScenes();
        })
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        AsyncStorage.getItem('email').then((email) => {
            HomeService.getHomepageByUserEmail(email!).then((response) => {
                setHomePage(response.data);
                updateRoutesAndScenes();
            });
            updateRoutesAndScenes();
            setRefreshing(false);
        })
    }

    const updateRoutesAndScenes = () => {
        const newRoutes = [...routes];
        const newScenes = {...scenes};

        homePage?.groups?.forEach((group: any) => {
            if (group.id !== undefined && group.name !== undefined && group.joinLink !== undefined) {
                newRoutes.push({key: group.id.toString(), title: group.name});
                newScenes[group.id] = <TabPageComponent group={group} navigation={props.navigation}/>;
            }
        });

        const inputRange = newRoutes.map((_, index) => index);
        setRoutes(newRoutes);
        setScenes(newScenes);
        setInputRange(inputRange);
    };

    const renderTabBar = (props: any) => {
        const color = index === i ? useColorModeValue('#000', '#e5e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
        const borderColor = index === i ? 'cyan.500' : useColorModeValue('coolGray.200', 'gray.400');
        if (props.navigationState.routes === undefined) return (<></>);
        return <Box flexDirection="row">
            {props.navigationState.routes.map((route: any, i: number) => {
                return <Pressable key={i}
                                  borderBottomWidth="3"
                                  borderColor={borderColor}
                                  flex={1}
                                  alignItems="center"
                                  p="3" onPress={() => {
                    setIndex(i);
                }}>
                    <Animated.Text style={{color}}>{route.title}</Animated.Text>
                </Pressable>
            })}
        </Box>;
    };

    const initialLayout = {
        width: Dimensions.get('window').width,
    };
    if (inputRange.length == 0) return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }>
            <EmptyTabPageComponent/>
        </ScrollView>)
    if (inputRange.length == 1 && homePage?.groups?.at(0) != undefined) {
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                <TabPageComponent group={homePage?.groups.at(0)}
                                  navigation={props.navigation}></TabPageComponent>
            </ScrollView>);
    } else {
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                <Box flex={1}>
                    <TabView
                        {...props}
                        navigationState={{index, routes}}
                        renderTabBar={renderTabBar}
                        renderScene={({route}: any) => {
                            return scenes[route.key];
                        }}
                        onIndexChange={(i: number) => setIndex(i)}
                        initialLayout={initialLayout}
                        style={{
                            marginTop: StatusBar.currentHeight, // Replace StatusBar.length with StatusBar.currentHeight
                        }}
                    />
                </Box>
            </ScrollView>);
    }
}

export default HomeComponent;
