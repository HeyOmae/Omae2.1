/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	active: {},
	knowledge: {},
	skillPointsSpent: 0,
	groupPointSpent: 0,
	showSkill: ''
};

const skillReducer = (state=initialState, action) => {
	if(action.parameter) {
		var {name, category, max, skillToShow, attribute} = action.parameter;
	}

	const actionsToTake = {
		INCREMENT_SKILL: () => {
			var newState,
				skill = state[category][name];
			if(skill){
				let nextIncrement = skill.rating + 1;
				if (nextIncrement > max - (skill.min || 0)) {
					return state;
				} else {
					newState = Object.assign(
						{},
						state,
						{
							[category]: Object.assign(
								{}, state[category],
								{
									[name]: {
										rating: nextIncrement,
										attribute: attribute
									}
								}),
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
							{[name]: {
								rating: 1,
								attribute: attribute
							}}
						),
						skillPointsSpent: state.skillPointsSpent + 1
					}
				)
			}

			return newState;
		},

		DECREMENT_SKILL: () => {
			var newState,
				skill = state[category][name];
			if(!state[category][name]) {
				return state;
			} else if(skill.rating === 1 && !skill.min) {
				newState = Object.assign(
					{},
					state,
					{
						[category] : Object.assign(
							{},
							state[category]
						),
						skillPointsSpent: state.skillPointsSpent - 1
					}
				);

				delete newState[category][name];
			} else if(skill.rating > 0) {
				let nextDecrement = skill.rating - 1;
				newState = Object.assign(
					{},
					state,
					{
						[category]: Object.assign(
							{},
							state[category],
							{[name]: Object.assign(
								{},
								skill,
								{
									rating: nextDecrement
								})
						}),
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

module.exports = skillReducer;
