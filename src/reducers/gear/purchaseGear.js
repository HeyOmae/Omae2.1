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
		SELL: ({index, category}) => {
			let gearArray = state[category];
			if(gearArray.length > 1) {
				return Object.assign(
					{},
					state,
					{
						[category]:
						[
							...gearArray.slice(0, index),
							...gearArray.slice(index + 1)
						]
					}
				);
			} else {
				let newState = Object.assign(
					{},
					state
				);

				delete newState[category];

				return newState;
			}
		},
		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(action.parameter);
};

module.exports = purchaseGearReducer;
