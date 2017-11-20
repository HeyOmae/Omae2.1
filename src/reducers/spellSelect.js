/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	spells: [],
	powers: [],
	powerPointsSpent: 0,
	powerPointsKarma: 0,
	complexforms: []
};

const spellReducer = (state = initialState, action) => {
	// helper functions
	function addingSpellToList(listOfSpells, newSpell) {
		return [
			...listOfSpells,
			newSpell
		];
	}

	function currentlyHasSpell(listOfSpells, newSpell) {
		return !!listOfSpells.find((spell) => {
			return newSpell.name === spell.name;
		});
	}

	function removeSpellFromList(listOfSpells, indexToDelete) {
		return [
			...listOfSpells.slice(0, indexToDelete),
			...listOfSpells.slice(indexToDelete + 1)
		];
	}

	function modifyPowerFromList(listOfPowers, indexToModify, modifiedPower) {
		return [
			...listOfPowers.slice(0, indexToModify),
			modifiedPower,
			...listOfPowers.slice(indexToModify + 1)
		];
	}

	function mysticPowerKarmaCost(isMystic, newState, oldState) {
		if (
			isMystic &&
			(
				newState.powerPointsSpent < Math.ceil(oldState.powerPointsSpent) ||
				newState.powerPointsSpent > ~~oldState.powerPointsSpent
			)
		) {
			return Object.assign(
				{},
				newState,
				{ powerPointsKarma: Math.ceil(newState.powerPointsSpent) * 5 }
			);
		}

		return newState;
	}

	// function calculateAdeptPointsSpent() {
	// 	var pointsSpent = 0;
	// 	for(var power of state.powers) {
	// 		pointsSpent += power.points * (power.levels>0?power.levels : 1);
	// 	}

	// 	return pointsSpent;
	// }

	const {type, parameter} = action;

	switch (type) {
	case 'ADD_SPELL': {
		const {newSpell} = parameter;
		const spellAlreadyExists = state.spells.find((spell) => {
			return spell.name === newSpell.name;
		});

		if (spellAlreadyExists) {
			return state;
		}

		return {
			...state,
			spells: [
				...state.spells,
				newSpell
			]
		};
	}
	case 'REMOVE_SPELL': {
		const {spellIndex} = parameter;
		return Object.assign(
			{},
			state,
			{
				spells: removeSpellFromList(state.spells, spellIndex)
			}
		);
	}
	case 'ADD_COMPLEXFORM': {
		const {newSpell} = parameter;
		return Object.assign(
			{},
			state,
			{
				complexforms: addingSpellToList(state.complexforms, newSpell)
			}
		);
	}
	case 'REMOVE_COMPLEXFORM': {
		const {spellIndex} = parameter;
		return Object.assign(
			{},
			state,
			{
				complexforms: removeSpellFromList(state.complexforms, spellIndex)
			}
		);
	}
	case 'ADD_POWER': {
		const {newSpell, isMystic} = parameter;
		if (!currentlyHasSpell(state.powers, newSpell)) {
			let newState = Object.assign(
				{},
				state,
				{
					powers: addingSpellToList(state.powers, newSpell),
					powerPointsSpent: state.powerPointsSpent + Number(newSpell.points)
				}
			);

			newState = mysticPowerKarmaCost(isMystic, newState, state);

			return newState;
		}

		return state;
	}
	case 'REMOVE_POWER': {
		const {powerIndex, isMystic} = parameter;
		const power = state.powers[powerIndex];
		let newState = Object.assign(
			{},
			state,
			{
				powers: removeSpellFromList(state.powers, powerIndex),
				powerPointsSpent: state.powerPointsSpent - (
					Number(power.points) * (power.levels > 0 ? power.levels : 1)
				)
			}
		);

		newState = mysticPowerKarmaCost(isMystic, newState, state);

		return newState;
	}
	case 'RAISE_POWER': {
		const {powerIndex, isMystic} = parameter;
		const powerToRaise = state.powers[powerIndex],
			powerLevelRasied = Object.assign(
				{},
				powerToRaise,
				{
					levels: powerToRaise.levels + 1
				}
			);

		let newState = Object.assign(
			{},
			state,
			{
				powers: modifyPowerFromList(state.powers, powerIndex, powerLevelRasied),
				powerPointsSpent: state.powerPointsSpent + Number(state.powers[powerIndex].points)
			}
		);

		newState = mysticPowerKarmaCost(isMystic, newState, state);

		return newState;
	}
	case 'LOWER_POWER': {
		const {powerIndex, isMystic} = parameter;
		const powerToLower = state.powers[powerIndex],
			powerLevelLowered = Object.assign(
				{},
				powerToLower,
				{
					levels: powerToLower.levels - 1
				}
			);

		let newState = Object.assign(
			{},
			state,
			{
				powers: modifyPowerFromList(state.powers, powerIndex, powerLevelLowered),
				powerPointsSpent: state.powerPointsSpent - Number(state.powers[powerIndex].points)
			}
		);

		newState = mysticPowerKarmaCost(isMystic, newState, state);

		return newState;
	}
	case 'RESET_ABILITY': {
		const {ability} = parameter;
		if (state[ability].length > 0) {
			const newState = Object.assign(
				{},
				state,
				{
					[ability]: [],
					powerPointsSpent: ability === 'powers' ? 0 : state.powerPointsSpent,
					powerPointsKarma: 0
				}
			);

			return newState;
		}
		return state;
	}
	default: return state;
	}
};

module.exports = spellReducer;
