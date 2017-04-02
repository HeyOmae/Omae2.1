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
		PURCHASE(prevState, {gear, category, Rating}) {
			let { cost } = gear,
				gearToAdd = gear;

			if (Rating && cost.search('Rating') > -1) {
				const evil = eval;
				cost = evil(cost.replace('Rating', Rating));
				gearToAdd = {
					...gear,
					currentRating: Rating,
					currentCost: cost
				};
			}

			return {
				...prevState,
				[category]: [
					...prevState[category] || {},
					gearToAdd
				],
				nuyen: prevState.nuyen + Number(cost)
			};
		},
		SELL(prevState, {index, category}) {
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

			const newState = {
				...prevState,
				nuyen: prevState.nuyen - Number(gearArray[index].cost)
			};

			delete newState[category];

			return newState;
		},

		WEAPON_MODDING(prevState, {index, category, slot, mod}) {
			const modPrice = Number(mod.cost),
				weaponsArray = prevState[category],
				gearBeingModded = weaponsArray[index];

			return {
				...prevState,
				[category]: [
					...weaponsArray.slice(0, index),
					{
						...gearBeingModded,
						mods: {
							...gearBeingModded.mods || {},
							[slot]: mod
						},
						currentCost: Number(gearBeingModded.cost) + modPrice
					},
					...weaponsArray.slice(index + 1)
				],
				nuyen: prevState.nuyen + modPrice
			};
		},
		DEFAULT(prevState) { return prevState; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = purchaseGearReducer;
