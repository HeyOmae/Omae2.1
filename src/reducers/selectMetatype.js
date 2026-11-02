/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	typeName: 'human',
	priority: 'A',
};

const metatypeReducer = (state = initialState, action) => {
	const actionsToTake = {
		SELECT_METATYPE: (prevState, {typeName, priority}) => ({typeName, priority}),

		DEFAULT: (prevState) => prevState,
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

export default metatypeReducer;
