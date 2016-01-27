/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	priority: {
		metatype: 'A',
		attribute: 'B',
		magres: 'C',
		skills: 'D',
		resouces: 'E'
	}
};

const priorityReducer = (state=initialState, action) => {
	//action.type = 'SET_PRIORITY'
	//action.priority.rating = 'A'
	//action.priority.category = 'metatype'
	const actionsToTake = {
		SET_PRIORITY: () => {
			let category = action.priority.category,
				rating = action.priority.rating;
			return Object.assign({}, state, state.priority[category] = rating)
		},

		DEFAULT: () => { return state; }
	};

	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = priorityReducer;
