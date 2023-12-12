import { StyleSheet, View } from "react-native";

const RowComponent = ({ children }) => {
    return <View style={styles.textInputContainer}>{children}</View>;
};

// create styles of RowComponent
const styles = StyleSheet.create({
    textInputContainer: {
        flexDirection: "row",
    },
});

export default RowComponent;
