import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {
    Avatar,
    Box,
    Button,
    Center,
    FormControl,
    Heading,
    HStack,
    Icon,
    Pressable,
    Select,
    View,
    VStack
} from "native-base";
import GradientButtonComponent from "../../shared/components/gradient-button.component";
import {MaterialIcons} from "@expo/vector-icons";
export default function EditWhoMultipleMembersComponent() {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView>
                <Box backgroundColor={"#6E1DCE"} _dark={{
                    color: "warmGray.50"
                }} w="100%">
                    <HStack mt={3} mb={3} alignItems="center" space="20">
                        <Button backgroundColor={"transparent"} style={{marginLeft: 10}}><Icon color="white"
                                                                                               as={MaterialIcons}
                                                                                               name="close"
                                                                                               size="md"/></Button>
                        <Heading ml={6} alignItems={"center"} justifyContent={"center"} backgroundColor={"transparent"} color={"white"} fontSize={18}>
                            Who paid
                        </Heading>
                    </HStack>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <FormControl backgroundColor={"transparent"} color={"transparent"} maxW={"70%"} isRequired>
                                <Select
                                    minWidth="150"
                                    maxW={"70%"}
                                    placeholder={"Multiple members"}
                                    color={"white"}
                                    isFocusVisible={false}
                                    variant={"unstyled"}
                                    textAlign={"left"}
                                    fontSize={"lg"}
                                    fontWeight={"bold"}
                                    placeholderTextColor={"white"}
                                    dropdownIcon={<Icon color="white" as={MaterialIcons} name="expand-more" size="md"/>}
                                    mt="1"
                                >
                                    <Select.Item label="Gergő paid" value="expense"/>
                                    <Select.Item label="Pista paid" value="income"/>
                                    <Select.Item label="Józse paid" value="transfer"/>
                                    <Select.Item label="Multiple members" value="multiple"/>
                                </Select>
                            </FormControl>
                            <View mr={5} alignSelf={"center"}>
                                <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white' }}>100101 HUF</Text>
                            </View>
                        </View>
                    </View>
                </Box>
                <VStack>
                    <Heading style={styles.heading}>Who paid</Heading>
                    <Box pt={2} pb={2}
                         backgroundColor={"coolGray.600"} _dark={{
                        color: "warmGray.50"
                    }} w="100%">
                        <Pressable style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Avatar style={{marginLeft: 5, marginRight: 8}}>GG</Avatar>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                                    FirstName
                                </Text>
                                <View mr={15}>
                                    <FormControl>
                                        <TextInput textAlign={"center"} color={"white"} placeholder={"123123 HUF"} placeholderTextColor="white"
                                                   onChangeText={newText => console.log(newText)}/>
                                    </FormControl>
                                </View>
                            </View>
                        </Pressable>
                    </Box>
                    <Box pt={2} pb={2}
                         backgroundColor={"coolGray.600"} _dark={{
                        color: "warmGray.50"
                    }} w="100%">
                        <Pressable style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Avatar style={{marginLeft: 5, marginRight: 8}}>GG</Avatar>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                                    FirstName
                                </Text>
                                <View mr={15}>
                                    <FormControl>
                                        <TextInput textAlign={"center"} color={"white"} placeholder={"123123 HUF"} placeholderTextColor="white"
                                                   onChangeText={newText => console.log(newText)}/>
                                    </FormControl>
                                </View>
                            </View>
                        </Pressable>
                    </Box>
                    <Box pt={2} pb={2}
                         backgroundColor={"coolGray.600"} _dark={{
                        color: "warmGray.50"
                    }} w="100%">
                        <Pressable style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Avatar style={{marginLeft: 5, marginRight: 8}}>GG</Avatar>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text  style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                                    FirstName
                                </Text>
                                <View mr={15}>
                                    <FormControl>
                                        <TextInput textAlign={"center"} color={"white"} placeholder={"123123 HUF"} placeholderTextColor="white"
                                                   onChangeText={newText => console.log(newText)}/>
                                    </FormControl>
                                </View>

                            </View>
                        </Pressable>
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
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flexDirection: 'column', // inner items will be added vertically
        flexGrow: 1,            // all the available vertical space will be occupied by it
        justifyContent: 'space-between' // will create the gutter between body and footer
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
