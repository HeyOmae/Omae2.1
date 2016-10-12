/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	metatype: 'A',
	attribute: 'B',
	magres: 'C',
	skills: 'D',
	resources: 'E'
};

const priorityReducer = (state=initialState, action) => {
	const actionsToTake = {
		SET_PRIORITY: (oldState, {rating, category} ) => {
			return Object.assign(
				{},
				oldState,
				{[category]: rating}
			);
		},
		DEFAULT: sameState => sameState
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = priorityReducer;
