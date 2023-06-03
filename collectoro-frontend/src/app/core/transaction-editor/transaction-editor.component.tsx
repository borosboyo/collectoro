import React, { Component } from "react";
import { SafeAreaView, StyleSheet, View, Platform, ScrollView, TextInput} from "react-native";
import CalculatorButton from "./button.component";
import RowComponent from "./row.component";
import calculatorUtil, { initialState } from "./calculator.util";
import { MultipleSelectList, SelectList } from "react-native-dropdown-select-list/index";
import {Box, Button, ChevronLeftIcon, ChevronRightIcon, Divider, HStack} from "native-base";
import {Pressable, Text} from "native-base";
import {TransactionEditorNavigationProps} from "./transaction-editor.props";

type TransactionEditorState = {
};

export default class TransactionEditorComponent extends Component<TransactionEditorNavigationProps, TransactionEditorState>  {
    state = initialState;
    selectedValue = null;
    selectedWho = null;
    selectedForWhom = null;
    data = [
        { key: "1", value: "Expense" },
        { key: "2", value: "Income" },
        { key: "3", value: "Transfer" },
    ];
    who = [
        { key: "1", value: "Expense" },
        { key: "2", value: "Income" },
        { key: "3", value: "Transfer" },
    ];
    forWhom = [
        { key: "1", value: "Expense" },
        { key: "2", value: "Income" },
        { key: "3", value: "Transfer" },
    ];
    // handle tap method
    HandleTap = (type, value) => {
        this.setState((state) => calculatorUtil(type, value, state));
    };

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
                        <Text color="black" fontSize="md">Group name</Text>
                    </HStack>
                    <Text style={styles.label}>Purpose:</Text>
                    <TextInput style={styles.input} placeholder="Enter purpose" />

                    <View style={styles.selectListContainer}>
                        <Text style={styles.label}>Type:</Text>
                        <SelectList setSelected={(val) => (this.selectedValue = val)} data={this.data} save="value" />
                    </View>
                    <View style={styles.selectListContainer}>
                        <Text style={styles.label}>Who:</Text>
                        <MultipleSelectList setSelected={(val) => (this.selectedWho = val)} data={this.who} save="value" />
                    </View>
                    <View style={styles.selectListContainer}>
                        <Text style={styles.label}>For Whom:</Text>
                        <MultipleSelectList setSelected={(val) => (this.selectedWho = val)} data={this.who} save="value" />
                    </View>
                    <Divider thickness="5" />
                    <View style={styles.calculatorContainer}>
                        <SafeAreaView>
                            <Text style={styles.value}>{parseFloat(this.state.currentValue).toLocaleString()}</Text>

                            {/* Do create componentRow */}
                            <RowComponent>
                                <CalculatorButton text="C" theme="secondary" onPress={() => this.HandleTap("clear")} />
                                <CalculatorButton text="+/-" theme="secondary" onPress={() => this.HandleTap("posneg")} />
                                <CalculatorButton text="%" theme="secondary" onPress={() => this.HandleTap("percentage")} />
                                <CalculatorButton text="/" theme="accent" onPress={() => this.HandleTap("operator", "/")} />
                            </RowComponent>

                            {/* Number */}
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
                        <Button>Add</Button>
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
        marginRight: 10,
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
