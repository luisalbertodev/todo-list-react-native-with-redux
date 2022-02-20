import { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { connect } from "react-redux";
import ListItem from "./components/ListItem";
import Input from "./components/Input";
import { completed, addTask } from "./reducers";

const App = ({ todos, completed, addTask }) => {
	const [task, setTask] = useState("");

	const handleOnInputChange = (text) => {
		setTask(text);
	};

	const handleOnAddTask = (task) => {
		addTask(task);
		setTask("");
	};

	return (
		<View style={styles.container}>
			<Input
				onAddTask={() => handleOnAddTask(task)}
				onChange={handleOnInputChange}
				value={task}
			/>
			<FlatList
				style={styles.list}
				data={todos}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => {
					return (
						<ListItem
							onPress={() => completed(item.id)}
							description={item.text}
							isCompleted={item.completed}
						/>
					);
				}}
			/>
		</View>
	);
};

const mapStateToProps = (state) => {
	return {
		todos: state.todos,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		completed: (id) => dispatch(completed(id)),
		addTask: (task) => dispatch(addTask(task)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
	container: {
		marginTop: 35,
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	list: {
		alignSelf: "stretch",
	},
});
