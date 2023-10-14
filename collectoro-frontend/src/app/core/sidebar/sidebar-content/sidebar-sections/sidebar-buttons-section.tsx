import {AddIcon, ChevronRightIcon, HamburgerIcon, Pressable, Text} from "native-base";
import React from "react";
import {styles} from "../../../../shared/components/styles";

export default function SideBarButtonsSection(props: { onPress: () => void, onPress1: () => void, onPress2: () => void }) {
    return <>
        <Pressable style={styles.sideBarPressable}
                   onPress={props.onPress}
        >
            <HamburgerIcon style={{marginEnd: 10}} size="sm" color="white"/>
            <Text color="warmGray.100" fontSize="md">My Groups</Text>
        </Pressable>
        <Pressable style={styles.sideBarPressable}
                   onPress={props.onPress1}
        >
            <AddIcon style={{marginEnd: 10}} size="sm" color="white"/>
            <Text color="warmGray.100" fontSize="md">Create a new group</Text>
        </Pressable>
        <Pressable style={styles.sideBarPressable}
                   onPress={props.onPress2}
        >
            <ChevronRightIcon style={{marginEnd: 10}} size="sm" color="white"/>
            <Text color="warmGray.100" fontSize="md">Join a group</Text>
        </Pressable>
    </>;
}
