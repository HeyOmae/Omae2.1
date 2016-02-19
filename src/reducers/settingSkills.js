/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	active: {},
	knowledge: {},
	skillPointsSpent: 0,
	GroupPointSpent: 0
};

const attributesReducer = (state=initialState, action) => {
	if(action.parameter) {
		var {name, category, max} = action.parameter;
	}

	const actionsToTake = {
		INCREMENT_SKILL: () => {
			var newState,
				nextIncrement = state[category][name] + 1;
			if (nextIncrement > max) {
				return state;
			} else {
				newState = Object.assign(
					{},
					state,
					{
						[category]: Object.assign({}, state[category], {[name]: nextIncrement}), // this is ugly, think about making it less ugly
						skillPointsSpent: state.skillPointsSpent + 1
					}
				)
			}
			return newState;
		},
		DECREMENT_SKILL: () => {
			var newState,
				nextDecrement = state[category][name] - 1;
			if(nextDecrement < 0) {
				return state;
			} else {
				newState = Object.assign(
					{},
					state,
					{
						[category]: Object.assign({}, state[category], {[name]: nextDecrement}),
						skillPointsSpent: state.skillPointsSpent - 1
					}
				)
			}
			return newState;
		},
		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = attributesReducer;
