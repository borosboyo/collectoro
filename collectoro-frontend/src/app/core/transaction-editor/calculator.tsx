import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Box, Button, Center, FormControl, HStack, Icon, Select} from "native-base";
import GradientButtonComponent from "../../shared/components/gradient-button.component";
import {MaterialIcons} from "@expo/vector-icons";

function ValueContainer(props: { displayValue: string }) {
    return <View style={styles.displayContainer}>
        <Text style={styles.displayText}>
            {props.displayValue}
        </Text>
    </View>;
}

function FirstRowContainer(props: {
    onPress: () => void,
    onPress1: () => void,
    onPress2: () => void,
    onPress3: () => void
}) {
    return <View style={styles.row}>
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress}
        >
            <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress1}
        >
            <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress2}
        >
            <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button, styles.operatorButton]}
            onPress={props.onPress3}
        >
            <Text style={[
                styles.buttonText,
                styles.operatorButtonText
            ]}>
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
    return <View style={styles.row}>
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress}
        >
            <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress1}
        >
            <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress2}
        >
            <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button, styles.operatorButton]}
            onPress={props.onPress3}
        >
            <Text style={[
                styles.buttonText,
                styles.operatorButtonText
            ]}>
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
    return <View style={styles.row}>
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress}
        >
            <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress1}
        >
            <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress2}
        >
            <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button, styles.operatorButton]}
            onPress={props.onPress3}
        >
            <Text style={[
                styles.buttonText,
                styles.operatorButtonText
            ]}>
                −
            </Text>
        </TouchableOpacity>
    </View>;
}

function FourthRowContainer(props: { onPress: () => void, onPress1: () => void, onPress2: () => void }) {
    return <View style={styles.row}>
        <TouchableOpacity
            style={[styles.button, styles.zeroButton]}
            onPress={props.onPress}
        >
            <Text style={[
                styles.buttonText,
                styles.zeroButtonText
            ]}>
                0
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button, styles.operatorButton]}
            onPress={props.onPress1}
        >
            <Text style={[
                styles.buttonText,
                styles.operatorButtonText
            ]}>
                +
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.equalButton}
            onPress={props.onPress2}
        >
            <Text style={styles.equalButtonText}>=</Text>
        </TouchableOpacity>
    </View>;
}

export default function CalculatorComponent() {

    // State variables
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [firstValue, setFirstValue] = useState('');

    // Function to handle number inputs
    const handleNumberInput = (num) => {
        if (displayValue === '0') {
            setDisplayValue(num.toString());
        } else {
            setDisplayValue(displayValue + num);
        }
    };

    // Function to handle operator inputs
    const handleOperatorInput = (operator) => {
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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Box backgroundColor={"coolGray.600"} _dark={{
                color: "warmGray.50"
            }} w="100%" h="10%">
                <HStack mt={2.5} alignItems="stretch" space="20">
                    <Button backgroundColor={"transparent"} style={{marginLeft: 10}}><Icon color="white" as={MaterialIcons} name="close" size="sm"/></Button>
                    <FormControl backgroundColor={"transparent"} color={"transparent"} maxW="25%" isRequired>
                        <Select
                            minWidth="120"
                            placeholder={"Expense"}
                            color={"white"}
                            isFocusVisible={false}
                            variant={"unstyled"}
                            textAlign={"center"}
                            fontSize={"lg"}
                            placeholderTextColor={"white"}
                            dropdownIcon={<Icon color="white" as={MaterialIcons} name="expand-more" size="md"/>}
                            mt="1"
                        >
                            <Select.Item label="Expense" value="expense"/>
                            <Select.Item label="Income" value="income"/>
                            <Select.Item label="Transfer" value="transfer"/>
                        </Select>
                    </FormControl>
                </HStack>
            </Box>
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
                    style={styles.clearButton}
                    onPress={handleClear}>
                    <Text style={styles.clearButtonText}>C</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <Box w="80%" mt={5} mb={5} color="coolGray.600" _dark={{
                color: "warmGray.50"
            }}>
                <GradientButtonComponent elevation={5} text={"Continue"}></GradientButtonComponent>
            </Box>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
});
