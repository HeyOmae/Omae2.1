/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	bod: 0,
	agi: 0,
	rea: 0,
	str: 0,
	wil: 0,
	log: 0,
	int: 0,
	cha: 0,
	edg: 0,
	ess: 6,
	special: 0,
	baseSpent: 0,
	specialSpent: 0
};

const attributesReducer = (state=initialState, action) => {
	if(action.parameter) {
		var {attribute, max, spend, maxCap} = action.parameter;
		if(maxCap) {
			--max;
		}
	}

	const actionsToTake = {
		INCREMENT_ATTRIBUTE: () => {
			var newState,
				nextIncrement = state[attribute] + 1;
			if (nextIncrement > max) {
				return state;
			} else {
				newState = Object.assign(
					{},
					state,
					{
						[attribute]: nextIncrement,
						[spend]: state[spend] + 1
					}
				);
			}
			return newState;
		},
		DECREMENT_ATTRIBUTE: () => {
			var newState,
				nextDecrement = state[attribute] - 1;
			if(nextDecrement < 0) {
				return state;
			} else {
				newState = Object.assign(
					{},
					state,
					{
						[attribute]: nextDecrement,
						[spend]: state[spend] - 1
					}
				);
			}
			return newState;
		},
		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = attributesReducer;
