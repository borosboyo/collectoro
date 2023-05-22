import React, {Component, useEffect, useState} from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CalculatorButton from "./button.component"
import RowComponent from "./row.component"
import calculatorUtil, {initialState} from "./calculator.util";
import {MultipleSelectList, SelectList} from "react-native-dropdown-select-list/index";
import {Box, Button} from "native-base";

export default class TransactionEditorComponent extends Component {
    state = initialState;
    selectedValue = null;
    selectedWho = null;
    selectedForWhom = null;
    data = [
        {key:'1', value:'Expense'},
        {key:'2', value:'Income'},
        {key:'3', value:'Transfer'},
    ]
    who = [
        {key:'1', value:'Expense'},
        {key:'2', value:'Income'},
        {key:'3', value:'Transfer'},
    ]
    forWhom = [
        {key:'1', value:'Expense'},
        {key:'2', value:'Income'},
        {key:'3', value:'Transfer'},
    ]
    // handle tap method
   HandleTap = (type, value) => {
        this.setState((state) => calculatorUtil(type, value, state));
    };
    
    render() {
        return (
            <View style={styles.box}>
                <SelectList
                    setSelected={(val) => this.selectedValue = val}
                    data={this.data}
                    save="value"
                />
                <MultipleSelectList
                    setSelected={(val) => this.selectedWho = val}
                    data={this.who}
                    save="value"
                />
                <MultipleSelectList
                    setSelected={(val) => this.selectedForWhom = val}
                    data={this.forWhom}
                    save="value"
                />
                <View style={styles.container}>
                    <SafeAreaView>
                        <Text style={styles.value}>
                            {parseFloat(this.state.currentValue).toLocaleString()}
                        </Text>

                        {/* Do create componentRow */}
                        <RowComponent>
                            <CalculatorButton
                                text="C"
                                theme="secondary"
                                onPress={() => this.HandleTap("clear")}
                            />

                            <CalculatorButton
                                text="+/-"
                                theme="secondary"
                                onPress={() => this.HandleTap("posneg")}
                            />

                            <CalculatorButton
                                text="%"
                                theme="secondary"
                                onPress={() => this.HandleTap("percentage")}
                            />

                            <CalculatorButton
                                text="/"
                                theme="accent"
                                onPress={() => this.HandleTap("operator", "/")}
                            />
                        </RowComponent>

                        {/* Number */}
                        <RowComponent>
                            <CalculatorButton text="7" onPress={() => this.HandleTap("number", 7)}/>
                            <CalculatorButton text="8" onPress={() => this.HandleTap("number", 8)}/>
                            <CalculatorButton text="9" onPress={() => this.HandleTap("number", 9)}/>
                            <CalculatorButton
                                text="X"
                                theme="accent"
                                onPress={() => this.HandleTap("operator", "*")}
                            />
                        </RowComponent>

                        <RowComponent>
                            <CalculatorButton text="5" onPress={() => this.HandleTap("number", 5)}/>
                            <CalculatorButton text="6" onPress={() => this.HandleTap("number", 6)}/>
                            <CalculatorButton text="7" onPress={() => this.HandleTap("number", 7)}/>
                            <CalculatorButton
                                text="-"
                                theme="accent"
                                onPress={() => this.HandleTap("operator", "-")}
                            />
                        </RowComponent>

                        <RowComponent>
                            <CalculatorButton text="1" onPress={() => this.HandleTap("number", 1)}/>
                            <CalculatorButton text="2" onPress={() => this.HandleTap("number", 2)}/>
                            <CalculatorButton text="3" onPress={() => this.HandleTap("number", 3)}/>
                            <CalculatorButton
                                text="+"
                                theme="accent"
                                onPress={() => this.HandleTap("operator", "+")}
                            />
                        </RowComponent>

                        <RowComponent>
                            <CalculatorButton text="0" onPress={() => this.HandleTap("number", 0)}/>
                            <CalculatorButton text="." onPress={() => this.HandleTap("number", ".")}/>
                            <CalculatorButton
                                text="="
                                theme="primary"
                                onPress={() => this.HandleTap("equal", "=")}
                            />
                        </RowComponent>
                    </SafeAreaView>
                    <Button> Add </Button>
                </View>
            </View>
        );
    }
}

// create styles of app
const styles = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: "flex-end",
        width: "100%",
        height: "100%",
    },
    container: {
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