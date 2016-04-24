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
		SELECT_SPELL: () => {
			return Object.assign(
				{},
				state,
				{}
			);
		},

		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = spellReducer;
