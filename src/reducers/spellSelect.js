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
			const {spellIndex} = action.parameter;
			return Object.assign(
				{},
				state,
				{
					powers: removeSpellFromList(state.powers, spellIndex),
					powerPointsSpent: state.powerPointsSpent - Number(state.powers[spellIndex].points)
				}
			);
		},

		RAISE_POWER: () => {
			const {spellIndex} = action.parameter;

			return Object.assign(
				{},
				state,
				{
					powers: state.powers.splice(spellIndex, 1, {})
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
