import {
    Avatar,
    Box,
    Button,
    Checkbox,
    FormControl,
    Heading,
    HStack,
    Icon,
    Pressable,
    Text,
    useColorModeValue,
    View,
    VStack
} from "native-base";
import React, {useEffect, useState} from "react";
import {styles} from "../../shared/components/styles";
import {SafeAreaView, ScrollView, TextInput} from "react-native";
import GradientButtonComponent from "../../shared/components/gradient-button.component";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import DiscardTransactionModalComponent from "./discard-transaction-modal.component";
import {UserEntity, UserWithAmountTypeEnum} from "../../../../swagger/index";

interface TransactionSaveComponentProps {
    navigation: any;
    route: any;
}

export default function TransactionSaveComponent(props: TransactionSaveComponentProps) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Initial date from state
    const [purpose, setPurpose] = useState("");
    const [discardTransactionModalVisible, setDiscardTransactionModalVisible] = useState(false);
    const [who, setWho] =  useState<any[]>([]);
    const [whoReq, setWhoReq] =  useState<any[]>([]);
    const [forWhom, setForWhom] =  useState<any[]>([]);
    const [forWhomReq, setForWhomReq] = useState<any[]>([]);
    const textColor = useColorModeValue("black", "white");
    const headerTextColor = useColorModeValue("black", "white");
    const bgColor = useColorModeValue("black", "white");
    const mainColor = useColorModeValue("#7DD6FF", "#6E1DCE");
    const checkBoxColor = useColorModeValue('lightBlue.300', 'purple.800');
    const buttonBackGroundColor = useColorModeValue("#888888", "#ffffff");


    useEffect(() => {
        setWho(props.route.params.who)

        setForWhom(props.route.params.group.users.map((user: UserEntity) => {
            return {key: user?.id!!.toString(), value: user.lastName, amount: 0, selected: true, base64: user.image.base64}
        }))

        setWhoReq(props.route.params.group.users.map((user: UserEntity) => {
            return {
                id: 0,
                userId: user?.id!!.toString(),
                lastName: user.lastName,
                amount: 0,
                transaction: null,
                type: UserWithAmountTypeEnum.WHO
            }
        }))

        setForWhomReq(props.route.params.group.users.map((user: UserEntity) => {
            return {
                id: 0,
                userId: user?.id!!.toString(),
                lastName: user.lastName,
                amount: 0,
                transaction: null,
                type: UserWithAmountTypeEnum.FORWHOM
            }
        }))
    }, []);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        setSelectedDate(date.toISOString().split('T')[0])
        hideDatePicker();
    };

    const closeModal = () => {
        setDiscardTransactionModalVisible(false)
    }

    const discardTransaction = () => {
        setDiscardTransactionModalVisible(false)
        props.navigation.goBack()
    }

    const mapWho = () => {
        whoReq.forEach((userReq: any) => {
            who.forEach((user: any) => {
                if (userReq.userId === user.key) {
                    userReq.amount = user.amount
                }
            })
        })
    }

    const mapForWhom = () => {
        //copy forWhom amount to forWhomReq amounts
        forWhomReq.forEach((userReq: any) => {
            forWhom.forEach((user: any) => {
                if (userReq.userId === user.key) {
                    userReq.amount = user.amount
                }
            })
        })
    }

    const renderWho = () => {
        return who.map((user: any) => {
            return (
                <Pressable key={user.key} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Avatar style={{marginLeft: 5, marginRight: 8}} source={{uri: `data:image/png;base64,${user.base64}`}}>X</Avatar>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: textColor}}>
                            {user?.value}
                        </Text>
                        <Text style={{marginRight: 40, fontSize: 16, fontWeight: 'bold', color: textColor}}>
                            {user?.amount} HUF
                        </Text>
                    </View>
                </Pressable>
            )
        })
    }

    const renderForWhom = () => {
        return forWhom.map((user: any) => {
            return (<View key={user.key} mb={2} style={{flexDirection: 'row', alignItems: 'center'}}>
                <Avatar style={{marginLeft: 5, marginRight: 8}} source={{uri: `data:image/png;base64,${user.base64}`}}>X</Avatar>
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
                            }} placeholder={"0"} editable={user?.selected} placeholderTextColor={textColor} keyboardType={"numeric"}
                                       onChangeText={newText => {
                                           user.amount = newText
                                           setForWhom(forWhom)
                                       }}/>
                        </FormControl>
                        <Text style={{marginRight: 5, fontSize: 16, fontWeight: 'bold', color: textColor}}>
                            HUF
                        </Text>
                        <Checkbox onChange={(isSelected) => {
                            setForWhom(forWhom.map((item: any) =>
                                item.key === user.key ? {...item, selected: isSelected} : item
                            ));
                        }} aria-label={'checkbox'} value={user?.selected} colorScheme="green" size="md"
                                  icon={<Icon as={<MaterialCommunityIcons name="cash"/>}/>} defaultIsChecked>
                        </Checkbox>
                    </View>
                </View>
            </View>)
        })
    }

    return (
        <SafeAreaView style={{
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
            marginTop: 45,
            backgroundColor: bgColor
        }}>
            <DiscardTransactionModalComponent visible={discardTransactionModalVisible} keep={() => closeModal()}
                                              discard={() => discardTransaction()}/>
            <ScrollView>
                <Box backgroundColor={mainColor} w="100%">
                    <HStack mt={1.5} mb={1.5} alignItems="center" space="20">
                        <Button backgroundColor={"transparent"} style={{marginLeft: 5}} onPress={() => {
                            setDiscardTransactionModalVisible(true)
                        }}>
                            <Icon
                                color={headerTextColor}
                                name="close"
                                as={MaterialIcons}
                                size="md"/></Button>
                        <Text ml={3} color={textColor} fontSize="lg"
                              fontWeight="bold">New {props.route?.params?.type?.toString().toLowerCase()}</Text>
                    </HStack>
                </Box>
                <VStack>
                    <Heading style={{
                        fontSize: 16,
                        marginLeft: 10,
                        marginTop: 6,
                        fontWeight: "bold",
                        color: mainColor
                    }}>Purpose</Heading>
                    <Box pt={5} pb={5} justifyContent={"center"} alignItems="center"
                         backgroundColor={mainColor} w="100%">
                        <FormControl>
                            <TextInput style={{
                                color: textColor
                            }} textAlign={"center"} placeholder={"e.g. Pizza take out"} placeholderTextColor={textColor}
                                       onChangeText={newText => setPurpose(newText)}/>
                        </FormControl>
                    </Box>
                    <Heading style={{
                        fontSize: 16,
                        marginLeft: 10,
                        marginTop: 6,
                        fontWeight: "bold",
                        color: mainColor
                    }}>Who paid</Heading>
                    <Box pt={5} pb={2}
                         backgroundColor={mainColor} w="100%">
                        <VStack>
                            {renderWho()}

                        </VStack>
                        <Pressable onPress={() => {
                            props.navigation.navigate('EditWho', {group: props.route?.params.group})
                        }}>
                            <Text style={{
                                marginTop: 8,
                                marginLeft: 15,
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: textColor
                            }}>
                                Edit
                            </Text>
                        </Pressable>
                    </Box>
                    <Heading style={{
                        fontSize: 16,
                        marginLeft: 10,
                        marginTop: 6,
                        fontWeight: "bold",
                        color: mainColor
                    }}>For whom</Heading>
                    <Box pt={5} pb={2}
                         backgroundColor={mainColor} w="100%">
                        {renderForWhom()}
                    </Box>
                    <Heading style={{
                        fontSize: 16,
                        marginLeft: 10,
                        marginTop: 6,
                        fontWeight: "bold",
                        color: mainColor
                    }}>Date & time</Heading>
                    <Box pt={5} pb={2}
                         backgroundColor={mainColor} w="100%">
                        <Pressable mb={2} alignItems={"center"} justifyContent={"center"} onPress={showDatePicker}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: textColor}}>
                                {selectedDate}
                            </Text>
                        </Pressable>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </Box>
                </VStack>
            </ScrollView>
            <Box w="100%" backgroundColor={mainColor}>
                <View mb={2} mt={2} ml={"10%"} mr={"10%"} w="80%">
                    <GradientButtonComponent elevation={5} text={"Save"}></GradientButtonComponent>
                </View>
            </Box>
        </SafeAreaView>
    )
}
