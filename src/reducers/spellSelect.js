/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	spells: {},
	powers: {}
};

const spellReducer = (state=initialState, action) => {
	const actionsToTake = {
		ADD_SPELL: () => {
			return Object.assign(
				{},
				state,
				{
					spells: [
						...state.spells,
						action.parameter.newSpell
					]
				}
			);
		},

		REMOVE_SPELL: ()=>{

		},

		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = spellReducer;
