import {GetHomepageByUserEmailResp, GroupEntity} from "../../../../swagger";
import {HomeNavigationProps} from "./home-navigation.props";
import {TabPageComponent} from "./tab-page.component";
import HomeService from "./home.service";
import * as React from 'react';
import {Component} from 'react';
import {Animated, Dimensions, StatusBar, StyleSheet} from 'react-native';
import {Route, SceneMap, TabView} from 'react-native-tab-view';
import {Box, Center, Fab, Icon, Pressable, useColorModeValue} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";


type HomeComponentState = {
    homePage: GetHomepageByUserEmailResp | undefined; routes: Route[]; scenes: { [key: string]: any }; index: number; inputRange: any[];
};

class HomeComponent extends Component<HomeNavigationProps, HomeComponentState> {
    constructor(props: HomeNavigationProps) {
        super(props);

        this.state = {
            homePage: undefined, routes: [], scenes: {}, index: 1, inputRange: [],
        };
    }

    componentDidMount() {
        const {homePage} = this.state;
        if (homePage === undefined) {
            HomeService.getHomepageByUserEmail('asd@asd.com').then((response) => {
                this.setState({homePage: response.data}, this.updateRoutesAndScenes);
            });
        } else {
            this.updateRoutesAndScenes();
        }
    }

    updateRoutesAndScenes = () => {
        const {homePage, routes, scenes} = this.state;
        const newRoutes = [...routes];
        const newScenes: { [key: string]: any } = {...scenes};

        homePage?.groups?.forEach((group: GroupEntity) => {
            if (group.id !== undefined && group.name !== undefined && group.joinLink !== undefined) {
                newRoutes.push({key: group.id.toString(), title: group.name});
                newScenes[group.id] = <TabPageComponent/>;
            }
        });

        const inputRange = newRoutes.map((_, index) => index);
        this.setState({routes: newRoutes, scenes: newScenes, inputRange});
    };

    renderTabBar = (props: any) => {
        const {index, inputRange} = this.state;
        if (props.navigationState.routes === undefined) return (<></>);
        return <Box flexDirection="row">
            {props.navigationState.routes.map((route, i) => {
                const color = index === i ? useColorModeValue('#000', '#e5e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
                const borderColor = index === i ? 'cyan.500' : useColorModeValue('coolGray.200', 'gray.400');
                return <Pressable key={i}
                                  borderBottomWidth="3"
                                  borderColor={borderColor}
                                  flex={1}
                                  alignItems="center"
                                  p="3" onPress={() => {
                    this.setState({index: i});
                }}>
                    <Animated.Text style={{color}}>{route.title}</Animated.Text>
                </Pressable>
            })}
        </Box>;
    };

    render() {
        const {index, routes, scenes, inputRange} = this.state;
        const initialLayout = {
            width: Dimensions.get('window').width,
        };
        let renderScene = SceneMap(scenes);

        if (inputRange.length <= 1) {
            return (<TabPageComponent></TabPageComponent>);
        } else {
            return (
                <Box flex={1}>
                    <TabView
                        navigationState={this.state}
                        renderTabBar={this.renderTabBar}
                        renderScene={({route}) => {
                            return scenes[route.key]
                        }}
                        onIndexChange={(i: number) => this.setState({index: i})}
                        initialLayout={initialLayout}
                        style={{
                            marginTop: StatusBar.length
                        }}>
                    </TabView>
                    <Center style={styles.fab}>
                        <Fab renderInPortal={false} shadow={2} placement="bottom-left" size="sm"
                             icon={<Icon color="white" as={MaterialIcons} name="add" size="4"/>}/>
                    </Center>;
                </Box>);
        }
    }
}

export default HomeComponent;


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 70,
        right: 40,
        backgroundColor: "#26653A",
        paddingHorizontal: 20,
        paddingVertical: 10,
        padding: 10,
        borderRadius: 25,
        width: 50,
        height: 50,
    }, title: {
        fontSize: 18, color: "#fff", fontWeight: "bold",
    }, fab: {
        left: '50%', marginBottom: 10, position: 'absolute', bottom: 0, zIndex: 100,
    },
});