import React, { Component } from "react";
import { SafeAreaView, StyleSheet, View, Platform, ScrollView, TextInput} from "react-native";
import CalculatorButton from "./button.component";
import RowComponent from "./row.component";
import calculatorUtil, { initialState } from "./calculator.util";
import { MultipleSelectList, SelectList } from "react-native-dropdown-select-list/index";
import {Box, Button, ChevronLeftIcon, ChevronRightIcon, Divider, HStack, VStack} from "native-base";
import {Pressable, Text} from "native-base";
import {TransactionEditorNavigationProps} from "./transaction-editor.props";
import TransactionEditorService from "./transaction-editor.service";
import {ProcessTransactionReqTypeEnum, UserWithAmountTypeEnum} from "../../../../swagger";

type TransactionEditorState = {
};

export default class TransactionEditorComponent extends Component<TransactionEditorNavigationProps, TransactionEditorState>  {
    state = initialState;
    selectedType = ProcessTransactionReqTypeEnum;
    selectedWho = null;
    selectedForWhom = null;
    transactionType = [
        { key: "1", value: ProcessTransactionReqTypeEnum.EXPENSE },
        { key: "2", value: ProcessTransactionReqTypeEnum.INCOME },
        { key: "3", value: ProcessTransactionReqTypeEnum.TRANSFER },
    ];

    who: any[] = []
    whoReq: any[] = []
    forWhom: any[] = []
    forWhomReq: any[] = []
    purpose = ""

    constructor(props: TransactionEditorNavigationProps) {
        super(props);
        this.who = this.props.route.params.group.users.map((user) => {
            return {key: user.id.toString(), value: user.lastName, amount: 0}
        })
        this.forWhom = this.props.route.params.group.users.map((user) => {
            return {key: user.id.toString(), value: user.lastName, amount: 0}
        })

        this.whoReq = this.props.route.params.group.users.map((user) => {
            return {id: 0, userId: user.id.toString(), lastName: user.lastName, amount: 0, transaction: null, type: UserWithAmountTypeEnum.WHO}
        })

        this.forWhomReq = this.props.route.params.group.users.map((user) => {
            return {id: 0, userId: user.id.toString(), lastName: user.lastName, amount: 0, transaction: null, type: UserWithAmountTypeEnum.FORWHOM}
        })    }

    // handle tap method
    HandleTap = (type, value) => {
        this.setState((calculatorState) => calculatorUtil(type, value, calculatorState));
    };

    mapWho = () => {
        //copy who amount to whoReq amounts
        this.whoReq.forEach((userReq) => {
            this.who.forEach((user) => {
                if(userReq.userId === user.key) {
                    userReq.amount = user.amount
                }
            })
        })
    }

    mapForWhom = () => {
        //copy forWhom amount to forWhomReq amounts
        this.forWhomReq.forEach((userReq) => {
            this.forWhom.forEach((user) => {
                if(userReq.userId === user.key) {
                    userReq.amount = user.amount
                }
            })
        })
    }

