/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	modalName: '',
	modalContent: null
};

const modalReducer = (state = initialState, action) => {
	const actionsToTake = {
		MODAL_OPEN: (prevState, modal) => {
			return modal;
		},

		MODAL_CLOSE: () => {
			return initialState;
		},

		DEFAULT: (prevState) => { return prevState; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = modalReducer;
