/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = 'Mage';

const magicReducer = (state = initialState, action) => {
	const actionsToTake = {
		SELECT_MAGICTYPE: (prevState, selectedMagicType) => {
			return selectedMagicType;
		},

		DEFAULT: (prevState) => { return prevState; }
	};

	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = magicReducer;
