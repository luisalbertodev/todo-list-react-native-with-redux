import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = ({ onChange, value, onAddTask }) => {
	return (
		<TextInput
			onSubmitEditing={onAddTask}
			onChangeText={onChange}
			value={value}
			style={styles.input}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		backgroundColor: "#eee",
		height: 34,
		alignSelf: "stretch",
		padding: 8,
	},
});

export default Input;
