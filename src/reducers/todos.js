const waitFor = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const initialState = [
	{ id: 1, text: "Learn React", completed: false },
	{ id: 2, text: "Learn Redux", completed: false },
];

const COMPLETED = "COMPLETED";
const ADD_TASK = "ADD_TASK";
const START_TASK = "START_TASK";
const ERROR_TASK = "ERROR_TASK";

export const completed = (id) => ({
	type: COMPLETED,
	payload: id,
});

export const addTask = (task) => ({
	type: ADD_TASK,
	payload: task,
});

export const startTask = () => ({
	type: START_TASK,
});

export const errorTask = () => ({
	type: ERROR_TASK,
});

export default (state = initialState, action) => {
	switch (action.type) {
		case COMPLETED:
			return state.map((x) => {
				if (x.id === action.payload) {
					return { ...x, completed: !x.completed };
				}

				return x;
			});
			break;
		case ADD_TASK:
			return [
				{
					id: state.length + 1,
					text: action.payload,
					completed: false,
				},
				...state,
			];
			break;
		default:
			return state;
			break;
	}
};

export const saveTodo = (text) => async (dispatch, getState) => {
	dispatch(startTask());
	try {
		const newTodo = {
			text,
			completed: false,
		};

		const response = await fetch(
			"https://jsonplaceholder.typicode.com/todos",
			{
				method: "POST",
				body: JSON.stringify(newTodo),
			}
		);

		const id = await response.json();

		dispatch(addTask({ ...newTodo, ...id }));
	} catch (error) {
		dispatch(errorTask());
	}
};
