/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

const initialState = {
	active: {},
	knowledge: {},
	groups: {},
	magicSkills: ['', ''],
	skillPointsSpent: 0,
	groupPointSpent: 0
};

const skillReducer = (state = initialState, action) => {
	function changeSkill(
		skillInfoUpdated,
		typeSpend,
		spentPoints,
		copyState = state,
		skillCategory = action.parameter.category
		) {
		return Object.assign(
			{},
			copyState,
			{
				[skillCategory]: Object.assign(
					{},
					copyState[skillCategory],
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
		ADD_SKILL(prevState, {category, attribute, name}) {
			const skill = prevState[category][name];

			if (!skill) {
				return {
					...prevState,
					active: {
						...prevState.active,
						[name]: {
							rating: 1,
							attribute
						}
					},
					skillPointsSpent: prevState.skillPointsSpent + 1
				};
			}
			return prevState;
		},

		REMOVE_SKILL(prevState, {category, name}) {
			let newState = prevState;
			const skill = prevState[category][name];

			if (!skill) {
				return prevState;
			} else if (skill.groupRating === undefined) {
				const specCost = skill.spec ? 1 : 0;

				// eslint-disable-next-line no-unused-vars
				const { [name]: omit, ...remainingSkills } = prevState[category];

				const removeMagicSkillIndex = prevState.magicSkills.indexOf(name);

				newState = {
					...prevState,
					[category]: remainingSkills,
					magicSkills: [
						...prevState.magicSkills.slice(0, removeMagicSkillIndex),
						...prevState.magicSkills.slice(removeMagicSkillIndex + 1),
					],
					skillPointsSpent: prevState.skillPointsSpent - (skill.rating + specCost)
				};
			}

			return newState;
		},

		INCREMENT_SKILL(prevState, {category, max, name}) {
			let newState = prevState;
			const skill = prevState[category][name];

			if (skill) {
				const nextIncrement = skill.rating + 1 || 1;
				if (nextIncrement > max - (skill.groupRating || 0)) {
					return prevState;
				}
				newState = changeSkill(
					{[name]: generateSkillObject(skill, {rating: nextIncrement})},
					'skillPointsSpent',
					prevState.skillPointsSpent + 1
				);
			}

			return newState;
		},

		DECREMENT_SKILL(prevState, {category, name}) {
			let newState = prevState;
			const skill = prevState[category] && prevState[category][name];

			if (!skill) {
				return prevState;
			} else if (skill.rating > 0) {
				const nextDecrement = skill.rating - 1;

				newState = changeSkill(
					{[name]: generateSkillObject(skill, {rating: nextDecrement})},
					'skillPointsSpent',
					prevState.skillPointsSpent - 1
				);

			}
			return newState;
		},

		INCREMENT_SKILLGROUP(prevState, {skillsInGroup, name}) {
			let newState;
			const skillgroup = prevState.groups[name];

			if (skillgroup) {
				newState = changeSkill(
					{[name]: {rating: skillgroup.rating + 1}},
					'groupPointSpent',
					prevState.groupPointSpent + 1);
			} else {
				newState = changeSkill(
					{[name]: {
						rating: 1
					}},
					'groupPointSpent',
					prevState.groupPointSpent + 1);
			}

			const newGroupRating = newState.groups[name].rating;

			Object.keys(skillsInGroup).forEach((skillName) => {
				const skillAttibute = skillsInGroup[skillName],
					skill = newState.active[skillName],
					skillInfo = skill ?
						generateSkillObject(skill, {groupRating: newGroupRating}) :
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
			});

			return newState;
		},

		DECREMENT_SKILLGROUP(prevState, {name, skillsInGroup}) {
			let newState;
			const skillgroup = prevState.groups[name],
				newGroupRating = skillgroup && skillgroup.rating - 1;

			if (!skillgroup) {
				return prevState;
			} else if (skillgroup.rating === 1) {
				newState = changeSkill(
					{},
					'groupPointSpent',
					prevState.groupPointSpent - 1
				);

				delete newState.groups[name];
			} else if (skillgroup.rating > 0) {
				newState = changeSkill(
					{[name]: generateSkillObject(skillgroup, {rating: newGroupRating})},
					'groupPointSpent',
					prevState.groupPointSpent - 1
				);
			}

			Object.keys(skillsInGroup).forEach((skillName) => {
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

				const newSkill = newState.active[skillName];

				if (!newSkill.groupRating && !newSkill.rating) {
					delete newState.active[skillName];
				} else if (!newSkill.groupRating && newSkill.rating > 0) {
					delete newState.active[skillName].groupRating;
				}
			});

			return newState;
		},

		SET_SPEC(prevState, {name, category, spec}) {
			let newState;
			const skill = prevState[category][name];

			if (!skill) {
				return prevState;
			} else if (spec === '–' || spec === '') {
				const newSkill = generateSkillObject(skill, { spec });

				newState = changeSkill(
					{[name]: newSkill},
					'skillPointsSpent',
					prevState.skillPointsSpent - 1
					);

				delete newState[category][name].spec;

			} else if (typeof spec === 'string') {
				const newSkill = generateSkillObject(skill, { spec }),
					skillPointChange = skill.spec ?
						prevState.skillPointsSpent :
						prevState.skillPointsSpent + 1;

				newState = changeSkill(
					{[name]: newSkill},
					'skillPointsSpent',
					skillPointChange
					);
			} else {
				return prevState;
			}

			return newState;
		},

		SET_MAGIC_SKILLS(prevState, {magicSkills}) {
			if ((magicSkills[0] && magicSkills[1]) && (
				magicSkills[0].name
			) === (
				magicSkills[1].name
			) && magicSkills[0].name !== ''
			&& magicSkills[1].name !== '') {
				return prevState;
			}

			let newState = prevState;

			magicSkills.forEach((magSkill, index) => {
				const oldSkillName = prevState.magicSkills[index];

				const {[oldSkillName]: skillToUpdate, ...activeSkills} = newState.active;
				let newActiveskills = activeSkills;

				if (skillToUpdate && (skillToUpdate.rating || skillToUpdate.groupRating)) {
					// eslint-disable-next-line no-unused-vars
					const { magicSkillRating: omit, ...updatedSkill } = skillToUpdate;
					newActiveskills = {...activeSkills, [oldSkillName]: updatedSkill};
				}

				if (!magSkill || !magSkill.name) {
					newState = {
						...newState,
						active: {
							...newActiveskills
						},
						magicSkills: [
							...newState.magicSkills.slice(0, index),
							'',
							...newState.magicSkills.slice(index + 1)
						]
					};
				} else if (prevState.magicSkills[index] !== magSkill.name) {
					newState = {
						...newState,
						active: {
							...newActiveskills,
							[magSkill.name]: {
								...newState.active[magSkill.name],
								attribute: magSkill.attribute,
								magicSkillRating: magSkill.rating
							}
						},
						magicSkills: [
							...newState.magicSkills.slice(0, index),
							magSkill.name,
							...newState.magicSkills.slice(index + 1)
						]
					};
				}
			});

			return newState;
		},

		DEFAULT(prevState) { return prevState; }
	};

	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = skillReducer;
