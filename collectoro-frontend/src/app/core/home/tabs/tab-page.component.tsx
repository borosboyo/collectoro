import {
    Avatar,
    Box,
    Center,
    Divider,
    Fab,
    Heading,
    HStack,
    Icon, Pressable,
    ScrollView,
    Text,
    useColorModeValue,
    VStack
} from "native-base";
import {BarChart} from "react-native-chart-kit";
import {Dimensions, StyleSheet} from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import React, {useEffect} from "react";
import moment from "moment";
import HomeService from "../home.service";
import {Debt, GroupEntity} from "../../../../../swagger";
import {HomeNavigation} from "../home-navigation.props";
import * as Clipboard from 'expo-clipboard';
import Toast from "react-native-toast-message";

export function TabPageComponent({group, navigation}: { group: GroupEntity | undefined, navigation: HomeNavigation }) {
    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "white");
    const fabColor = useColorModeValue("#6E1DCE", "#7DD6FF");

    const [codeShown, setCodeShown] = React.useState<boolean>(false);

    let greenColor = (opacity = 1) => `#00ff50`;
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
            return <Text color={textColor}>No transactions yet.</Text>
        }
    };

    const noDebts = () => {
        if (additionalData?.debtList?.length == 0) {
            return <Text color={textColor}>No debts yet.</Text>
        }
    }

    const formatDate = (date: any) => {
        if (date.length == 7) {
            date.pop()
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }

    const toggleCodeShown = () => {
        setCodeShown(!codeShown);
    }

    const showCopyMessage = () => {
        Toast.show({
            type: 'info',
            text1: 'Copied',
            text2: 'Join code copied to clipboard! 😇',
            position: 'bottom',
            bottomOffset: 100,
        });
    }

    const chartRgba = () => {
        if (bgColor == "white") {
            return "rgba(0,0,0,1)"
        } else {
            return "rgba(255,255,255,1)"
        }
    }

    const copyToClipBoard = () => {
        Clipboard.setString(group?.joinLink!!)
        showCopyMessage();
    }

    return <Box bgColor={bgColor} mt={50} flex={1}>
        <ScrollView>
            <Center>
                <Heading mt={5} fontSize={18} color={textColor}>{group?.name}</Heading>
                <Pressable onPress={copyToClipBoard}>
                    <HStack space={2} style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text selectable={true} color={textColor}>Copy code</Text>
                        <MaterialCommunityIcons
                            name={'content-copy'}
                            size={12}
                            color={textColor}
                            onPress={() => {
                            }}
                        />
                    </HStack>
                </Pressable>
                {/*
                 <Pressable onPress={toggleCodeShown}>
                    {!codeShown ? <Text color={textColor}>Show code</Text> : <></>}
                </Pressable>
                {codeShown ? <Text color={textColor} selectable={true}>{group.joinLink}</Text> : <></>}

                 */}
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
                withHorizontalLabels={false}
                yAxisSuffix=" Ft"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: bgColor,
                    backgroundGradientFrom: bgColor,
                    backgroundGradientTo: bgColor,
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0,
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: () => chartRgba(),
                    labelColor: () => chartRgba(),
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6", strokeWidth: "2", stroke: textColor
                    }
                }}
                style={{
                    marginVertical: 8, borderRadius: 16
                }}
            />
            <VStack ml={3} space={2}>
                <Text color={textColor} fontSize="lg" bold>
                    Transactions
                </Text>
                {noTransactions()}
                {group?.transactions?.map((transaction) => {
                    return <Box key={transaction.id}>
                        <HStack alignItems="center" space="3" px="4" bgColor={bgColor}>
                            <Avatar bg="gray.300">GG</Avatar>
                            <VStack>
                                <Text fontSize="md" fontWeight="bold" color={textColor}>
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
                <Text color={textColor} fontSize="lg" bold>
                    Settle debts
                </Text>
                {noDebts()}
                {additionalData?.debtList.map((debt: Debt) => {
                    return <HStack ml={3} alignItems="center" space="1" px="4" bgColor={bgColor} key={debt.id}>
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
                <Text color={textColor} fontSize="lg" bold>
                    Total spent
                </Text>
                <HStack alignItems="center" space="3" px="4" bgColor={bgColor} divider={<Divider thickness={"0.0"}/>}>
                    <Icon color={textColor} as={MaterialIcons} name="attach-money" size="2xl"/>
                    <Text color={textColor} fontSize="lg" bold>{additionalData?.numberOfExpenses} expenses </Text>
                    <Text color={textColor} fontSize="lg" bold>{additionalData?.totalSpent} HUF</Text>
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
            <Fab bgColor={fabColor} renderInPortal={false} shadow={2} placement="bottom-left" size="sm"
                 icon={<Icon color={textColor} as={MaterialIcons} name="add" size="4"/>}
                 onPress={() => navigation.navigate('TransactionEditor', {group: group})}/>
        </Center>;
        <Toast/>
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
    }, fab: {
        left: '40%',
        marginBottom: 10,
    },
});
