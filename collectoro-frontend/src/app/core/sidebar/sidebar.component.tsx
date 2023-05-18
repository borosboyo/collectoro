import {SidebarNavigationProps} from "./sidebar-navigation.props";
import React from "react";
import {Avatar, Box, ChevronRightIcon, Divider, HStack, Pressable, Text, VStack,} from "native-base";
import {createDrawerNavigator} from "@react-navigation/drawer";

export default function SidebarComponent({navigation}: SidebarNavigationProps) {
    const options = [
        {
            label: "My Groups",
        },
        {
            label: "Create a new group",
        },
        {
            label: "About",
        }
    ];
    const Drawer = createDrawerNavigator();
    return (
        <Box flex="1" bg="white">
            <VStack
                bg="black"
                space="4"
                pt="16"
                divider={<Divider thickness="0.2"/>}
            >
                <HStack alignItems="center" space="3" px="4">
                    <Avatar bg="gray.300">GG</Avatar>
                    <VStack>
                        <Text fontSize="md" fontWeight="bold" color="white">
                            Sample name
                        </Text>
                        <HStack alignItems="stretch" space="12" divider={<Divider thickness="0.3"/>}>
                            <Text fontSize="xs" color="trueGray.400">
                                Email
                            </Text>
                        </HStack>
                    </VStack>
                </HStack>
                <Pressable
                    px="4"
                    pb="5"
                    pt="1"
                    flexDir="row"
                    justifyContent="space-between"
                >
                    <Text color="warmGray.100" fontSize="md">
                        Edit profile
                    </Text>
                    <ChevronRightIcon size="sm" color="white"/>
                </Pressable>
            </VStack>
            <VStack space="2" w="100%">
                {options.map((option, idx) => {
                    return (
                        <Pressable
                            key={idx}
                            p="4"
                            _pressed={{
                                bg: "coolGray.300",
                            }}
                            _hover={{
                                bg: "coolGray.200",
                            }}
                        >
                            <Text fontSize="md">{option.label}</Text>
                        </Pressable>
                    );
                })}
                <Pressable
                    p="4"
                    _pressed={{
                        bg: "coolGray.300",
                    }}
                    _hover={{
                        bg: "coolGray.200",
                    }}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text fontSize="md">Logout</Text>
                </Pressable>
            </VStack>
        </Box>
    );
}