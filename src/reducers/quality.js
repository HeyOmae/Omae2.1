/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

const initialState = {
	positive: [],
	negative: []
};

const qualityReducer = (state=initialState, action) => {
	const actionsToTake = {
		EXPAND_LIST: () => {
			let {rating, category} = action.parameter;
			return Object.assign({}, state, {[category]: rating});
		},
		FILTER_LIST_NAME: () => {},
		FILTER_LIST_KARMA: () => {},
		SELECT_QUALITY: () => {},
		REMOVE_QUALITY: () => {},
		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = qualityReducer;
