import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
    Avatar,
    Box,
    Button,
    FormControl,
    HStack,
    Icon,
    Select,
    useColorModeValue,
    View
} from "native-base";
import GradientButtonComponent from "../../shared/components/gradient-button.component";
import {MaterialIcons} from "@expo/vector-icons";
import {ProcessTransactionReqTypeEnum, UserEntity} from "../../../../swagger/index";
import DiscardTransactionModalComponent from "./discard-transaction-modal.component";
import transactionEditorService from "./transaction-editor.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ValueContainer(props: { displayValue: string }) {
    const buttonTextColor = useColorModeValue("#7DD6FF", "#6E1DCE");
    return <View style={styles.displayContainer}>
        <Text style={{
            fontSize: 48,
            color: buttonTextColor,
        }}>
            {props.displayValue} {'HUF'}
        </Text>
    </View>;
}

function FirstRowContainer(props: {
    onPress: () => void,
    onPress1: () => void,
    onPress2: () => void,
    onPress3: () => void
}) {
    const buttonTextColor = useColorModeValue("#ffffff", "#000000");
    const specialButtonTextColor = useColorModeValue("#7DD6FF", "#6E1DCE");
    const buttonBackGroundColor = useColorModeValue("#888888", "#ffffff");
    return <View style={styles.row}>
        <TouchableOpacity
            style={{
                flex: 1,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: buttonBackGroundColor,
                elevation: 3
            }}
            onPress={props.onPress}
        >
            <Text style={{
                fontSize: 34,
                color: buttonTextColor,
            }}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                flex: 1,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: buttonBackGroundColor,
                elevation: 3
            }}
            onPress={props.onPress1}
        >
            <Text style={{
                fontSize: 34,
                color: buttonTextColor,
            }}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                flex: 1,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: buttonBackGroundColor,
                elevation: 3
            }}
            onPress={props.onPress2}
        >
            <Text style={{
                fontSize: 34,
                color: buttonTextColor,
            }}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                flex: 1,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: buttonBackGroundColor,
                elevation: 3
            }}
            onPress={props.onPress3}
        >
            <Text style={{
                fontSize: 34,
                color: specialButtonTextColor,
            }}>
                ÷
            </Text>
        </TouchableOpacity>
    </View>;
}

function SecondRowContainer(props: {
    onPress: () => void,
    onPress1: () => void,
    onPress2: () => void,
    onPress3: () => void
}) {
    const buttonTextColor = useColorModeValue("#ffffff", "#000000");
    const specialButtonTextColor = useColorModeValue("#7DD6FF", "#6E1DCE");
    const buttonBackGroundColor = useColorModeValue("#888888", "#ffffff");
    return <View style={styles.row}>
        <TouchableOpacity
            style={{
                flex: 1,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: buttonBackGroundColor,
                elevation: 3
            }}
            onPress={props.onPress}
        >
            <Text style={{
                fontSize: 34,
                color: buttonTextColor,
            }}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                flex: 1,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: buttonBackGroundColor,
                elevation: 3
            }}
            onPress={props.onPress1}
        >
            <Text style={{
                fontSize: 34,
                color: buttonTextColor,
            }}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                flex: 1,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: buttonBackGroundColor,
                elevation: 3
            }}
            onPress={props.onPress2}
        >
            <Text style={{
                fontSize: 34,
                color: buttonTextColor,
            }}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                flex: 1,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: buttonBackGroundColor,
                elevation: 3
            }}
            onPress={props.onPress3}
        >
            <Text style={{
                fontSize: 34,
                color: specialButtonTextColor,
            }}>
                ×
            </Text>
        </TouchableOpacity>
    </View>;
}

function ThirdRowContainer(props: {
    onPress: () => void,
    onPress1: () => void,
    onPress2: () => void,
    onPress3: () => void
}) {
    const buttonTextColor = useColorModeValue("#ffffff", "#000000");
    const specialButtonTextColor = useColorModeValue("#7DD6FF", "#6E1DCE");
    const buttonBackGroundColor = useColorModeValue("#888888", "#ffffff");
    return <View style={styles.row}>
        <TouchableOpacity
            style={{
                flex: 1,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: buttonBackGroundColor,
                elevation: 3
            }}
            onPress={props.onPress}
        >
            <Text style={{
                fontSize: 34,
                color: buttonTextColor,
            }}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                flex: 1,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: buttonBackGroundColor,
                elevation: 3
            }}
            onPress={props.onPress1}
        >
            <Text style={{
                fontSize: 34,
                color: buttonTextColor,
            }}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                flex: 1,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: buttonBackGroundColor,
                elevation: 3
            }}
            onPress={props.onPress2}
        >
            <Text style={{
                fontSize: 34,
                color: buttonTextColor,
            }}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                flex: 1,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: buttonBackGroundColor,
                elevation: 3
            }}
            onPress={props.onPress3}
        >
            <Text style={{
                fontSize: 34,
                color: specialButtonTextColor,
            }}>
                −
            </Text>
        </TouchableOpacity>
    </View>;
}

