/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = 'Mage';

const magicReducer = (state=initialState, action) => {
	const actionsToTake = {
		SELECT_MAGICTYPE: () => {
			return action.parameter;
		},

		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = magicReducer;
