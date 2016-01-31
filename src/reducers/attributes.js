/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	bod: 1,
	agi: 1,
	rea: 1,
	str: 1,
	wil: 1,
	log: 1,
	int: 1,
	cha: 1
};

const attributesReducer = (state=initialState, action) => {
	if(action.parameter) {
		var {attribute, min, max} = action.parameter;
	}

	const actionsToTake = {
		INCREMENT_ATTRIBUTE: () => {
			var newState;
			if(state[attribute] < min) {
				newState = Object.assign({}, state, {[attribute]: min})
			} else if (state[attribute] + 1 > max) {
				return state;
			} else {
				newState = Object.assign({}, state, {[attribute]: state[attribute] + 1})
			}
			return newState;
		},
		DECREMENT_ATTRIBUTE: () => {
			var newState;
			if(state[attribute] - 1 < min) {
				return state;
			} else if (state[attribute] > max) {
				newState = Object.assign({}, state, {[attribute]: max})
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
