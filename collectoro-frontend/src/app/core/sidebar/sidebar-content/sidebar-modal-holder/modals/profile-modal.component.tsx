import Modal from "react-native-modal";
import {
    ArrowBackIcon,
    Avatar,
    Box,
    Button,
    Divider,
    FormControl,
    Heading,
    HStack, Image,
    Pressable,
    Text,
    useColorModeValue,
    View,
    VStack
} from "native-base";
import React, {useEffect, useState} from "react";
import {GetProfileByUserEmailResp} from "../../../../../../../swagger/index";
import {ImageBackground, TextInput} from "react-native";
import GradientButtonComponent from "../../../../../shared/components/gradient-button.component";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {styles} from "../../../../../shared/components/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sidebarService from "../../../sidebar.service";
import SidebarService from "../../../sidebar.service";
import Toast from "react-native-toast-message";
import {AppContext} from "../../../../../shared/components/appcontext";
import * as ImagePicker from 'expo-image-picker';

export default function ProfileModalComponent(props: {
    visible: boolean,
    onPress: () => void,
    profile: GetProfileByUserEmailResp
}) {
    const [editProfileNameVisible, setEditProfileNameVisible] = React.useState(false);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [image, setImage] = useState('');
    const [base64Image, setBase64Image] = useState<string>('');
    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "coolGray.100");
    const inputBackgroundColor = useColorModeValue("gray.700", "white");
    const placeHolderTextColor = useColorModeValue("#ffffff", "#c9c9c9");

    useEffect(() => {
        AsyncStorage.getItem('email').then((email) => {
            sidebarService.downloadImage(email!!).then((response) => {
                setBase64Image(response.data.base64)
                console.log(base64Image)
            }).catch((error) => {
                console.log(error)
            });
        })
    }, []);

    const showSuccessToast = () => {
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Profile updated! 🎉',
        });
    }

    const showErrorToast = (error: any) => {
        Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: error
        });
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            let base64String = result.assets[0].base64;
            console.log(base64String)

            AsyncStorage.getItem('email').then((email) => {
                sidebarService.uploadImage(base64String, email!!).then(() => {
                    showSuccessToast()
                }).catch((error) => {
                    showErrorToast(error)
                });
            });
        }
    };

    const profileModal = () => {
        return <View backgroundColor={bgColor} style={{flex: 1}}>
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
                <Avatar mb="3" mt="2" bg={bgColor} size="2xl" source={{uri: `data:image/png;base64,${base64Image}`}}>X</Avatar>
            </HStack>
            <Pressable mb={5} onPress={pickImage}>
                <HStack justifyContent="center" space="20">
                    <Text color={textColor}>Edit profile picture</Text>
                </HStack>
            </Pressable>
            <ImageBackground source={require('../../../../../../assets/sidebar-background.png')}
                             resizeMode="cover"
                             style={{justifyContent: 'center'}}>
                <Box w="100%">
                    <Divider thickness="1" bgColor={textColor}/>
                    <View mt={3} style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View ml={5} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: textColor}}>
                                Name
                            </Text>
                            <Pressable onPress={() => {
                                setEditProfileNameVisible(true)
                            }}>
                                <HStack style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 5
                                }}>
                                    <Text style={{marginRight: 5, fontSize: 16, color: textColor}}>
                                        {props.profile?.user?.firstName} {props.profile?.user?.lastName}
                                    </Text>
                                    <MaterialCommunityIcons
                                        name={'pencil'}
                                        size={14}
                                        color={textColor}
                                    />
                                </HStack>
                            </Pressable>
                        </View>
                    </View>
                    <Divider mb={3} mt={3} thickness="1" bgColor={textColor}/>
                    <View mb={3} style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View ml={5} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: textColor}}>
                                Email address
                            </Text>
                            <Text style={{marginRight: 15, fontSize: 16, color: textColor}}>
                                {props.profile?.user?.email}
                            </Text>
                        </View>
                    </View>
                </Box>
            </ImageBackground>
            <Divider thickness="1" bgColor={textColor}/>
            <View ml={5} mt={5} style={{flexDirection: 'row', alignItems: 'center'}}>
                <AppContext.Consumer>
                    {({isLoggedIn, setIsLoggedIn}) => (
                        <Pressable mr={15} onPress={() => {
                            AsyncStorage.getItem('email').then((email) => {
                                sidebarService.deleteUserByEmail(email!).then(() => {
                                    SidebarService.logout().then(() => {
                                        AsyncStorage.removeItem("token").then(() => {
                                            setIsLoggedIn(false)
                                        })
                                    });
                                })
                            })
                        }}>
                            <Text color={textColor} style={{fontSize: 16, fontWeight: 'bold'}}>
                                Delete account
                            </Text>
                        </Pressable>
                    )}
                </AppContext.Consumer>
            </View>
            <View flex={1} ml={20} mr={20} mt={200} bgColor={bgColor}>
                <GradientButtonComponent elevation={5} text={"Save"}></GradientButtonComponent>
            </View>
            <Toast/>
        </View>;
    }

    const editProfileNameModal = () => {
        return <View backgroundColor={bgColor} style={{flex: 1}}>
            <HStack mt={5} alignItems="center" space="20">
                <Button onPress={() => {
                    setEditProfileNameVisible(false)
                }} backgroundColor={"transparent"} style={{marginLeft: 5}}>
                    <ArrowBackIcon
                        color={textColor}
                        name="close"
                        size="md"/>
                </Button>
                <Heading alignItems={"center"} color={textColor} justifyContent={"center"} fontSize={18}>
                    Edit name
                </Heading>
            </HStack>
            <VStack m="5" space={5}>
                <FormControl backgroundColor={inputBackgroundColor} style={styles.textInputContainer}>
                    <TextInput style={{
                        flex: 1,
                        paddingVertical: 10,
                        paddingRight: 10,
                        fontSize: 12,
                        color: textColor
                    }} placeholder={"First name"}
                               placeholderTextColor={placeHolderTextColor}
                               onChangeText={newText => setFirstName(newText)}/>
                </FormControl>
                <FormControl backgroundColor={inputBackgroundColor} style={styles.textInputContainer}>
                    <TextInput style={{
                        flex: 1,
                        paddingVertical: 10,
                        paddingRight: 10,
                        fontSize: 12,
                        color: textColor
                    }} placeholder={"Last name"}
                               placeholderTextColor={placeHolderTextColor}
                               onChangeText={newText => setLastName(newText)}/>
                </FormControl>
                <GradientButtonComponent
                    onPress={() => {
                        AsyncStorage.getItem('email').then((email) => {
                            sidebarService.editUserName(firstName, lastName, email!!).then(() => {
                                setEditProfileNameVisible(false)
                                showSuccessToast()
                            }).catch((error) => {
                                    showErrorToast(error)
                                }
                            );
                        })
                    }}
                    text={"Save"}
                    elevation={5}>
                </GradientButtonComponent>
            </VStack>
            <Toast/>
        </View>
    }


    return <Modal isVisible={props.visible!!}>
        {editProfileNameVisible!! ? editProfileNameModal() : profileModal()}
    </Modal>;

}
