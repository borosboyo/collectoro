import {Avatar, Box, Center, Divider, Fab, Heading, HStack, Icon, ScrollView, Text, VStack} from "native-base";
import {BarChart} from "react-native-chart-kit";
import {Dimensions, StyleSheet} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import React, {useEffect} from "react";
import {HomeNavigation} from "./home-navigation.props";
import {Debt, GroupEntity} from "../../../../swagger";
import HomeService from "./home.service";
import moment from "moment";

export function TabPageComponent({group, navigation}: { group: GroupEntity | undefined, navigation: HomeNavigation }) {
    let greenColor = (opacity = 1) => `#26653A`;
    let redColor = (opacity = 1) => `#FF0000`;
    const [additionalData, setAdditionalData] = React.useState<any>(null);

    const labels = group?.users?.map((user) => user.lastName);
    const balances = group?.users?.map((user) => {
        return user.wallet?.balances?.find((balance) => balance.groupId == group?.id)?.amount!;
    });
    const colors = balances?.map((balance) => balance > 0 ? greenColor : redColor);

    useEffect(() => {
        if (group != undefined && group.id != undefined) {
            HomeService.getGroupPageAdditionalData(group.id).then((response) => {
                setAdditionalData(response.data);
            });
        }
    }, [])


    const noTransactions = () => {
        if (group?.transactions?.length == 0) {
            return <Text>No transactions yet.</Text>
        }
    };

    const noDebts = () => {
        if (additionalData?.debtList?.length == 0) {
            return <Text>No debts yet.</Text>
        }
    }

    const formatDate = (date: any) => {
        if(date.length == 7) {
            date.pop()
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }

    return <Box flex={1}>
        <ScrollView>
            <Center>
                <Heading style={styles.heading}>{group?.name}</Heading>
                <Text selectable={true} style={styles.heading}>Join code: {group?.joinLink}</Text>
            </Center>
            <BarChart
                data={{
                    labels: labels!, datasets: [{
                        data: balances!, // dataset
                        colors: colors!
                    }, {
                        data: [-10], withDots: false
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
                yAxisSuffix=" Ft"
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
            <Text fontSize="lg" bold>
                Transactions
            </Text>
            <VStack space={4} alignItems="left">
                {noTransactions()}
                {group?.transactions?.map((transaction) => {
                    return <Box key={transaction.id}>
                        <HStack alignItems="center" space="3" px="4" bgColor='gray.250'>
                            <Avatar bg="gray.300">GG</Avatar>
                            <VStack>
                                <Text fontSize="md" fontWeight="bold" color="black">
                                    {transaction.purpose}
                                </Text>
                                <HStack alignItems="stretch" space="12" divider={<Divider thickness="0.3"/>}>
                                    <Text fontSize="xs">
                                        {formatDate(transaction?.date)}
                                    </Text>
                                    <Text fontSize="xs">
                                        {transaction?.type}
                                    </Text>
                                    <Avatar bg="gray.300" size='xs'>GG</Avatar>
                                </HStack>
                                <Text>From {transaction.who?.map((who) => {
                                    return <Text>{who.lastName} </Text>
                                })} to {transaction.forWhom?.map((forWhom) => {
                                    return <Text>{forWhom.lastName} </Text>
                                })}</Text>
                            </VStack>
                        </HStack>
                    </Box>
                })}
                <Text fontSize="lg" bold>
                    Settle debts
                </Text>
                {noDebts()}
                {additionalData?.debtList.map((debt: Debt) => {
                    return <HStack alignItems="center" space="3" px="4" bgColor='gray.250' key={debt.id}>
                        <Avatar bg="gray.300">GG</Avatar>
                        <VStack>
                            <Text fontSize="md" fontWeight="bold" color="black">
                                {debt.fromUserLastName}
                            </Text>
                            <HStack alignItems="stretch" space="12" divider={<Divider thickness="0.3"/>}>
                                <Text fontSize="xs" fontWeight="bold">
                                    {debt.amount} HUF
                                </Text>
                            </HStack>
                        </VStack>
                        <Icon color="black" as={MaterialIcons} name="chevron-right" size="4xl"/>
                        <Text fontSize="md" fontWeight="bold" color="black">
                            {debt.toUserLastName}
                        </Text>
                        <Avatar bg="gray.300">GG</Avatar>
                    </HStack>
                })}
                <Text fontSize="lg" bold>
                    Total spent
                </Text>
                <HStack alignItems="center" space="3" px="4" bgColor='gray.250' divider={<Divider thickness={"0.0"}/>}>
                    <Icon color="black" as={MaterialIcons} name="attach-money" size="2xl"/>
                    <Text fontSize="lg" bold>{additionalData?.numberOfExpenses} expenses</Text>
                    <Text fontSize="lg" bold>{additionalData?.totalSpent} HUF</Text>
                </HStack>
                {/*
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
            */}
            </VStack>
        </ScrollView>
        <Center style={styles.fab}>
            <Fab renderInPortal={false} shadow={2} placement="bottom-left" size="sm"
                 icon={<Icon color="white" as={MaterialIcons} name="add" size="4"/>}
                 onPress={() => navigation.navigate('TransactionEditor', {group: group})}/>
        </Center>;
    </Box>;
}

const styles = StyleSheet.create({
    textInputContainer: {
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
        marginTop: 10, fontSize: 18,
    }, fab: {
        left: '50%', marginBottom: 10,
    },
});
