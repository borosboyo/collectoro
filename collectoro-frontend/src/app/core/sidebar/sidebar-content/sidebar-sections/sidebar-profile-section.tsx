import {
    Avatar,
    Button,
    HStack,
    MoonIcon,
    Pressable,
    SunIcon,
    Text,
    useColorMode,
    useColorModeValue, View,
    VStack
} from "native-base";
import React, {useEffect, useState} from "react";
import {GetProfileByUserEmailResp} from "../../../../../../swagger";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sidebarService from "../../sidebar.service";
import {useIsFocused} from "@react-navigation/native";

export default function SidebarProfileSection(props: { profile: GetProfileByUserEmailResp, onPress: () => void }) {
    const {toggleColorMode} = useColorMode();
    const iconState = useColorModeValue("moon", "sun");
    const baseColor = useColorModeValue("white", "black");
    const subtitleColor = useColorModeValue("trueGray.200", "trueGray.800");
    const [base64Image, setBase64Image] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused) {
            AsyncStorage.getItem('email').then((email) => {
                sidebarService.downloadImage(email!!).then((response) => {
                    setBase64Image(response.data.base64);
                    setIsLoading(false); // Set loading state to false when data is fetched
                }).catch((error) => {
                    console.log(error);
                    setIsLoading(false); // Also set loading state to false on error
                });
            });
        }
    }, [isFocused]);

    return (isLoading ? <></> : <HStack alignItems="center" space="3" px="4">
        <VStack>
            <HStack alignItems="stretch" space="12">
                <Avatar mb="3" mt="2" bg={baseColor} size="md" source={{uri: `data:image/png;base64,${base64Image}`}}>X</Avatar>
                <Pressable ml={130} onPress={toggleColorMode}>
                    {iconState === "moon" ? <MoonIcon color={baseColor} size="md"/> :
                        <SunIcon color={baseColor} size="md"/>}
                </Pressable>
            </HStack>
            <Text fontSize="md" fontWeight="bold" color={baseColor}>
                {props.profile?.user?.firstName} {props.profile?.user?.lastName}
            </Text>
            <View mt={1} style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text fontSize="xs" color={baseColor}>
                        {props.profile?.user?.email}
                    </Text>
                    <Pressable onPress={props.onPress}>
                        <Text fontSize="xs" color={subtitleColor}>
                            Edit profile
                        </Text>
                    </Pressable>
                </View>
            </View>
        </VStack>
    </HStack>);
}
