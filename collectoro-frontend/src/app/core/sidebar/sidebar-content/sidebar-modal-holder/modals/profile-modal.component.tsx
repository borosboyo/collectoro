import Modal from "react-native-modal";
import {ArrowBackIcon, Avatar, Box, Button, Divider, Heading, HStack, Text, useColorModeValue, View} from "native-base";
import React from "react";
import {GetProfileByUserEmailResp} from "../../../../../../../swagger";

export default function ProfileModalComponent(props: {
    visible: boolean,
    onPress: () => void,
    profile: GetProfileByUserEmailResp
}) {
    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "coolGray.100");
    const subtitleColor = useColorModeValue("trueGray.800", "trueGray.200");
    return <Modal isVisible={props.visible}>
        <View backgroundColor={bgColor} style={{flex: 1}}>
            <HStack mt={5} alignItems="center" space="20">
                <Button onPress={props.onPress} backgroundColor={"transparent"} style={{marginLeft: 5}}>
                    <ArrowBackIcon
                        color={textColor}
                        name="close"
                        size="md"/>
                </Button>
                <Heading ml={5} alignItems={"center"} color={textColor} justifyContent={"center"} fontSize={18}>
                    Profile
                </Heading>
            </HStack>
            <HStack justifyContent="center" space="20">
                <Avatar mb="3" mt="10" bg={bgColor} size="2xl">GG</Avatar>
            </HStack>
            <HStack justifyContent="center" space="20">
                <Text color={textColor}>Edit profile picture</Text>
            </HStack>
            <Box mt={5}
                 backgroundColor={subtitleColor} w="100%">
                <Divider thickness="2" bgColor={textColor}/>
                <View mt={3} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View ml={5} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: textColor}}>
                            Name
                        </Text>
                        <Text style={{marginRight: 15, fontSize: 16, fontWeight: 'bold', color: textColor}}>
                            {props.profile?.user?.firstName} {props.profile?.user?.lastName}
                        </Text>
                    </View>
                </View>
                <Divider mb={3} mt={3} thickness="2" bgColor={textColor}/>
                <View mb={3} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View ml={5} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: textColor}}>
                            Email address
                        </Text>
                        <Text style={{marginRight: 15, fontSize: 16, fontWeight: 'bold', color: textColor}}>
                            {props.profile?.user?.email}
                        </Text>
                    </View>
                </View>
            </Box>
            <Divider thickness="2" bgColor={textColor}/>
            <View ml={5} mt={5} style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text color={textColor} style={{marginRight: 15, fontSize: 16, fontWeight: 'bold'}}>
                    Delete account
                </Text>
            </View>
        </View>
    </Modal>;
}
