
import * as React from "react";
import {
    Box,
    Button,
    Center,
    FormControl,
    Heading,
    Input,
    VStack
} from "native-base";
import {EnableAccountNavigationProps} from "./enable-account-navigation.props"
import registerService from "../register.service";

export default function EnableAccountComponent({navigation}: EnableAccountNavigationProps) {
    const [enableToken, setEnableToken] = React.useState("");
    return (<Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading size="lg" color="coolGray.800" _dark={{
                color: "warmGray.50"
            }} fontWeight="semibold">
                Collectoro
            </Heading>
            <Heading mt="1" color="coolGray.600" _dark={{
                color: "warmGray.200"
            }} fontWeight="medium" size="xs">
                Enable your account!
            </Heading>
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Token</FormControl.Label>
                    <Input type="text" onChangeText={newText => setEnableToken(newText)} />
                </FormControl>
                <Button mt="2" colorScheme="indigo"
                        onPress={() => {
                            registerService.enable(enableToken).then(() => {
                                navigation.navigate("Login");
                            });
                        }}>
                    Enable account
                </Button>
            </VStack>
        </Box>
    </Center>);
}