import {
    Avatar,
    Button,
    HStack,
    MoonIcon,
    Pressable,
    SunIcon,
    Text,
    useColorMode,
    useColorModeValue,
    VStack
} from "native-base";
import React from "react";
import {GetProfileByUserEmailResp} from "../../../../../../swagger";

export default function SidebarProfileSection(props: { profile: GetProfileByUserEmailResp, onPress: () => void }) {
    const {toggleColorMode} = useColorMode();
    const iconState = useColorModeValue("moon", "sun");
    const baseColor = useColorModeValue("white", "black");
    const subtitleColor = useColorModeValue("trueGray.200", "trueGray.800");
    return <HStack alignItems="center" space="3" px="4">
        <VStack>
            <HStack alignItems="stretch" space="12">
                <Avatar mb="3" bg={baseColor}>GG</Avatar>
                <Pressable ml={130} onPress={toggleColorMode}>
                    {iconState === "moon" ? <MoonIcon color={baseColor} size="md"/> :
                        <SunIcon color={baseColor} size="md"/>}
                </Pressable>
            </HStack>
            <Text fontSize="md" fontWeight="bold" color={baseColor}>
                FirstName LastName
                {props.profile?.user?.firstName} {props.profile?.user?.lastName}
            </Text>
            <HStack alignItems="stretch" space="12">
                <Text fontSize="xs" color={baseColor}>
                    borosgergo00@gmail.com
                    {props.profile?.user?.email}
                </Text>
                <Pressable onPress={props.onPress}>
                    <Text fontSize="xs" color={subtitleColor}>
                        Edit profile
                    </Text>
                </Pressable>
            </HStack>
        </VStack>
    </HStack>;
}