function FourthRowContainer(props: { onPress: () => void, onPress1: () => void, onPress2: () => void }) {
    const buttonTextColor = useColorModeValue("#ffffff", "#000000");
    const specialButtonTextColor = useColorModeValue("#7DD6FF", "#6E1DCE");
    const buttonBackGroundColor = useColorModeValue("#888888", "#ffffff");
    const equalButtonColorBackGroundColor = useColorModeValue("#7DD6FF", "#6E1DCE");

    return <View style={styles.row}>
        <TouchableOpacity
            style={{
                flex: 2,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: buttonBackGroundColor,
                elevation: 3,
                paddingLeft: 35,
                paddingRight: 35,
            }}
            onPress={props.onPress}
        >
            <Text style={{
                fontSize: 34,
                color: buttonTextColor,
                marginLeft: 10,
            }}>
                0
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={props.onPress1}
            style={{
                flex: 1,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: buttonBackGroundColor,
                elevation: 3
            }}>
            <Text style={{
                fontSize: 34,
                color: specialButtonTextColor,
            }}>
                +
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                flex: 1,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: equalButtonColorBackGroundColor,
                elevation: 3,
            }}
            onPress={props.onPress2}
        >
            <Text style={{
                fontSize: 32,
                color: 'white',
            }}>=</Text>
        </TouchableOpacity>
    </View>;
}


interface EditWhoComponentProps {
    navigation: any
    route: any
}

