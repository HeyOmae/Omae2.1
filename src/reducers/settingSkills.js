/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	active: {},
	knowledge: {},
	skillPointsSpent: 0,
	GroupPointSpent: 0,
	showSkill: ''
};

const attributesReducer = (state=initialState, action) => {
	if(action.parameter) {
		var {name, category, max, skillToShow} = action.parameter;
	}

	const actionsToTake = {
		INCREMENT_SKILL: () => {
			var newState;
			if(state[category][name]){
				let nextIncrement = state[category][name].rating + 1;
				if (nextIncrement > max) {
					return state;
				} else {
					newState = Object.assign(
						{},
						state,
						{
							[category]: Object.assign({}, state[category], {[name]: {rating: nextIncrement}}), // this is ugly, think about making it less ugly
							skillPointsSpent: state.skillPointsSpent + 1
						}
					)
				}
			} else {
				newState = Object.assign(
					{},
					state,
					{
						[category]: Object.assign(
							{},
							state[category],
							{[name]: {rating: 1}}
						),
						skillPointsSpent: state.skillPointsSpent + 1
					}
				)
			}

			return newState;
		},

		DECREMENT_SKILL: () => {
			var newState;
			if(!state[category][name]) {
				return state;
			} else if(state[category][name].rating === 1) {
				newState = Object.assign(
					{},
					state,
					{
						skillPointsSpent: state.skillPointsSpent - 1
					}
				);

				delete newState[category][name];
			} else if(state[category][name].rating > 1) {
				let nextDecrement = state[category][name].rating - 1;
				newState = Object.assign(
					{},
					state,
					{
						[category]: Object.assign(
							{},
							state[category],
							{[name]: {rating: nextDecrement}}
						),
						skillPointsSpent: state.skillPointsSpent - 1
					}
				)
			} else {
				return state;
			}
			return newState;
		},

		SHOW_SKILL: () => {
			skillToShow = state.showSkill === skillToShow ? '' : skillToShow;
			let newState = Object.assign(
				{},
				state,
				{
					showSkill: skillToShow
				}
			);
			return newState;
		},

		DEFAULT: () => { return state; }
	};

	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = attributesReducer;
