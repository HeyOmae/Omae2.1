/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	spells: [],
	powers: [],
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

		RESET_ABILITY: () => {
			return Object.assign(
				{},
				state,
				{
					[action.parameter.ability]: []
				}
			);
		},

		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = spellReducer;
