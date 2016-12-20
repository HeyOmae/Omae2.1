/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	typeName: 'human',
	priority: 'A'
};

const metatypeReducer = (state = initialState, action) => {
	const actionsToTake = {
		SELECT_METATYPE: (prevState, newState) => {
			return newState;
		},

		DEFAULT: (prevState) => { return prevState; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = metatypeReducer;
