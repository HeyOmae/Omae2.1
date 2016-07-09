/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

const initialState = 25;

const KarmaReducer = (state=initialState, action) => {
	const actionsToTake = {
		KARMA: () => {
			const {karmaPoints} = action.parameter;
			return state + karmaPoints;
		},
		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = KarmaReducer;
