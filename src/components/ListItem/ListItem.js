import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default ({ description, onPress, isCompleted }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<Text
				style={isCompleted ? [styles.text, styles.strike] : styles.text}
			>
				{description}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
		height: 60,
		justifyContent: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	text: {
		fontSize: 18,
	},
	strike: {
		textDecorationLine: "line-through",
		textDecorationStyle: "solid",
	},
});
