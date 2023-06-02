import {
    Avatar,
    Box, Button,
    ChevronLeftIcon,
    ChevronRightIcon, DeleteIcon,
    Divider,
    HStack,
    Input,
    Pressable,
    Text,
    VStack
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {Component} from "react";
import {AppContext} from "../../../../App";
import SidebarService from "./sidebar.service";
import {GetProfileByUserEmailResp} from "../../../../swagger";
import sidebarService from "./sidebar.service";
import {DrawerContentComponentProps} from "@react-navigation/drawer";
import {SidebarNavigation} from "./sidebar-navigation.props";

type SidebarContentComponentState = {
    profile: GetProfileByUserEmailResp | undefined; mode: string; newGroupName: string; joinLink: string;
};

type SidebarContentComponentProps = DrawerContentComponentProps & {
    navigation: SidebarNavigation;
}

class SidebarContentComponent extends Component<SidebarContentComponentProps, SidebarContentComponentState> {
    constructor(props: SidebarContentComponentProps) {
        super(props);
        this.state = {
            profile: {}, mode: 'default', newGroupName: '', joinLink: ''
        };
    }

    componentDidMount() {
        SidebarService.getProfileByUserEmail('asd@asd.hu').then((response) => {
            this.setState({profile: response.data});
        });
    }

    defaultScreen() {
        return <VStack space="2" w="100%">
            <Pressable
                px="4"
                pb="5"
                pt="1"
                flexDir="row"
                justifyContent="space-between"
                onPress={() => this.setState({mode: 'joinGroup'})}
            >
                <Text color="warmGray.100" fontSize="md">Join a group</Text>
                <ChevronRightIcon size="sm" color="white"/>
            </Pressable>
            <Pressable
                px="4"
                pb="5"
                pt="1"
                flexDir="row"
                justifyContent="space-between"
                onPress={() => this.setState({mode: 'myGroups'})}
            >
                <Text color="warmGray.100" fontSize="md">My Groups</Text>
                <ChevronRightIcon size="sm" color="white"/>
            </Pressable>
            <Pressable
                px="4"
                pb="5"
                pt="1"
                flexDir="row"
                justifyContent="space-between"
                onPress={() => this.setState({mode: 'createGroup'})}
            >
                <Text color="warmGray.100" fontSize="md">Create a new group</Text>
                <ChevronRightIcon size="sm" color="white"/>
            </Pressable>
            <AppContext.Consumer>
                {({isLoggedIn, setIsLoggedIn}) => (
                    <Pressable
                        px="4"
                        pb="5"
                        pt="1"
                        flexDir="row"
                        justifyContent="space-between"
                        onPress={() => {
                            setIsLoggedIn(false);
                            AsyncStorage.removeItem('token').then(r => console.log(r))
                        }}
                    >
                        <Text color="warmGray.100" fontSize="md">Logout</Text>
                        <ChevronRightIcon size="sm" color="white"/>
                    </Pressable>
                )}
            </AppContext.Consumer>
        </VStack>
    }

    myGroupsScreen() {
        return <VStack space="2" w="100%">
            {this.state.profile?.user?.groupEntities?.map((group) => {
                return <Pressable
                    px="4"
                    pb="5"
                    pt="1"
                    flexDir="row"
                    justifyContent="space-between"
                    key={group.id}
                    onPress={() => {
                        AsyncStorage.getItem('email').then(r => {
                            sidebarService.leaveGroup(group.id, r).then(r => {
                                this.setState({mode: 'default'});
                            });
                        });
                    }}>
                    <Text color="warmGray.100" fontSize="md">{group.name}</Text>
                    <DeleteIcon size="sm" color="white"/>
                </Pressable>;
            })}
            <Pressable
                px="4"
                pb="5"
                pt="1"
                flexDir="row"
                justifyContent="space-between"
                onPress={() => { this.setState({mode: 'default'})}}
            >
                <Text color="warmGray.100" fontSize="md">Back</Text>
                <ChevronLeftIcon size="sm" color="white"/>
            </Pressable>
        </VStack>
    }

    createGroupScreen() {
        return <VStack space="2" w="100%">
            <VStack space="2" w="75%">
                <Text px="4" pt="1" color="warmGray.100" fontSize="md">Group Name:</Text>
                <Input ml="4" flexDir="row" onChangeText={newText => this.setState({newGroupName: newText})} style={{ color: "#fff" }}/>
                <Button ml="4" mt="2" colorScheme="indigo" w="50%" isDisabled={this.state.newGroupName === ''}
                        onPress={() => {
                            AsyncStorage.getItem('email').then(r => {
                                sidebarService.createGroup(this.state.newGroupName, r).then(r => {
                                    this.setState({mode: 'default'});
                               });
                            });
                        }}>
                    Create
                </Button>
            </VStack>
            <Pressable
                px="4"
                pb="5"
                pt="1"
                flexDir="row"
                justifyContent="space-between"
                onPress={() => { this.setState({mode: 'default'})}}
            >
                <Text color="warmGray.100" fontSize="md">Back</Text>
                <ChevronLeftIcon size="sm" color="white"/>
            </Pressable>
        </VStack>
    }

    joinGroupScreen() {
        return <VStack space="2" w="100%">
            <VStack space="2" w="75%">
                <Text px="4" pt="1" color="warmGray.100" fontSize="md">Join link:</Text>
                <Input ml="4" flexDir="row" onChangeText={newText => this.setState({joinLink: newText})} style={{ color: "#fff" }}/>
                <Button ml="4" mt="2" colorScheme="indigo" w="50%" isDisabled={this.state.joinLink === ''}
                        onPress={() => {
                            AsyncStorage.getItem('email').then(r => {
                                sidebarService.joinGroup(this.state.joinLink, r).then(r => {
                                    this.setState({mode: 'default'});
                                    this.props.navigation.navigate('Home');
                                });
                            });
                        }}>
                    Create
                </Button>
            </VStack>
            <Pressable
                px="4"
                pb="5"
                pt="1"
                flexDir="row"
                justifyContent="space-between"
                onPress={() => { this.setState({mode: 'default'})}}
            >
                <Text color="warmGray.100" fontSize="md">Back</Text>
                <ChevronLeftIcon size="sm" color="white"/>
            </Pressable>
        </VStack>
    }

    returnCorrectScreen() {
        if(this.state.mode === 'default') {
            return this.defaultScreen()
        } else if(this.state.mode === 'myGroups') {
            return this.myGroupsScreen()
        } else if(this.state.mode === 'createGroup') {
            return this.createGroupScreen()
        } else if(this.state.mode === 'joinGroup') {
            return this.joinGroupScreen()
        }
    }

    render() {
        const {profile} = this.state;
        return <Box bg="black" mt="0">
            <VStack
                bg="black"
                space="4"
                pt="16"
                divider={<Divider thickness="0.4"/>}>
                <HStack alignItems="center" space="3" px="4">
                    <Avatar bg="gray.300">GG</Avatar>
                    <VStack>
                        <Text fontSize="md" fontWeight="bold" color="white">
                            {profile?.user?.firstName} {profile?.user?.lastName}
                        </Text>
                        <HStack alignItems="stretch" space="12" divider={<Divider thickness="0.3"/>}>
                            <Text fontSize="xs" color="trueGray.400">
                                {profile?.user?.email}
                            </Text>
                        </HStack>
                    </VStack>
                </HStack>
            </VStack>
            <Divider m="4" thickness="0.4"/>
            {this.returnCorrectScreen()}
        </Box>
    }
}

export default SidebarContentComponent;