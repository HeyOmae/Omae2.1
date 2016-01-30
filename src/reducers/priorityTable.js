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
		SET_PRIORITY: () => {
			let {rating, category} = action.parameter;
			return Object.assign({}, state, state[category] = rating)
		},

		DEFAULT: () => { return state; }
	};

	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = priorityReducer;
