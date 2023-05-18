import React, { useState } from "react";
import {
    Box, Center,
    HamburgerIcon,
    HStack,
    Pressable,
    ScrollView,
    Slide,
    Text,
    useBreakpointValue, useColorModeValue,
    useDisclose,
    NativeBaseProvider, StatusBar
} from "native-base";
import {HomeNavigationProps} from "./home-navigation.props";
import {Dimensions, Platform, useWindowDimensions} from "react-native";
import SidebarComponent from "../sidebar/sidebar.component";
import { Animated } from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';

export default function HomeComponent({navigation}: HomeNavigationProps) {
    const { isOpen, onOpen, onClose } = useDisclose();
    const [isSlideOpen, setSlideOpen] = useState(false);
    const { height, width } = useWindowDimensions();
    const [isSidebar, setSidebar] = useState(false);
    const isLargeScreen = useBreakpointValue({
        base: false,
        lg: true,
    });

    return (
        <ScrollView
            flex="1"
            nativeID="scrollview"
            _contentContainerStyle={{
                height: "100%",
            }}
        >
            <Box
                flex="1"
                bg={{ base: "white", lg: "trueGray.100" }}
                nativeID="parentView"
            >
                <HStack>

                </HStack>
                <HStack p="4" zIndex="2" bg="black">
                        <Pressable onPress={() => setSidebar(!isSidebar)}>
                            <HamburgerIcon color="white" />
                        </Pressable>
                </HStack>
                <Box safeAreaTop flexDir="row" flex="1">
                        <Box w="300" bg="white" display={isSidebar ? "flex" : "none"}>
                            <SidebarComponent navigation={navigation} />
                        </Box>
                    <HomeTabViews/>
                </Box>
                    <Slide in={isSlideOpen} placement="left" w={width} h="100">
                        <HStack w="100%" h="100%">
                            <Box w={{ base: "80%", lg: "25%" }} bg="white">
                                <SidebarComponent navigation={navigation} />
                            </Box>
                            <Pressable
                                w={{ base: "20%", lg: "75%" }}
                                onPress={() => setSlideOpen(false)}
                                opacity="0.5"
                                bg="black"
                            ></Pressable>
                        </HStack>
                    </Slide>
                </Box>
        </ScrollView>);
}

const FirstRoute = () => <Center flex={1} my="4">
    This is Tab 1
</Center>;

const SecondRoute = () => <Center flex={1} my="4">
    This is Tab 2
</Center>;

const ThirdRoute = () => <Center flex={1} my="4">
    This is Tab 3
</Center>;

const FourthRoute = () => <Center flex={1} my="4">
    This is Tab 4{' '}
</Center>;

const initialLayout = {
    width: Dimensions.get('window').width
};
const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
});

function HomeTabViews() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([ {
        key: 'third',
        title: 'Tab 3'
    }, {
        key: 'fourth',
        title: 'Tab 4'
    }]);

    const renderTabBar = (props: { navigationState: { routes: any[]; }; position: { interpolate: (arg0: { inputRange: any; outputRange: any; }) => any; }; }) => {
        const inputRange = props.navigationState.routes.map((x: any, i: any) => i);
        return <Box flexDirection="row">
            {props.navigationState.routes.map((route: { title: string | number | boolean | Animated.Value | Animated.AnimatedInterpolation<string | number> | Animated.WithAnimatedObject<React.ReactElement<any, string | React.JSXElementConstructor<any>>> | Animated.WithAnimatedObject<React.ReactFragment> | Animated.WithAnimatedObject<React.ReactPortal> | null | undefined; }, i: React.SetStateAction<number>) => {
                const opacity = props.position.interpolate({
                    inputRange,
                    outputRange: inputRange.map((inputIndex: any) => inputIndex === i ? 1 : 0.5)
                });
                const color = index === i ? useColorModeValue('#000', '#e5e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
                const borderColor = index === i ? 'cyan.500' : useColorModeValue('coolGray.200', 'gray.400');
                return <Pressable borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" onPress={() => {
                        console.log(i);
                        setIndex(i);
                    }}>
                        <Animated.Text style={{
                            color
                        }}>{route.title}</Animated.Text>
                    </Pressable>;
            })}
        </Box>;
    };

    return <TabView navigationState={{
        index,
        routes
    }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout} style={{
        marginTop: StatusBar.length
    }} ></TabView>;
}