import React, {useEffect, useState} from "react";
import {HomeNavigationProps} from "./home-navigation.props";
import {StyleSheet} from 'react-native';
import {TabViewsComponent} from "./tab-views.component";
import HomeService from "./home.service";
import {GetHomepageByUserEmailResp} from "../../../../swagger";
import {TabPageComponent} from "./tab-page.component";
import {Box} from "native-base";

export default function HomeComponent({navigation}: HomeNavigationProps) {
    const [homePage, setHomePage] = useState<GetHomepageByUserEmailResp | undefined>(undefined)
    let scenes: {[key: string]: any} = {
        dummy: TabPageComponent
    }
    const [routes] = useState(
        [
            {key: 0, title: 'dummy'},
        ]
    );

    useEffect(() => {
        if(homePage == undefined) {
            HomeService.getHomepageByUserEmail('borosgergo11@gmail.com').then((response) => {
                setHomePage(response.data);
            })
        } else {
            homePage.groups?.map((group) => {
                if(group.id !== undefined) {
                    if(group.joinLink !== undefined) {
                        routes.push({key: group.id, title: group.id.toString()})
                        scenes[group.id] = TabPageComponent;
                        routes.push({key: group.joinLink.length, title: group.joinLink})
                        scenes[group.joinLink] = TabPageComponent;
                    }
                }
            })
        }
    }, [homePage])

    return (<Box>
        <TabViewsComponent key={homePage?.groups?.length} homePage={homePage} routeArray={routes} scenes={scenes} />
    </Box>);
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
    fab: {
        left: '50%',
        marginBottom: 10,
    },
});