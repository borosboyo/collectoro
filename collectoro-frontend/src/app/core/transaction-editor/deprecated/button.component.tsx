import { Dimensions, StyleSheet, Text, TouchableOpacity, Platform } from "react-native";

export default ({ onPress, text, size, theme }) => {
    const buttonStyles = [styles.button];
    const textStyles = [styles.text];

    if (size === "double") {
        buttonStyles.push(styles.buttonDouble);
    }

    if (theme === "secondary") {
        buttonStyles.push(styles.buttonSecondary);
        textStyles.push(styles.textSecondary);
    } else if (theme === "accent") {
        buttonStyles.push(styles.buttonAccent);
    }

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyles}>
            <Text style={textStyles}>{text}</Text>
        </TouchableOpacity>
    );
};

// set dimension
const screen = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const buttonWidth = isWeb ? screen.width / 12 : screen.width / 10;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#333333",
        flex: isWeb ? 0.9 : 1,
        height: Math.floor(buttonWidth - 50),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: Math.floor(buttonWidth - 0),
        margin: 5,
    },
    text: {
        color: "#fff",
        fontSize: isWeb ? 24 : 36,
    },
    textSecondary: {
        color: "#060606",
    },
    buttonDouble: {
        width: isWeb ? screen.width / 12 : screen.width / 10,
        flex: isWeb ? 1.8 : 1,
        alignItems: "flex-start",
        paddingLeft: isWeb ? 30 : 40,
    },
    buttonSecondary: {
        backgroundColor: "#a6a6a6",
    },
    buttonAccent: {
        backgroundColor: "#ffc107",
    },
});
