/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

const initialState = 25;

const KarmaReducer = (state = initialState, action) => {
	const actionsToTake = {
		KARMA(prevState, {karmaPoints}) {
			return prevState + karmaPoints;
		},

		SELECT_METATYPE(prevState, {karmaOldCost, karmaNewCost}) {
			return prevState + karmaOldCost - karmaNewCost;
		},

		DEFAULT(prevState) { return prevState; },
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

export default KarmaReducer;
