/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = '';

const modalReducer = (state = initialState, action) => {
	const actionsToTake = {
		TOGGLE_MODAL: (prevState, modalID) => {
			return prevState === modalID ? '' : modalID;
		},

		DEFAULT: (prevState) => { return prevState; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = modalReducer;
