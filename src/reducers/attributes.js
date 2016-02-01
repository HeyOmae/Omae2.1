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
	cha: 0
};

const attributesReducer = (state=initialState, action) => {
	if(action.parameter) {
		var {attribute, max, maxCap} = action.parameter;
		if(maxCap) {
			--max;
		}
	}

	const actionsToTake = {
		INCREMENT_ATTRIBUTE: () => {
			var newState;
			if (state[attribute] + 1 > max) {
				return state;
			} else {
				newState = Object.assign({}, state, {[attribute]: state[attribute] + 1})
			}
			return newState;
		},
		DECREMENT_ATTRIBUTE: () => {
			var newState;
			if(state[attribute] - 1 < 0) {
				return state;
			} else {
				newState = Object.assign({}, state, {[attribute]: state[attribute] - 1})
			}
			return newState;
		},
		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = attributesReducer;
