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
	resources: 'E',
};

const priorityReducer = (state = initialState, action) => {
	const actionsToTake = {
		SET_PRIORITY(prevState, {rating, category}) {
			return {
				...prevState,
				[category]: rating,
			};
		},
		DEFAULT(sameState) { return sameState; },
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

export default priorityReducer;
