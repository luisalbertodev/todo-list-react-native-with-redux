import { Provider } from "react-redux";
import MyApp from "./src";
import store from "./src/store";

export default () => {
	return (
		<Provider store={store}>
			<MyApp />
		</Provider>
	);
};
