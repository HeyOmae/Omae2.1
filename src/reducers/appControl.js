/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	summaryFix: false
};


const attributesReducer = (state=initialState, action) => {

	const actionsToTake = {
		FIX_SUMMARY: () => {
			var newState = Object.assign(
					{},
					state,
					{
						summaryFix: true
					}
				)
			return newState;
		},
		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = attributesReducer;
