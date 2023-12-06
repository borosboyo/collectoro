import {AddIcon, ChevronRightIcon, HamburgerIcon, Pressable, Text, useColorModeValue} from "native-base";
import React from "react";
import {styles} from "../../../../shared/components/styles";

export default function SideBarButtonsSection(props: {
    onPress: () => void,
    onPress1: () => void,
    onPress2: () => void
}) {
    const textColor = useColorModeValue("white", "black");
    const bgColor = useColorModeValue("black", "coolGray.100");
    const subtitleColor = useColorModeValue("trueGray.800", "trueGray.200");
    return <>
        <Pressable style={styles.sideBarPressable}
                   onPress={props.onPress}
        >
            <HamburgerIcon style={{marginEnd: 10}} size="sm" color={textColor}/>
            <Text color={textColor} fontSize="md">My Groups</Text>
        </Pressable>
        <Pressable style={styles.sideBarPressable}
                   onPress={props.onPress1}
        >
            <AddIcon style={{marginEnd: 10}} size="sm" color={textColor}/>
            <Text color={textColor} fontSize="md">Create a new group</Text>
        </Pressable>
        <Pressable style={styles.sideBarPressable}
                   onPress={props.onPress2}
        >
            <ChevronRightIcon style={{marginEnd: 10}} size="sm" color={textColor}/>
            <Text color={textColor} fontSize="md">Join a group</Text>
        </Pressable>
    </>;
}
