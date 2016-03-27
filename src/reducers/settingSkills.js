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
		var {name, category, max, skillToShow, attribute, skillsInGroup, spec} = action.parameter;
	}

	function changeSkill(skillInfoUpdated, typeSpend, spentPoints) {
		return Object.assign(
			{},
			state,
			{
				[category]: Object.assign(
					{},
					state[category],
					skillInfoUpdated),
				[typeSpend]: spentPoints
			}
		);
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
				let nextIncrement = skill.rating + 1||1;
				if (nextIncrement > max - (skill.groupRating || 0)) {

					return state;

				} else {

					newState = changeSkill(
						{[name]: generateSkillObject(skill, {rating: nextIncrement})},
						'skillPointsSpent',
						state.skillPointsSpent + 1
					);

				}
			} else {
				newState = changeSkill(
					{[name]: {
						rating: 1,
						attribute: attribute
					}},
					'skillPointsSpent',
					state.skillPointsSpent + 1
				);
			}
			return newState;
		},

		DECREMENT_SKILL: () => {
			var newState,
				skill = state[category][name];
			if(!skill) {

				return state;

			} else if(skill.rating === 1 && !skill.groupRating) {

				newState = changeSkill(
					{},
					'skillPointsSpent',
					state.skillPointsSpent - 1
				);

				delete newState[category][name];

			} else if(skill.rating > 0) {
				let nextDecrement = skill.rating - 1;

				newState = changeSkill(
					{[name]: generateSkillObject(skill, {rating: nextDecrement})},
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
					{[name]: {rating: skillgroup.rating + 1}},
					'groupPointSpent',
					state.groupPointSpent + 1);
			} else {
				newState = changeSkill(
					{[name]: {
						rating: 1
					}},
					'groupPointSpent',
					state.groupPointSpent + 1);
			}

			var newGroupRating = newState.groups[name].rating;

			for(let skillName in skillsInGroup) {
				let skillAttibute = skillsInGroup[skillName],
					skill = newState.active[skillName],
					skillInfo = skill?
						generateSkillObject(skill, {groupRating: newGroupRating}):
						{groupRating: newGroupRating, attribute: skillAttibute};

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

		DECREMENT_SKILLGROUP: () => {
			var newState,
				skillgroup = state.groups[name],
				newGroupRating = skillgroup.rating - 1;

			if(!skillgroup) {
				return state;
			} else if(skillgroup.rating === 1) {
				newState = changeSkill(
					{},
					'groupPointSpent',
					state.groupPointSpent - 1
				);

				delete newState.groups[name];
			} else if (skillgroup.rating > 0) {
				newState = changeSkill(
					{[name]: generateSkillObject(skillgroup, {rating: newGroupRating})},
					'groupPointSpent',
					state.groupPointSpent - 1
				);
			}

			for(let skillName in skillsInGroup) {
				newState = Object.assign(
					{},
					newState,
					{active: Object.assign(
						{},
						newState.active,
						{[skillName]:
							Object.assign(
								{},
								newState.active[skillName],
								{groupRating: newGroupRating}
							)
						}
					)}
				);

				let newSkill = newState.active[skillName];

				if(!newSkill.groupRating && !newSkill.rating) {
					delete newState.active[skillName];
				} else if (!newSkill.groupRating && newSkill.rating > 0) {
					delete newState.active[skillName].groupRating;
				}
			}

			return newState;
		},

		SET_SPEC: () => {
			let newState,
				skill = state[category][name];

			if(!spec || !skill) {
				return state;
			} else if (spec === '–') {
				let newSkill = generateSkillObject(skill, {spec: spec});

				newState = changeSkill(
					{[name]: newSkill},
					'skillPointsSpent',
					state.skillPointsSpent - 1
					);

				delete newState[category][name].spec;

			} else if (typeof spec === 'string') {
				let newSkill = generateSkillObject(skill, {spec: spec}),
					skillPointChange = skill.spec ? state.skillPointsSpent : state.skillPointsSpent + 1;

				newState = changeSkill(
					{[name]: newSkill},
					'skillPointsSpent',
					skillPointChange
					);
			}

			return newState;
		},

		DEFAULT: () => { return state; }
	};

	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = skillReducer;
