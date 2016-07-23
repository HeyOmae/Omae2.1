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

	function mysticPowerKarmaCost(isMystic, newState, oldState) {
		if(isMystic && (newState.powerPointsSpent < Math.ceil(oldState.powerPointsSpent) || newState.powerPointsSpent > ~~oldState.powerPointsSpent)) {
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
			let newState = Object.assign(
				{},
				state,
				{
					powers: addingSpellToList(state.powers, action.parameter.newSpell),
					powerPointsSpent: state.powerPointsSpent + Number(action.parameter.newSpell.points)
				}
			);

			newState = mysticPowerKarmaCost(action.parameter.isMystic, newState, state);

			return newState;
		},

		REMOVE_POWER: () => {
			const {powerIndex} = action.parameter,
				power = state.powers[powerIndex];
			let newState =  Object.assign(
				{},
				state,
				{
					powers: removeSpellFromList(state.powers, powerIndex),
					powerPointsSpent: state.powerPointsSpent - (Number(power.points)* (power.levels > 0 ? power.levels : 1))
				}
			);

			newState = mysticPowerKarmaCost(action.parameter.isMystic, newState, state);

			return newState;
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

			let newState =   Object.assign(
				{},
				state,
				{
					powers: modifyPowerFromList(state.powers, powerIndex, powerLevelRasied),
					powerPointsSpent: state.powerPointsSpent + Number(state.powers[powerIndex].points)
				}
			);

			newState = mysticPowerKarmaCost(action.parameter.isMystic, newState, state);

			return newState;
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

			let newState =   Object.assign(
				{},
				state,
				{
					powers: modifyPowerFromList(state.powers, powerIndex, powerLevelLowered),
					powerPointsSpent: state.powerPointsSpent - Number(state.powers[powerIndex].points)
				}
			);

			newState = mysticPowerKarmaCost(action.parameter.isMystic, newState, state);

			return newState;
		},

		RESET_ABILITY: () => {
			const {ability} = action.parameter;
			if(state[ability].length > 0){
				let newState =  Object.assign(
					{},
					state,
					{
						[ability]: [],
						powerPointsSpent: ability === 'powers'? 0 : state.powerPointsSpent,
						powerPointsKarma: 0
					}
				);

				return newState;
			} else {
				return state;
			}
		},

		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = spellReducer;
