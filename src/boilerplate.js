const makeType = (mod) => (type) => `${mod}/${type}`;

// makeActionCreator
const makeActionCreator =
	(type, ...argNames) =>
	(...args) => {
		const action = { type };
		argNames.forEach((_, index) => {
			action[argNames[index]] = args[index];
		});

		return action;
	};

// createReducer
const createReducer =
	(IS, handlers) =>
	(state = IS, action) => {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action);
		}

		return state;
	};

const fetchReducerCreator = (resource) => {
	const t = makeType(resource);
	const FETCH_START = t("FETCH_START");
	const FETCH_SUCCESS = t("FETCH_SUCCESS");
	const FETCH_ERROR = t("FETCH_ERROR");

	const initialState = {
		data: [],
		fetched: false,
		fetching: false,
	};

	const fetchStartReducer = (state) => ({
		...state,
		fetching: true,
	});

	const fetchSuccessReducer = (state, action) => ({
		...state,
		data: action.payload,
		fetching: false,
		fetched: true,
	});

	const fetchErrorReducer = (state, action) => ({
		...state,
		fetching: false,
		error: action.error,
	});

	const reducer = createReducer(initialState, {
		[FETCH_START]: fetchStartReducer,
		[FETCH_SUCCESS]: fetchSuccessReducer,
		[FETCH_ERROR]: fetchErrorReducer,
	});

	const startFetch = makeActionCreator(FETCH_START);
	const successFetch = makeActionCreator(FETCH_SUCCESS, "payload");
	const errorFetch = makeActionCreator(FETCH_ERROR, "error");

	return {
		reducer,
		fetch: () => {
			return async (dispatch) => {
				dispatch(startFetch());

				try {
					const response = await fetch("/${resource}");

					const data = await response.json();

					dispatch(successFetch(data));
				} catch (error) {
					dispatch(errorFetch(error));
				}
			};
		},
	};
};

const createReducer = fetchReducerCreator("todos");

export default createReducer.reducer;
export const fetch = createReducer.fetch;