export default function EditWhoComponent(props: EditWhoComponentProps) {

    // State variables
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [firstValue, setFirstValue] = useState('');
    const [transactionType, setTransactionType] = useState('EXPENSE');
    const [userId, setUserId] = useState('');
    const [discardTransactionModalVisible, setDiscardTransactionModalVisible] = useState(false);
    const textColor = useColorModeValue("white", "black");
    const headerTextColor = useColorModeValue("black", "white");
    const bgColor = useColorModeValue("black", "white");
    const mainColor = useColorModeValue("#7DD6FF", "#6E1DCE");
    const buttonTextColor = useColorModeValue("#7DD6FF", "#6E1DCE");
    const buttonBackGroundColor = useColorModeValue("#888888", "#ffffff");
    const [base64Image, setBase64Image] = useState<string>('');

    // Function to handle number inputs
    const handleNumberInput = (num: any) => {
        if (displayValue === '0') {
            setDisplayValue(num.toString());
        } else {
            setDisplayValue(displayValue + num);
        }
    };

    // Function to handle operator inputs
    const handleOperatorInput = (operator: any) => {
        setOperator(operator);
        setFirstValue(displayValue);
        setDisplayValue('0');
    };

    // Function to handle equal button press
    const handleEqual = () => {
        const num1 = parseFloat(firstValue);
        const num2 = parseFloat(displayValue);

        if (operator === '+') {
            setDisplayValue((num1 + num2).toString());
        } else if (operator === '-') {
            setDisplayValue((num1 - num2).toString());
        } else if (operator === '*') {
            setDisplayValue((num1 * num2).toString());
        } else if (operator === '/') {
            setDisplayValue((num1 / num2).toString());
        }

        setOperator(null);
        setFirstValue('');
    };

    // Function to handle clear button press
    const handleClear = () => {
        setDisplayValue('0');
        setOperator(null);
        setFirstValue('');
    };

    const connectUsersToSelect = () => {
        return props.route.params?.group?.users?.map((user: UserEntity) => {
            return <Select.Item key={user.id!!} label={user?.lastName!!} value={user.id!!.toString()}/>
        })
    }

    const setCheckUserEmail = (itemValue: string) => {
        if (itemValue === 'multipleMembers') {
            props.navigation.navigate('EditWhoMultipleMembers', {group: props.route.params?.group, value: displayValue})
        } else {
            setUserId(itemValue)
            AsyncStorage.getItem('email').then((email) => {
                transactionEditorService.getSelectedAvatar(email!!).then((response) => {
                    setBase64Image(response.data?.base64!!)
                })
            })
        }
    }

    const createWho = () => {
        let whoTemp: any[]
        whoTemp = props.route.params.group.users.map((user: UserEntity) => {
            return {key: user?.id!!.toString(), value: user.lastName, amount: 0, selected: true, base64: user?.image?.base64}
        })
        //modify whoTemp, where key is the id of the user, value is the name of the user, amount is the amount of the transaction, selected is if the user is selected
        whoTemp.forEach((user: any) => {
            if (user.key === userId) {
                user.amount = displayValue
            } else {
                user.amount = 0
            }
        })
        return whoTemp;
    }

    const closeModal = () => {
        setDiscardTransactionModalVisible(false)
    }

    const discardTransaction = () => {
        setDiscardTransactionModalVisible(false)
        props.navigation.goBack()
    }

    return (
        <SafeAreaView style={{
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
            marginTop: 45,
            backgroundColor: bgColor
        }}>
            <DiscardTransactionModalComponent visible={discardTransactionModalVisible} keep={() => closeModal()} discard={() => discardTransaction()}/>
            <Box backgroundColor={mainColor} w="100%" h="7%">
                <HStack alignItems="center" space="20">
                    <Button backgroundColor={"transparent"} style={{marginLeft: 5}} onPress={() => {
                        setDiscardTransactionModalVisible(true)
                    }}>
                        <Icon
                            color={headerTextColor}
                            name="close"
                            as={MaterialIcons}
                            size="md"/></Button>
                    <FormControl backgroundColor={"transparent"} color={"transparent"} maxW="25%" isRequired>
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
                </HStack>
            </Box>
            <HStack bgColor={bgColor} alignItems={"center"}>
                {base64Image === '' || base64Image == null ? <Avatar mt={3} ml={3} bg="gray.300">X</Avatar> : <Avatar mt={3} ml={3} bg="gray.300" source={{uri: `data:image/png;base64,${base64Image}`}}/>}
                <FormControl mt={3} backgroundColor={"transparent"} color={"transparent"} maxW="25%" isRequired>
                    <Select
                        minWidth="150"
                        placeholder={props.route.params?.group?.users?.[0]?.lastName!!}
                        color={textColor}
                        isFocusVisible={false}
                        variant={"unstyled"}
                        textAlign={"center"}
                        fontSize={"lg"}
                        fontWeight={"bold"}
                        onValueChange={(itemValue) => {
                          setCheckUserEmail(itemValue);
                        }}
                        placeholderTextColor={textColor}
                        dropdownIcon={<Icon color={textColor} as={MaterialIcons} name="expand-more" size="md"/>}
                        mt="1"
                    >
                        {connectUsersToSelect()}
                        <Select.Item label={"Multiple members"} value={'multipleMembers'}/>
                    </Select>
                </FormControl>
            </HStack>
            <View backgroundColor={bgColor} style={styles.container}>
                <ValueContainer displayValue={displayValue}/>
                <SafeAreaView style={styles.buttonContainer}>
                    <FirstRowContainer onPress={() => handleNumberInput(7)} onPress1={() => handleNumberInput(8)}
                                       onPress2={() => handleNumberInput(9)} onPress3={() => handleOperatorInput('/')}/>
                    <SecondRowContainer onPress={() => handleNumberInput(4)} onPress1={() => handleNumberInput(5)}
                                        onPress2={() => handleNumberInput(6)}
                                        onPress3={() => handleOperatorInput('*')}/>
                    <ThirdRowContainer onPress={() => handleNumberInput(1)} onPress1={() => handleNumberInput(2)}
                                       onPress2={() => handleNumberInput(3)} onPress3={() => handleOperatorInput('-')}/>
                    <FourthRowContainer onPress={() => handleNumberInput(0)} onPress1={() => handleOperatorInput('+')}
                                        onPress2={handleEqual}/>
                    <TouchableOpacity
                        style={{
                            borderRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: buttonBackGroundColor,
                            marginTop: 10,
                            elevation: 3,
                            padding: 10,
                        }}
                        onPress={handleClear}>
                        <Text style={{
                            fontSize: 24,
                            color: buttonTextColor,
                        }}>C</Text>
                    </TouchableOpacity>
                </SafeAreaView>
                <Box w="80%" mt={5} mb={5} bgColor={bgColor}>
                    <GradientButtonComponent elevation={5} text={"Continue"} onPress={() => {
                        props.navigation.navigate('TransactionSave', {who: createWho(), type: transactionType, group: props.route.params?.group!!})
                    }}></GradientButtonComponent>
                </Box>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
        marginTop: 45
    },
    container: {
        marginTop: 60,
        flex: 1,
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
        flex: 2,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 3,
        paddingLeft: 35,
        paddingRight: 35,
    },
    buttonText: {
        fontSize: 34,
        color: '#333',
        marginLeft: 10,
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
    }
});
