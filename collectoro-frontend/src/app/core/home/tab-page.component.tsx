import {Avatar, Box, Center, Divider, Fab, Heading, HStack, Icon, ScrollView, Text, VStack} from "native-base";
import {BarChart} from "react-native-chart-kit";
import {Dimensions, StyleSheet} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import React from "react";

export const TabPageComponent = () => {
    let greenColor = (opacity = 1) => `#26653A`;
    let redColor = (opacity = 1) => `#FF0000`;
    return <Box flex={1}>
        <ScrollView>
            <Center>
                <Heading style={styles.heading}>group.name</Heading>
            </Center>
            <BarChart
                data={{
                    labels: ["1", "2", "3", "4", "5"], datasets: [{
                        data: [1, 2, 4, -1, -2], // dataset
                        colors: [greenColor, greenColor, greenColor, redColor, redColor]
                    }, {
                        data: [0], withDots: false
                    }, {
                        data: [10], withDots: false
                    },],
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel=""
                showBarTops={false}
                showValuesOnTopOfBars={true}
                fromZero
                withCustomBarColorFromData={true}
                flatColor={true}
                yAxisSuffix="Ft"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0,
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6", strokeWidth: "2", stroke: "#000000"
                    }
                }}
                style={{
                    marginVertical: 8, borderRadius: 16
                }}
            />
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
                    <Icon color="black" as={MaterialIcons} name="chevron-right" size="4xl"/>
                    <Avatar bg="gray.300">GG</Avatar>
                </HStack>
                <Text fontSize="lg" bold>
                    Total spent
                </Text>
                <HStack alignItems="center" space="3" px="4" bgColor='gray.250' divider={<Divider thickness={"0.0"}/>}>
                    <Icon color="black" as={MaterialIcons} name="attach-money" size="2xl"/>
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
            <Fab renderInPortal={false} shadow={2} placement="bottom-left" size="sm"
                 icon={<Icon color="white" as={MaterialIcons} name="add" size="4"/>}/>
        </Center>;
    </Box>;
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
    }, title: {
        fontSize: 18, color: "#fff", fontWeight: "bold",
    }, heading: {
        marginTop: 10,
        fontSize: 18,
    }, fab: {
        left: '50%', marginBottom: 10,
    },
});