/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	summaryFix: false,
	styleTheme: ''
};


const attributesReducer = (state = initialState, action) => {
	const actionsToTake = {
		FIX_SUMMARY(pervState, {summaryFix}) {
			if (summaryFix !== pervState.summaryFix) {
				return Object.assign(
						{},
						pervState,
						{ summaryFix }
					);
			}
			return pervState;
		},

		STYLE(pervState, {styleTheme}) {
			return Object.assign(
				{},
				pervState,
				{ styleTheme }
			);
		},

		DEFAULT() { return state; }
	};

	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = attributesReducer;
