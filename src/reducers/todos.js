const initialState = [
	{ id: 1, text: "Learn React", completed: false },
	{ id: 2, text: "Learn Redux", completed: false },
];

const COMPLETED = "COMPLETED";
const ADD_TASK = "ADD_TASK";

export const completed = (id) => ({
	type: COMPLETED,
	payload: id,
});

export const addTask = (task) => ({
	type: ADD_TASK,
	payload: task,
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
