import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput} from 'react-native';
import {
    Avatar,
    Box,
    Button,
    FormControl,
    Heading,
    HStack,
    Icon,
    Pressable,
    Select,
    useColorModeValue,
    View,
    VStack
} from "native-base";
import GradientButtonComponent from "../../shared/components/gradient-button.component";
import {MaterialIcons} from "@expo/vector-icons";
import DiscardTransactionModalComponent from "./discard-transaction-modal.component";
import {ProcessTransactionReqTypeEnum, UserEntity} from "../../../../swagger/index";

interface EditWhoMultipleMembersComponentProps {
    navigation: any,
    route: any,
}

export default function EditWhoMultipleMembersComponent(props: EditWhoMultipleMembersComponentProps) {
    const [discardTransactionModalVisible, setDiscardTransactionModalVisible] = useState(false);
    const [who, setWho] = useState<any[]>([]);
    const [transactionType, setTransactionType] = useState('EXPENSE');
    const textColor = useColorModeValue("black", "white");
    const headerTextColor = useColorModeValue("black", "white");
    const bgColor = useColorModeValue("black", "white");
    const mainColor = useColorModeValue("#7DD6FF", "#6E1DCE");
    const checkBoxColor = useColorModeValue('lightBlue.300', 'purple.800');
    const buttonBackGroundColor = useColorModeValue("#888888", "#ffffff");

    useEffect(() => {
        setWho(props.route.params.group.users.map((user: UserEntity) => {
            return {key: user?.id!!.toString(), value: user.lastName, amount: 0, selected: true, base64: user?.image?.base64}
        }))
    }, []);

    const closeModal = () => {
        setDiscardTransactionModalVisible(false)
    }

    const discardTransaction = () => {
        setDiscardTransactionModalVisible(false)
        props.navigation.goBack()
    }

    const connectUsersToSelect = () => {
        return props.route.params?.group?.users?.map((user: UserEntity) => {
            return <Select.Item key={user.id!!} label={user?.lastName!!} value={user.id!!.toString()}/>
        })
    }

    const setCheckUserEmail = (itemValue: string) => {
        if (itemValue !== 'multipleMembers') {
            props.navigation.navigate('EditWho', {group: props.route.params.group})
        }
    }

    const renderWho = () => {
        return who.map((user) => {
            return (
                <Box key={user.key} pt={2} pb={2}
                     backgroundColor={mainColor} w="100%">
                    <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
                        {user.base64 == null ||  user.base64 == '' ? <Avatar ml={3} mb="3" mt="2" mr={3} bg={bgColor} size="md">X</Avatar> : <Avatar ml={3} mb="3" mt="2" mr={3} bg={bgColor} size="md" source={{uri: `data:image/png;base64,${user.base64}`}}>X</Avatar>}

                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: textColor}}>
                                {user?.value}
                            </Text>
                            <View style={{flex: 1, flexDirection: 'row', marginRight: 70,}} alignItems={'center'}
                                  justifyContent={'space-between'}>
                                <FormControl style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end',
                                    borderRadius: 8,
                                    paddingHorizontal: 8,
                                }}>
                                    <TextInput style={{
                                        color: textColor,
                                        width: 80,
                                        textAlign: 'right',
                                        fontWeight: 'bold',
                                        fontSize: 16,
                                    }} placeholder={"0"} editable={user?.selected} placeholderTextColor={textColor}
                                               keyboardType={"numeric"}
                                               onChangeText={newText => {
                                                   user.amount = newText
                                                   setWho(who)
                                               }}/>
                                </FormControl>
                                <Text style={{marginRight: 5, fontSize: 16, fontWeight: 'bold', color: textColor}}>
                                    HUF
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                </Box>
            )
        })
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <DiscardTransactionModalComponent visible={discardTransactionModalVisible} keep={() => closeModal()}
                                              discard={() => discardTransaction()}/>
            <ScrollView>
                <Box backgroundColor={mainColor} w="100%">
                    <HStack mt={3} mb={3} alignItems="center" space="20">
                        <Button onPress={() => {
                            setDiscardTransactionModalVisible(true)
                        }} backgroundColor={"transparent"} style={{marginLeft: 10}}><Icon color={textColor}
                                                                                          as={MaterialIcons}
                                                                                          name="close"
                                                                                          size="md"/></Button>
                        <View alignItems={"center"} justifyContent={"center"} backgroundColor={"transparent"}
                              color={textColor}>
                            <FormControl backgroundColor={"transparent"} color={"transparent"} isRequired>
                                <Select
                                    minWidth="150"
                                    placeholder={"Expense"}
                                    color={headerTextColor}
                                    isFocusVisible={false}
                                    variant={"unstyled"}
                                    textAlign={"center"}
                                    fontSize={"lg"}
                                    onValueChange={(itemValue) => {
                                        setTransactionType(itemValue)
                                    }}
                                    fontWeight={"bold"}
                                    placeholderTextColor={headerTextColor}
                                    dropdownIcon={<Icon color={headerTextColor} as={MaterialIcons} name="expand-more"
                                                        size="md"/>}
                                    mt="1"
                                >
                                    <Select.Item label="Expense" value={ProcessTransactionReqTypeEnum.EXPENSE}/>
                                    <Select.Item label="Income" value={ProcessTransactionReqTypeEnum.INCOME}/>
                                    <Select.Item label="Transfer" value={ProcessTransactionReqTypeEnum.TRANSFER}/>
                                </Select>
                            </FormControl>
                        </View>
                    </HStack>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <FormControl backgroundColor={"transparent"} color={"transparent"} maxW={"70%"} isRequired>
                                <Select
                                    minWidth="150"
                                    maxW={"70%"}
                                    placeholder={"Multiple members"}
                                    color={textColor}
                                    isFocusVisible={false}
                                    variant={"unstyled"}
                                    textAlign={"left"}
                                    fontSize={"lg"}
                                    fontWeight={"bold"}
                                    onValueChange={(itemValue) => {
                                        setCheckUserEmail(itemValue);
                                    }}
                                    placeholderTextColor={textColor}
                                    dropdownIcon={<Icon color={textColor} as={MaterialIcons} name="expand-more"
                                                        size="md"/>}
                                    mt="1"
                                >
                                    {connectUsersToSelect()}
                                    <Select.Item label={"Multiple members"} value={'multipleMembers'}/>
                                </Select>
                            </FormControl>
                            <View mr={5} alignSelf={"center"}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: 'white'
                                }}>{props.route?.params.value} HUF</Text>
                            </View>
                        </View>
                    </View>
                </Box>
                <VStack>
                    <Heading style={{
                        fontSize: 16,
                        marginLeft: 10,
                        marginTop: 6,
                        fontWeight: "bold",
                        color: mainColor
                    }}>Who paid</Heading>
                    {renderWho()}
                </VStack>
            </ScrollView>
            <Box w="100%" backgroundColor={mainColor}>
                <View mb={2} mt={2} ml={"10%"} mr={"10%"} w="80%">
                    <GradientButtonComponent elevation={5} text={"Continue"} onPress={() => {
                        props.navigation.navigate('TransactionSave', {
                            who: who,
                            type: transactionType,
                            group: props.route.params?.group!!
                        })
                    }}></GradientButtonComponent>
                </View>
            </Box>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
        marginTop: 45,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: "center",
        justifyContent: "center",
    },
    displayContainer: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 20,
    },
    displayText: {
        fontSize: 48,
        color: '#333',
    },
    buttonContainer: {
        flex: 3,
        width: '80%',
    },
    headingText: {
        fontSize: 24,
        color: '#333',
        marginBottom: 20, // Adjust the margin as needed
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    button: {
        flex: 1,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 3,
        margin: 2,
        padding: 5,
    },
    buttonText: {
        fontSize: 34,
        color: '#333',
    },
    zeroButton: {
        flex: 2,
        paddingLeft: 35,
        paddingRight: 35,
    },
    zeroButtonText: {
        marginLeft: 10,
    },
    operatorButton: {
        backgroundColor: '#f0f0f0',
    },
    operatorButtonText: {
        color: '#6E1DCE',
    },
    equalButton: {
        flex: 1,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6E1DCE',
        elevation: 3,
    },
    equalButtonText: {
        fontSize: 32,
        color: '#fff',
    },
    clearButton: {
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        marginTop: 10,
        elevation: 3,
        padding: 10,
    },
    clearButtonText: {
        fontSize: 24,
        color: '#333',
    },
    heading: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 6,
        fontWeight: "bold",
        color: "#757575"
    },
});
