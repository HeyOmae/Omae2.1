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
	spent: 0
};

var maxCap = false;

const attributesReducer = (state=initialState, action) => {
	if(action.parameter) {
		var {attribute, max} = action.parameter;
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
						spent: state.spent + 1
					}
				)
				if(nextIncrement === max) {
					maxCap = true;
				}
			}
			return newState;
		},
		DECREMENT_ATTRIBUTE: () => {
			var newState,
				nextDecrement = state[attribute] - 1;
			if(nextDecrement < 0) {
				return state;
			} else {
				if(state[attribute] === max + 1) {
					maxCap = false;
				}
				newState = Object.assign(
					{},
					state,
					{
						[attribute]: nextDecrement,
						spent:  state.spent - 1
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
