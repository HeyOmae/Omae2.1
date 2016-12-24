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

const attributesReducer = (state = initialState, action) => {

	const actionsToTake = {
		INCREMENT_ATTRIBUTE: (prevState, {attribute, max, spend, maxCap}) => {
			const nextIncrement = prevState[attribute] + 1;
			if (nextIncrement > (maxCap ? max - 1 : max)) {
				return prevState;
			}

			const newState = Object.assign(
				{},
				prevState,
				{
					[attribute]: nextIncrement,
					[spend]: prevState[spend] + 1
				}
			);
			return newState;
		},

		DECREMENT_ATTRIBUTE: (prevState, {attribute, spend}) => {
			const nextDecrement = prevState[attribute] - 1;
			if (nextDecrement < 0) {
				return prevState;
			}
			const newState = Object.assign(
				{},
				prevState,
				{
					[attribute]: nextDecrement,
					[spend]: prevState[spend] - 1
				}
			);
			return newState;
		},

		INCREMENT_AUGMENTED: (prevState, {attribute}) => {
			const augmentedAttribute = prevState.augmented[attribute];
			let nextIncrement;

			if (augmentedAttribute) {
				nextIncrement = augmentedAttribute + 1;
			} else {
				nextIncrement = 1;
			}

			if (nextIncrement <= 4) {
				const newState = Object.assign(
					{},
					prevState,
					{
						augmented: Object.assign(
							{},
							prevState.augmented,
							{
								[attribute]: nextIncrement
							}
						)
					}
				);

				return newState;
			}

			return prevState;
		},

		DECREMENT_AUGMENTED: (prevState, {attribute, decreaseBy = 1}) => {
			const augmentedAttribute = prevState.augmented[attribute];
			let nextDecrement,
				newState;

			if (augmentedAttribute) {
				nextDecrement = augmentedAttribute - decreaseBy;
			} else {
				return prevState;
			}

			if (nextDecrement > 0) {
				newState = Object.assign(
					{},
					prevState,
					{
						augmented: Object.assign(
							{},
							prevState.augmented,
							{
								[attribute]: nextDecrement
							}
						)
					}
				);
			} else {
				newState = Object.assign(
					{},
					prevState,
					{
						augmented: Object.assign(
							{},
							prevState.augmented
						)
					}
				);

				delete newState.augmented[attribute];
			}

			return newState;
		},

		DEFAULT: (prevState) => { return prevState; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = attributesReducer;
