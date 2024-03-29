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
import EditGroupModalComponent from "./edit-group-modal.component";

export function TabPageComponent({group, navigation}: { group: GroupEntity | undefined, navigation: HomeNavigation }) {
    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "white");
    const fabColor = useColorModeValue("#7DD6FF", "#6E1DCE");
    const fabIconColor = useColorModeValue("black", "white");
    const [editGroupModalVisible, setEditGroupModalVisible] = React.useState<boolean>(false);


    const [codeShown, setCodeShown] = React.useState<boolean>(false);

    let greenColor = (opacity = 1) => `#00ff50`;
    let redColor = (opacity = 1) => `#FF0000`;
    const [additionalData, setAdditionalData] = React.useState<any>(null);

    const labels = group?.users?.map((user) => user.lastName);
    const balances = group?.users?.map((user) => {
        return user.wallet?.balances?.find((balance) => balance.groupId == group?.id)?.amount!;
    });

    const [colors, setColors] = React.useState<any>([]);
    useEffect(() => {
        if (balances.length != 1) {
            setColors(balances?.map((balance) => balance > 0 ? greenColor : redColor))
        }
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
        return moment(date).format('YYYY-MM-DD');
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

    const closeModal = () => {
        setEditGroupModalVisible(false)
        showEditGroupMessage()
    }

    const showEditGroupMessage = () => {
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Group edited successfully! 😇 Relogin to see changes.',
            position: 'bottom',
            bottomOffset: 100,
        });
    }

    const getUserAvatarByIdFromGroupUsers = (userId: number) => {
        return group?.users?.find((user) => user.id == userId)?.image?.base64;
    }

    const getTransactionAmount = (transaction: any) => {
        let amount = 0;
        transaction?.who?.forEach((who: any) => {
            amount += who.amount;
        })
        return amount
    }

    return <Box bgColor={bgColor} flex={1} pt={10}>
        <EditGroupModalComponent visible={editGroupModalVisible} closeModal={() => closeModal()} group={group!!}/>
        <ScrollView>
            <Center>
                <Pressable mt={5} onPress={() => {
                    setEditGroupModalVisible(true)
                }}>
                    <HStack space={2} style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Heading fontSize={18} color={group?.color}>{group?.name}</Heading>
                        <MaterialCommunityIcons
                            name={'pencil'}
                            size={14}
                            color={textColor}
                        />
                    </HStack>
                </Pressable>
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
                        data: [-100], withDots: false
                    }, {
                        data: [100], withDots: false
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
                    return <Box ml={3} key={transaction.id}>
                        <HStack alignItems="center" space="3" px="4" bgColor={bgColor}>
                            <VStack>
                                <Text fontSize="md" color={textColor}>
                                    {transaction.purpose}
                                </Text>
                                <HStack alignItems="stretch" space="6">
                                    <Text fontSize="xs" fontWeight={'bold'} color={textColor}>
                                        {formatDate(transaction?.date)}
                                    </Text>
                                    <Text fontSize="xs" fontWeight="bold" color={textColor}>
                                        {transaction?.type}
                                    </Text>
                                    <Text fontSize="xs" fontWeight="bold" color={textColor}>
                                        {getTransactionAmount(transaction)} Ft
                                    </Text>
                                </HStack>
                                <Text color={textColor}>From {transaction.who?.map((who) => {
                                    return <Text key={who.id} color={textColor}>{who.lastName}</Text>
                                })} to {transaction.forWhom?.map((forWhom) => {
                                    return <Text key={forWhom.id} color={textColor}>{forWhom.lastName} </Text>
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
                        {getUserAvatarByIdFromGroupUsers(debt.fromUserId) == '' || getUserAvatarByIdFromGroupUsers(debt.fromUserId) == null ? <Avatar bg="gray.300">X</Avatar> :
                            <Avatar bg="gray.300" source={{uri: `data:image/png;base64,${getUserAvatarByIdFromGroupUsers(debt.fromUserId)}`}}></Avatar>}
                        <VStack>
                            <Text fontSize="md" fontWeight="bold" color={textColor}>
                                {debt.fromUserLastName}
                            </Text>
                            <HStack alignItems="stretch" space="12" divider={<Divider thickness="0.3"/>}>
                                <Text fontSize="xs" fontWeight="bold" color={textColor}>
                                    {debt.amount} HUF
                                </Text>
                            </HStack>
                        </VStack>
                        <Icon color={textColor} as={MaterialIcons} name="chevron-right" size="4xl"/>
                        <Text fontSize="md" fontWeight="bold" color={textColor}>
                            {debt.toUserLastName}
                        </Text>
                        {getUserAvatarByIdFromGroupUsers(debt.toUserId) == '' || getUserAvatarByIdFromGroupUsers(debt.toUserId) == null ? <Avatar bg="gray.300">X</Avatar> :
                            <Avatar bg="gray.300" source={{uri: `data:image/png;base64,${getUserAvatarByIdFromGroupUsers(debt.toUserId)}`}}></Avatar>}
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
                 icon={<Icon color={fabIconColor} as={MaterialIcons} name="add" size="4"/>}
                 onPress={() => navigation.navigate('EditWho', {group: group})}/>
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
        marginBottom: 0,
    },
});
