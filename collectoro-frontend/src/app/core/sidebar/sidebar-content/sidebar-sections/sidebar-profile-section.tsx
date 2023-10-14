import {Avatar, HStack, Pressable, Text, VStack} from "native-base";
import React from "react";
import {GetProfileByUserEmailResp} from "../../../../../../swagger";

export default function SidebarProfileSection(props: { profile: GetProfileByUserEmailResp, onPress: () => void }) {
    return <HStack alignItems="center" space="3" px="4">
        <VStack>
            <Avatar mb="3" bg="gray.300">GG</Avatar>
            <Text fontSize="md" fontWeight="bold" color="white">
                FirstName LastName
                {props.profile?.user?.firstName} {props.profile?.user?.lastName}
            </Text>
            <HStack alignItems="stretch" space="12">
                <Text fontSize="xs" color="trueGray.400">
                    borosgergo00@gmail.com
                    {props.profile?.user?.email}
                </Text>
                <Pressable onPress={props.onPress}>
                    <Text fontSize="xs" color="trueGray.400">
                        Edit profile
                    </Text>
                </Pressable>
            </HStack>
        </VStack>
    </HStack>;
}
