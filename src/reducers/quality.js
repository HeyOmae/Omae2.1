/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

const initialState = {
	Positive: [],
	Negative: [],
	display: ''
};

const qualityReducer = (state=initialState, action) => {
	const actionsToTake = {
		EXPAND_LIST: () => {
			let {rating, category} = action.parameter;
			return Object.assign({}, state, {[category]: rating});
		},
		SELECT_QUALITY: () => {},
		REMOVE_QUALITY: () => {},
		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = qualityReducer;
