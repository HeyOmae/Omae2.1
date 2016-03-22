/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	summaryFix: false
};


const attributesReducer = (state=initialState, action) => {
	if(action.parameter) {
		var {summaryFix} = action.parameter;
	}

	const actionsToTake = {
		FIX_SUMMARY: () => {
			if(summaryFix !== state.summaryFix){
				var newState = Object.assign(
						{},
						state,
						{
							summaryFix: summaryFix
						}
					);
				return newState;
			} else {
				return state;
			}
			
		},
		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = attributesReducer;
