import { StyleSheet, View } from "react-native";

const RowComponent = ({ children }) => {
    return <View style={styles.container}>{children}</View>;
};

// create styles of RowComponent
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
});

export default RowComponent;