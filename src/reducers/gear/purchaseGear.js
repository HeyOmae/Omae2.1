/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	nuyen: 0
};


const purchaseGearReducer = (state = initialState, action) => {

	const actionsToTake = {
		PURCHASE: (prevState, {gear, category}) => {
			if (prevState[category]) {
				return Object.assign(
					{},
					prevState,
					{
						[category]:
						[
							...prevState[category],
							gear
						],
						nuyen: prevState.nuyen + Number(gear.cost)
					}
				);
			}

			return Object.assign(
				{},
				prevState,
				{
					[category]: [gear],
					nuyen: prevState.nuyen + Number(gear.cost)
				}
			);
		},
		SELL: (prevState, {index, category}) => {
			const gearArray = prevState[category];
			if (gearArray.length > 1) {
				return Object.assign(
					{},
					prevState,
					{
						[category]:
						[
							...gearArray.slice(0, index),
							...gearArray.slice(index + 1)
						],
						nuyen: prevState.nuyen - Number(gearArray[index].cost)
					}
				);
			}

			const newState = Object.assign(
				{},
				prevState,
				{
					nuyen: prevState.nuyen - Number(gearArray[index].cost)
				}
			);

			delete newState[category];

			return newState;
		},
		DEFAULT: (prevState) => { return prevState; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = purchaseGearReducer;
