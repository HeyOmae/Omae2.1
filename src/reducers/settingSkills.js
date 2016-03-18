/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	active: {},
	knowledge: {},
	groups: {},
	skillPointsSpent: 0,
	groupPointSpent: 0,
	showSkill: ''
};

const skillReducer = (state=initialState, action) => {
	if(action.parameter) {
		var {name, category, max, skillToShow, attribute, skillsInGroup} = action.parameter;
	}

	function changeSkill(skillData, typeSpend, spentPoints) {
		return Object.assign(
			{},
			state,
			{
				[category]: Object.assign(
					{},
					state[category],
					{
						[name]: skillData
					}),
				[typeSpend]: spentPoints
			}
		)
	}

	function generateSkillObject(skill, rating) {
		return Object.assign(
			{},
			skill,
			{
				rating: rating
			});
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

					newState = changeSkill(
						generateSkillObject(skill, nextIncrement),
						'skillPointsSpent',
						state.skillPointsSpent + 1
					);

				}
			} else {
				newState = changeSkill(
					{
						rating: 1,
						attribute: attribute
					},
					'skillPointsSpent',
					state.skillPointsSpent + 1
				);
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

				newState = changeSkill(
					generateSkillObject(skill, nextDecrement),
					'skillPointsSpent',
					state.skillPointsSpent - 1
				);

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

		INCREMENT_SKILLGROUP: () => {
			var newState,
				skillgroup = state.groups[name];

			if(skillgroup){
				console.log('increment skill group');
			} else {
				newState = changeSkill(
					{
						rating: 1
					},
					'groupPointSpent',
					1);

				skillsInGroup.forEach(skillName => {
					newState = Object.assign(
						{},
						newState,
						{active: Object.assign(
							{},
							newState.active,
							{
								[skillName]: {
									min: 1,
									attribute: 'agi'
								}
							}
					)});
				});
			}

			return newState;
		},

		DEFAULT: () => { return state; }
	};

	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = skillReducer;
