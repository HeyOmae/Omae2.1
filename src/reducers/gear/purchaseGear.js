/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	weapons: {}
};


const purchaseGearReducer = (state=initialState, action) => {

	const actionsToTake = {
		PURCHASE: ({gear, category}) => {
			if(state[category]) {
				return Object.assign(
					{},
					state,
					{[category]:
						[
							...state[category],
							gear
						]
					}
				);
			} else {
				return Object.assign(
					{},
					state,
					{[category]: [gear]}
				);
			}
		},
		SELL: () => {

		},
		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(action.parameter);
};

module.exports = purchaseGearReducer;
