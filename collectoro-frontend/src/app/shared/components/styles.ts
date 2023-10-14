import {StyleSheet} from "react-native";

export const styles= StyleSheet.create({
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    textInput: {
        flex: 1,
        paddingVertical: 10,
        paddingRight: 10,
        fontSize: 12,
    },
    passwordIcon: {
        marginLeft: 10,
    },
    sideBarPressable: {
        paddingBottom: 5,
        marginStart: 15,
        paddingTop: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});
