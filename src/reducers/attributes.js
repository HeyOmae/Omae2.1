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
	augmented: {},
	special: 0,
	baseSpent: 0,
	specialSpent: 0
};

const attributesReducer = (state=initialState, action) => {

	const actionsToTake = {
		INCREMENT_ATTRIBUTE: () => {
			var {attribute, max, spend, maxCap} = action.parameter;
			if(maxCap) {
				--max;
			}

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
			var {attribute, spend} = action.parameter,
				newState,
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

		INCREMENT_AUGMENTED: () => {
			let {attribute} = action.parameter,
				newState,
				augmentedAttribute = state.augmented[attribute],
				nextIncrement;

			if(augmentedAttribute){
				nextIncrement = augmentedAttribute + 1;
			} else {
				nextIncrement = 1;
			}

			if(nextIncrement <= 4) {
				newState = Object.assign(
					{},
					state,
					{
						augmented: Object.assign(
							{},
							state.augmented,
							{
								[attribute]: nextIncrement
							}
						)
					}
				);

				return newState;
			} else {
				return state;
			}
		},

		DECREMENT_AUGMENTED: () => {
			let {attribute} = action.parameter,
				newState,
				augmentedAttribute = state.augmented[attribute],
				nextDecrement;

			if(augmentedAttribute) {
				nextDecrement = augmentedAttribute - 1;
			} else {
				return state;
			}

			if(nextDecrement > 1) {
				newState = Object.assign(
					{},
					state,
					{
						augmented: Object.assign(
							{},
							state.augmented,
							{
								[attribute]: nextDecrement
							}
						)
					}
				);
			} else {
				newState = Object.assign(
					{},
					state,
					{
						augmented: Object.assign(
							{},
							state.augmented
						)
					}
				);

				delete newState.augmented[attribute];
			}

			return newState;
		},

		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = attributesReducer;
