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

	function changeSkill(skillInfo, typeSpend, spentPoints) {
		return Object.assign(
			{},
			state,
			{
				[category]: Object.assign(
					{},
					state[category],
					{
						[name]: skillInfo
					}),
				[typeSpend]: spentPoints
			}
		)
	}

	function generateSkillObject(skill, updatedSkilInfo) {
		return Object.assign(
			{},
			skill,
			updatedSkilInfo);
	}

	const actionsToTake = {
		INCREMENT_SKILL: () => {
			var newState,
				skill = state[category][name];
			if(skill){
				let nextIncrement = skill.rating + 1;
				if (nextIncrement > max - (skill.groupRating || 0)) {

					return state;

				} else {

					newState = changeSkill(
						generateSkillObject(skill, {rating: nextIncrement}),
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

			} else if(skill.rating === 1 && !skill.groupRating) {

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
					generateSkillObject(skill, {rating: nextDecrement}),
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
				newState = changeSkill(
					{rating: skillgroup.rating + 1},
					'groupPointSpent',
					state.groupPointSpent + 1);
			} else {
				newState = changeSkill(
					{
						rating: 1
					},
					'groupPointSpent',
					1);
			}

			for(let skillName in skillsInGroup) {
				let skillAttibute = skillsInGroup[skillName],
					skill = state.active[skillName],
					skillInfo = skill?
						generateSkillObject(skill, {groupRating: skill.groupRating?skill.groupRating+1:1}):
						{groupRating: 1,attribute: skillAttibute};

				newState = Object.assign(
					{},
					newState,
					{active: Object.assign(
						{},
						newState.active,
						{
							[skillName]: skillInfo
						}
				)});
			}

			return newState;
		},

		DEFAULT: () => { return state; }
	};

	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = skillReducer;
