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

	const actionsToTake = {
		ADD_SPELL: (prevState, {newSpell}) => {
			return Object.assign(
				{},
				prevState,
				{
					spells: addingSpellToList(prevState.spells, newSpell)
				}
			);
		},

		REMOVE_SPELL: (prevState, {spellIndex}) => {
			return Object.assign(
				{},
				prevState,
				{
					spells: removeSpellFromList(prevState.spells, spellIndex)
				}
			);
		},

		ADD_COMPLEXFORM: (prevState, {newSpell}) => {
			return Object.assign(
				{},
				prevState,
				{
					complexforms: addingSpellToList(prevState.complexforms, newSpell)
				}
			);
		},

		REMOVE_COMPLEXFORM: (prevState, {spellIndex}) => {
			return Object.assign(
				{},
				prevState,
				{
					complexforms: removeSpellFromList(prevState.complexforms, spellIndex)
				}
			);
		},

		ADD_POWER: (prevState, {newSpell, isMystic}) => {
			let newState = Object.assign(
				{},
				prevState,
				{
					powers: addingSpellToList(prevState.powers, newSpell),
					powerPointsSpent: prevState.powerPointsSpent + Number(newSpell.points)
				}
			);

			newState = mysticPowerKarmaCost(isMystic, newState, prevState);

			return newState;
		},

		REMOVE_POWER: (prevState, {powerIndex, isMystic}) => {
			const power = prevState.powers[powerIndex];
			let newState = Object.assign(
				{},
				prevState,
				{
					powers: removeSpellFromList(prevState.powers, powerIndex),
					powerPointsSpent: prevState.powerPointsSpent - (
						Number(power.points) * (power.levels > 0 ? power.levels : 1)
						)
				}
			);

			newState = mysticPowerKarmaCost(isMystic, newState, prevState);

			return newState;
		},

		RAISE_POWER: (prevState, {powerIndex, isMystic}) => {
			const powerToRaise = prevState.powers[powerIndex],
				powerLevelRasied = Object.assign(
					{},
					powerToRaise,
					{
						levels: powerToRaise.levels + 1
					}
				);

			let newState =   Object.assign(
				{},
				prevState,
				{
					powers: modifyPowerFromList(prevState.powers, powerIndex, powerLevelRasied),
					powerPointsSpent: prevState.powerPointsSpent + Number(prevState.powers[powerIndex].points)
				}
			);

			newState = mysticPowerKarmaCost(isMystic, newState, prevState);

			return newState;
		},

		LOWER_POWER: (prevState, {powerIndex, isMystic}) => {
			const powerToLower = prevState.powers[powerIndex],
				powerLevelLowered = Object.assign(
					{},
					powerToLower,
					{
						levels: powerToLower.levels - 1
					}
				);

			let newState = Object.assign(
				{},
				prevState,
				{
					powers: modifyPowerFromList(prevState.powers, powerIndex, powerLevelLowered),
					powerPointsSpent: prevState.powerPointsSpent - Number(prevState.powers[powerIndex].points)
				}
			);

			newState = mysticPowerKarmaCost(isMystic, newState, prevState);

			return newState;
		},

		RESET_ABILITY: (prevState, {ability}) => {
			if (prevState[ability].length > 0) {
				const newState = Object.assign(
					{},
					prevState,
					{
						[ability]: [],
						powerPointsSpent: ability === 'powers' ? 0 : prevState.powerPointsSpent,
						powerPointsKarma: 0
					}
				);

				return newState;
			}
			return prevState;
		},

		DEFAULT: (previousState) => { return previousState; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = spellReducer;
