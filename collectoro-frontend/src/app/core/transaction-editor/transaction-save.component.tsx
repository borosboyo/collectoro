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
    View,
    VStack
} from "native-base";
import React, {useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, TextInput} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import GradientButtonComponent from "../../shared/components/gradient-button.component";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function TransactionSaveComponent(props: any) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView>
                <Box backgroundColor={"coolGray.600"} _dark={{
                    color: "warmGray.50"
                }} w="100%">
                    <HStack mt={1.5} mb={1.5} alignItems="center" space="20">
                        <Button backgroundColor={"transparent"} style={{marginLeft: 10}}><Icon color="white"
                                                                                               as={MaterialIcons}
                                                                                               name="close"
                                                                                               size="md"/></Button>
                        <Text color="white" fontSize="lg" fontWeight="bold">New expense</Text>
                    </HStack>
                </Box>
                <VStack>
                    <Heading style={styles.heading}>Purpose</Heading>
                    <Box pt={5} pb={5} justifyContent={"center"} alignItems="center"
                         backgroundColor={"coolGray.600"} _dark={{
                        color: "warmGray.50"
                    }} w="100%">
                        <FormControl>
                            <TextInput textAlign={"center"} color={"white"} placeholder={"e.g. Pizza take out"} placeholderTextColor="white"
                                       onChangeText={newText => console.log(newText)}/>
                        </FormControl>
                    </Box>
                    <Heading style={styles.heading}>Who paid</Heading>
                    <Box pt={5} pb={2}
                         backgroundColor={"coolGray.600"} _dark={{
                        color: "warmGray.50"
                    }} w="100%">
                        <Pressable style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Avatar style={{marginLeft: 5, marginRight: 8}}>GG</Avatar>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                                    FirstName
                                </Text>
                                <Text style={{marginRight: 15, fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                                    1231231 HUF
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable>
                            <Text style={{marginTop: 8, marginLeft: 15, fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                                Edit
                            </Text>
                        </Pressable>
                    </Box>
                    <Heading style={styles.heading}>For whom</Heading>
                    <Box pt={5} pb={2}
                         backgroundColor={"coolGray.600"} _dark={{
                        color: "warmGray.50"
                    }} w="100%">
                        <View mb={2} style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Avatar style={{marginLeft: 5, marginRight: 8}}>GG</Avatar>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                                    FirstName
                                </Text>
                                <Checkbox style={{marginRight: 15}} colorScheme={"purple"} value={'true'} defaultIsChecked={true}>
                                </Checkbox>
                            </View>
                        </View>
                        <View mb={2} style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Avatar style={{marginLeft: 5, marginRight: 8}}>GG</Avatar>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                                    FirstName
                                </Text>
                                <Checkbox style={{marginRight: 15}} colorScheme={"purple"} value={'true'} defaultIsChecked={true}>
                                </Checkbox>
                            </View>
                        </View>
                        <View mb={2} style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Avatar style={{marginLeft: 5, marginRight: 8}}>GG</Avatar>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                                    FirstName
                                </Text>
                                <Checkbox style={{marginRight: 15}} colorScheme={"purple"} value={'true'} defaultIsChecked={true}>
                                </Checkbox>
                            </View>
                        </View>
                    </Box>
                    <Heading style={styles.heading}>Date & time</Heading>
                    <Box pt={5} pb={2}
                         backgroundColor={"coolGray.600"} _dark={{
                        color: "warmGray.50"
                    }} w="100%">
                        <Pressable mb={2} alignItems={"center"} justifyContent={"center"} onPress={showDatePicker}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                                2023/10/15
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
            <Box w="100%" backgroundColor="coolGray.600" _dark={{
                color: "warmGray.50"
            }}>
                <View mb={2} mt={2} ml={"10%"} mr={"10%"} w="80%">
                    <GradientButtonComponent elevation={5} text={"Continue"}></GradientButtonComponent>
                </View>
            </Box>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    safeAreaView: {
        flexDirection: 'column', // inner items will be added vertically
        flexGrow: 1,            // all the available vertical space will be occupied by it
        justifyContent: 'space-between' // will create the gutter between body and footer
    },
    heading: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 6,
        fontWeight: "bold",
        color: "#757575"
    },
});
