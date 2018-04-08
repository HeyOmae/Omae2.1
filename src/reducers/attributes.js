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
	ess: 0,
	augmented: {},
	special: 0,
	baseSpent: 0,
	specialSpent: 0,
	conditionBonus: {},
};

const attributesReducer = (state = initialState, action) => {
	const {type, parameter} = action;
	switch (type) {
	case 'INCREMENT_ATTRIBUTE': {
		const {attribute, max, spend, maxCap} = parameter;
		const nextIncrement = state[attribute] + 1;
		if (nextIncrement > (maxCap ? max - 1 : max)) {
			return state;
		}

		const newState = Object.assign(
			{},
			state,
			{
				[attribute]: nextIncrement,
				[spend]: state[spend] + 1,
			},
		);
		return newState;
	}
	case 'DECREMENT_ATTRIBUTE': {
		const {attribute, spend} = parameter;
		const nextDecrement = state[attribute] - 1;
		if (nextDecrement < 0) {
			return state;
		}
		const newState = Object.assign(
			{},
			state,
			{
				[attribute]: nextDecrement,
				[spend]: state[spend] - 1,
			},
		);
		return newState;
	}
	case 'INCREMENT_AUGMENTED': {
		const {attribute} = parameter;
		const augmentedAttribute = state.augmented[attribute];
		let nextIncrement;

		if (augmentedAttribute) {
			nextIncrement = augmentedAttribute + 1;
		} else {
			nextIncrement = 1;
		}

		if (nextIncrement <= 4) {
			const newState = Object.assign(
				{},
				state,
				{
					augmented: Object.assign(
						{},
						state.augmented,
						{
							[attribute]: nextIncrement,
						},
					),
				},
			);

			return newState;
		}
		return state;
	}
	case 'DECREMENT_AUGMENTED': {
		const {attribute, decreaseBy = 1} = parameter;
		const augmentedAttribute = state.augmented[attribute];
		let nextDecrement,
			newState;

		if (augmentedAttribute) {
			nextDecrement = augmentedAttribute - decreaseBy;
		} else {
			return state;
		}

		if (nextDecrement > 0) {
			newState = Object.assign(
				{},
				state,
				{
					augmented: Object.assign(
						{},
						state.augmented,
						{
							[attribute]: nextDecrement,
						},
					),
				},
			);
		} else {
			newState = Object.assign(
				{},
				state,
				{
					augmented: Object.assign(
						{},
						state.augmented,
					),
				},
			);

			delete newState.augmented[attribute];
		}
		return newState;
	}
	case 'PURCHASE': {
		const {gear} = parameter;
		if (gear.ess) {
			return {
				...state,
				ess: state.ess + gear.ess,
			};
		}

		return state;
	}
	case 'SELL': {
		const {gear} = parameter;
		if (gear && gear.ess) {
			return {
				...state,
				ess: state.ess - gear.ess,
			};
		}

		return state;
	}
	default:
		return state;
	}
};

module.exports = attributesReducer;
