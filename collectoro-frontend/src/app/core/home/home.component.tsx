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
    useDisclose, StatusBar, Fab, Icon, VStack, Avatar, Divider, Button, View,
} from "native-base";
import {HomeNavigationProps} from "./home-navigation.props";
import {Dimensions,  useWindowDimensions} from "react-native";
import { Animated } from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';
import {StyleSheet} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import {
    BarChart, LineChart,
} from "react-native-chart-kit";
import {AbstractChartConfig} from "react-native-chart-kit/dist/AbstractChart";
import {DataSet} from "native-base/lib/typescript/utils/useResponsiveQuery";

export default function HomeComponent({navigation}: HomeNavigationProps) {
    const { isOpen, onOpen, onClose } = useDisclose();
    const [isSlideOpen, setSlideOpen] = useState(false);
    const { height, width } = useWindowDimensions();
    const [isSidebar, setSidebar] = useState(false);
    const isLargeScreen = useBreakpointValue({
        base: false,
        lg: true,
    });

    return (<HomeTabViews/>);
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



const ThirdRoute = () =>
    <Box flex={1}>
        <BarChart
            data={{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                        data: [
                            Math.random() * -1000,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                        ],
                    }
                ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            fromZero
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
            }}
            style={{
                marginVertical: 8,
                borderRadius: 16
            }}
        />
        <ScrollView>
            <VStack space={4} alignItems="left" mt={10}>
                <Text fontSize="lg" bold>
                    Transactions
                </Text>
                <HStack alignItems="center" space="3" px="4" bgColor='gray.250'>
                    <Avatar bg="gray.300">GG</Avatar>
                    <VStack>
                        <Text fontSize="md" fontWeight="bold" color="black">
                            Debt settlement
                        </Text>
                        <HStack alignItems="stretch" space="12" divider={<Divider thickness="0.3"/>}>
                            <Text fontSize="xs">
                                2021-09-01 23:59
                            </Text>
                            <Avatar bg="gray.300" size='xs'>GG</Avatar>
                        </HStack>
                        <Text>From Alice to Bob</Text>
                    </VStack>
                </HStack>
                <Text fontSize="lg" bold>
                    Settle debts
                </Text>
                <HStack alignItems="center" space="3" px="4" bgColor='gray.250'>
                    <Avatar bg="gray.300">GG</Avatar>
                    <VStack>
                        <Text fontSize="md" fontWeight="bold" color="black">
                            Farkas
                        </Text>
                        <HStack alignItems="stretch" space="12" divider={<Divider thickness="0.3"/>}>
                            <Text fontSize="xs" fontWeight="bold">
                                25000 HUF
                            </Text>
                        </HStack>
                    </VStack>
                    <Icon color="black" as={MaterialIcons} name="chevron-right" size="4xl" />
                    <Avatar bg="gray.300">GG</Avatar>
                </HStack>
                <Text fontSize="lg" bold>
                    Total spent
                </Text>
                <HStack alignItems="center" space="3" px="4" bgColor='gray.250' divider={<Divider thickness={"0.0"}/>}>
                    <Icon color="black" as={MaterialIcons} name="attach-money" size="2xl" />
                    <Text fontSize="lg" bold>25 expenses</Text>
                    <Text fontSize="lg" bold>150 000 HUF</Text>
                </HStack>
                <Text fontSize="lg" bold>
                    Recent activity
                </Text>
                <HStack alignItems="center" space="3" px="4" bgColor='gray.250'>
                    <Avatar bg="gray.300">GG</Avatar>
                    <VStack>
                        <Text fontSize="md" fontWeight="bold" color="black">
                            2021-09-01 23:59
                        </Text>
                        <HStack alignItems="stretch" space="12" divider={<Divider thickness="0.3"/>}>
                            <Text fontSize="s">
                                Valami egészen hosszú szöveg.
                            </Text>
                        </HStack>
                    </VStack>
                </HStack>
            </VStack>
        </ScrollView>
        <Center flex={1} style={styles.fab}>
            <Fab renderInPortal={false} shadow={2} placement="bottom-left" size="sm" icon={<Icon color="white" as={MaterialIcons} name="add" size="4"/>}/>
        </Center>;
    </Box>




const initialLayout = {
    width: Dimensions.get('window').width
};

const renderScene = SceneMap({
    third: ThirdRoute,
    fourth: ThirdRoute,
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
                return <Box key={i} borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3">
                    <Pressable onPress={() => {
                        console.log(i);
                        setIndex(i);
                    }}>
                        <Animated.Text style={{
                            color
                        }}>{route.title}</Animated.Text>
                    </Pressable>
                </Box>;
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