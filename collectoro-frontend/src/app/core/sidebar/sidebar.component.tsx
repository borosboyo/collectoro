import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem, DrawerContentComponentProps
} from '@react-navigation/drawer';
import {Avatar, Box, ChevronRightIcon, Divider, HStack, Pressable, Text, VStack} from "native-base";
import React from "react";

export default function SidebarComponent(props: DrawerContentComponentProps) {
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

    return (
        <DrawerContentScrollView {...props} style={{display: 'flex'}}>
            <Box bg="black" mt="0">
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
                                px="4"
                                pb="5"
                                pt="1"
                                flexDir="row"
                                justifyContent="space-between"
                            >
                                <Text color="warmGray.100" fontSize="md">
                                    {option.label}
                                </Text>
                                <ChevronRightIcon size="sm" color="white"/>
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
                        onPress={() => props.navigation.navigate("Login")}
                    >
                        <Text fontSize="md">Logout</Text>
                    </Pressable>
                </VStack>
            </Box>
        </DrawerContentScrollView>
);
}