    render() {

        const containerStyle = Platform.OS === "web" ? styles.webContainer : styles.androidContainer;

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={containerStyle}>
                    <HStack space="3">
                        <Pressable
                            onPress={() => this.props.navigation.goBack()}>
                            <ChevronLeftIcon size="sm" color="black"/>
                        </Pressable>
                        <Text color="black" fontSize="md">{this.props.route.params.group.name}</Text>
                    </HStack>
                    <Text style={styles.label}>Purpose:</Text>
                    <TextInput style={styles.input} onChangeText={newText => this.purpose = newText} placeholder="Enter purpose" />

                    <View style={styles.selectListContainer}>
                        <Text style={styles.label}>Type:</Text>
                        <SelectList setSelected={(val) => (this.selectedType = val)} data={this.transactionType} save="value" />
                    </View>
                    <View style={styles.selectListContainer}>
                        <VStack>
                            <Text style={styles.label}>Who:</Text>
                            {this.who.map((user) => {
                                return (
                                    <HStack key={user.key}>
                                        <View>
                                            <Text style={styles.userLastName}>{user.value}</Text>
                                            <TextInput style={styles.input} onChangeText={newText => {
                                                user.amount = parseFloat(newText);
                                                this.mapWho();
                                            }} placeholder="Enter amount" />
                                        </View>
                                    </HStack>
                                )
                            })}
                        </VStack>
                    </View>
                    <View style={styles.selectListContainer}>
                        <VStack>
                            <Text style={styles.label}>For Whom:</Text>
                            {this.forWhom.map((user) => {
                                return (
                                    <HStack key={user.key}>
                                        <View>
                                            <Text style={styles.userLastName}>{user.value}</Text>
                                            <TextInput style={styles.input} onChangeText={newText => {
                                                user.amount = parseFloat(newText);
                                                this.mapForWhom();
                                            }} placeholder="Enter amount" />
                                        </View>
                                    </HStack>
                                )
                            })}
                        </VStack>
                    </View>
                    <Divider thickness="5" />
                    <View style={styles.calculatorContainer}>
                        {/*<SafeAreaView>
                            <Text style={styles.value}>{parseFloat(this.state.currentValue).toLocaleString()}</Text>


                            <RowComponent>
                                <CalculatorButton text="C" theme="secondary" onPress={() => this.HandleTap("clear")} />
                                <CalculatorButton text="+/-" theme="secondary" onPress={() => this.HandleTap("posneg")} />
                                <CalculatorButton text="%" theme="secondary" onPress={() => this.HandleTap("percentage")} />
                                <CalculatorButton text="/" theme="accent" onPress={() => this.HandleTap("operator", "/")} />
                            </RowComponent>


                            <RowComponent>
                                <CalculatorButton text="7" onPress={() => this.HandleTap("number", 7)} />
                                <CalculatorButton text="8" onPress={() => this.HandleTap("number", 8)} />
                                <CalculatorButton text="9" onPress={() => this.HandleTap("number", 9)} />
                                <CalculatorButton text="X" theme="accent" onPress={() => this.HandleTap("operator", "*")} />
                            </RowComponent>

                            <RowComponent>
                                <CalculatorButton text="5" onPress={() => this.HandleTap("number", 5)} />
                                <CalculatorButton text="6" onPress={() => this.HandleTap("number", 6)} />
                                <CalculatorButton text="7" onPress={() => this.HandleTap("number", 7)} />
                                <CalculatorButton text="-" theme="accent" onPress={() => this.HandleTap("operator", "-")} />
                            </RowComponent>

                            <RowComponent>
                                <CalculatorButton text="1" onPress={() => this.HandleTap("number", 1)} />
                                <CalculatorButton text="2" onPress={() => this.HandleTap("number", 2)} />
                                <CalculatorButton text="3" onPress={() => this.HandleTap("number", 3)} />
                                <CalculatorButton text="+" theme="accent" onPress={() => this.HandleTap("operator", "+")} />
                            </RowComponent>

                            <RowComponent>
                                <CalculatorButton text="0" onPress={() => this.HandleTap("number", 0)} />
                                <CalculatorButton text="." onPress={() => this.HandleTap("number", ".")} />
                                <CalculatorButton text="=" theme="primary" onPress={() => this.HandleTap("equal", "=")} />
                            </RowComponent>
                        </SafeAreaView>

                        */}
                    <Button onPress={() => {
                            TransactionEditorService.processTransaction(this.purpose, this.whoReq, this.forWhomReq, this.props.route.params.group.id, Number(this.state.currentValue), this.selectedType).then(r =>
                                this.props.navigation.goBack())
                        }}>Save</Button>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

// create styles of app
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "flex-end",
        backgroundColor: "#fff",
    },
    webContainer: {
        maxHeight: "100%",
        marginVertical: 20,
        marginHorizontal: 150,
    },
    androidContainer: {
        flex: 1,
    },
    selectListContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginRight: 10,
        fontWeight: "bold",
    },
    userLastName: {
        fontSize: 12,
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    calculatorContainer: {
        flex: 1,
        backgroundColor: "#202020",
        justifyContent: "flex-end",
    },
    value: {
        color: "#fff",
        fontSize: 42,
        textAlign: "right",
        marginRight: 20,
        marginBottom: 10,
    },
});
