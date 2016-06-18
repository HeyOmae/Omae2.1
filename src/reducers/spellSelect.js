/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	spells: [],
	powers: [],
	powerPointsSpent: 0,
	complexforms: []
};

const spellReducer = (state=initialState, action) => {
	function addingSpellToList (listOfSpells, newSpell) {
		return [
				...listOfSpells,
				newSpell
			];
	}

	function removeSpellFromList (listOfSpells, indexToDelete) {
		return [
			...listOfSpells.slice(0, indexToDelete),
			...listOfSpells.slice(indexToDelete + 1)
		];
	}

	function modifyPowerFromList (listOfPowers, indexToModify, modifiedPower) {
		return [
			...listOfPowers.slice(0, indexToModify),
			modifiedPower,
			...listOfPowers.slice(indexToModify + 1)
		];
	}

	// function calculateAdeptPointsSpent() {
	// 	var pointsSpent = 0;
	// 	for(var power of state.powers) {
	// 		pointsSpent += power.points * (power.levels>0?power.levels : 1);
	// 	}

	// 	return pointsSpent;
	// }

	const actionsToTake = {
		ADD_SPELL: () => {
			return Object.assign(
				{},
				state,
				{
					spells: addingSpellToList(state.spells, action.parameter.newSpell)
				}
			);
		},

		REMOVE_SPELL: ()=>{
			return Object.assign(
				{},
				state,
				{
					spells: removeSpellFromList(state.spells, action.parameter.spellIndex)
				}
			);
		},

		ADD_COMPLEXFORM: () => {
			return Object.assign(
				{},
				state,
				{
					complexforms: addingSpellToList(state.complexforms, action.parameter.newSpell)
				}
			);
		},

		REMOVE_COMPLEXFORM: () => {
			return Object.assign(
				{},
				state,
				{
					complexforms: removeSpellFromList(state.complexforms, action.parameter.spellIndex)
				}
			);
		},

		ADD_POWER: () => {
			return Object.assign(
				{},
				state,
				{
					powers: addingSpellToList(state.powers, action.parameter.newSpell),
					powerPointsSpent: state.powerPointsSpent + Number(action.parameter.newSpell.points)
				}
			);
		},

		REMOVE_POWER: () => {
			const {powerIndex} = action.parameter,
				power = state.powers[powerIndex];
			return Object.assign(
				{},
				state,
				{
					powers: removeSpellFromList(state.powers, powerIndex),
					powerPointsSpent: state.powerPointsSpent - (Number(power.points)* power.levels)
				}
			);
		},

		RAISE_POWER: () => {
			const {powerIndex} = action.parameter,
				powerToRaise = state.powers[powerIndex],
				powerLevelRasied = Object.assign(
					{},
					powerToRaise,
					{
						levels: powerToRaise.levels + 1
					}
				);

			return Object.assign(
				{},
				state,
				{
					powers: modifyPowerFromList(state.powers, powerIndex, powerLevelRasied),
					powerPointsSpent: state.powerPointsSpent + Number(state.powers[powerIndex].points)
				}
			);
		},

		LOWER_POWER: () => {
			const {powerIndex} = action.parameter,
				powerToLower = state.powers[powerIndex],
				powerLevelLowered = Object.assign(
					{},
					powerToLower,
					{
						levels: powerToLower.levels - 1
					}
				);

			return Object.assign(
				{},
				state,
				{
					powers: modifyPowerFromList(state.powers, powerIndex, powerLevelLowered),
					powerPointsSpent: state.powerPointsSpent - Number(state.powers[powerIndex].points)
				}
			);
		},

		RESET_ABILITY: () => {
			const {ability} = action.parameter;
			if(state[ability].length > 0){
				return Object.assign(
					{},
					state,
					{
						[ability]: []
					}
				);
			} else {
				return state;
			}
		},

		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = spellReducer;
