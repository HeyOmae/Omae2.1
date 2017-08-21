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
					...prevState[category] || [],
					gearToAdd
				],
				nuyen: prevState.nuyen + Number(cost)
			};
		},
		SELL(prevState, {index, category}) {
			const gearArray = prevState[category],
				gearBeingSold = gearArray[index],
				newCost = prevState.nuyen - Number(gearBeingSold.currentCost || gearBeingSold.cost);
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
						nuyen: newCost
					}
				);
			}

			const {[category]: discard, ...newState} = prevState;

			return {
				...newState,
				nuyen: newCost
			};
		},

		WEAPON_MODDING(prevState, {index, category, slot, mod}) {
			const weaponsArray = prevState[category],
				gearBeingModded = weaponsArray[index],
				currentSlotBeingModded = gearBeingModded.mods && gearBeingModded.mods[slot];

			if (!mod && currentSlotBeingModded) {
				const {[slot]: discard, ...remainingMods} = gearBeingModded.mods,
					nuyenRefund = Number(currentSlotBeingModded.cost);
				return {
					...prevState,
					[category]: [
						...weaponsArray.slice(0, index),
						{
							...gearBeingModded,
							mods: {
								...remainingMods
							},
							currentCost: Number(gearBeingModded.cost)
						},
						...weaponsArray.slice(index + 1)
					],
					nuyen: prevState.nuyen - nuyenRefund
				};
			} else if (!mod) {
				return prevState;
			}

			const modPrice = currentSlotBeingModded ? mod.cost - Number(currentSlotBeingModded.cost) : Number(mod.cost);

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
						currentCost: Number(gearBeingModded.cost) + Number(mod.cost)
					},
					...weaponsArray.slice(index + 1)
				],
				nuyen: prevState.nuyen + modPrice
			};
		},

		MODDING_MULTI(prevState, {index, category, slot, mod}) {
			const weaponsArray = prevState[category],
				gearBeingModded = weaponsArray[index],
				updatedMods = gearBeingModded.mods ? {
					...gearBeingModded.mods[slot],
					[mod.name]: mod
				}
				: {
					[mod.name]: mod
				},
				modCost = Number(mod.cost);

			return {
				...prevState,
				[category]: [
					...weaponsArray.slice(0, index),
					{
						...gearBeingModded,
						mods: {
							...gearBeingModded.mods,
							[slot]: {
								...updatedMods
							}
						},
						currentCost: (gearBeingModded.currentCost || Number(gearBeingModded.cost)) + modCost
					},
					...weaponsArray.slice(index + 1)
				],
				nuyen: prevState.nuyen + modCost
			};
		},

		DEMODDING_MULTI(prevState, {index, category, slot, demodName}) {
			const weaponsArray = prevState[category],
				gearBeingDemodded = weaponsArray[index],
				{[demodName]: discard, ...updatedMods} = gearBeingDemodded.mods[slot],
				modCost = Number(discard.cost);

			return {
				...prevState,
				[category]: [
					...weaponsArray.slice(0, index),
					{
						...gearBeingDemodded,
						mods: {
							...gearBeingDemodded.mods,
							[slot]: updatedMods
						},
						currentCost: (gearBeingDemodded.currentCost) - modCost
					},
					...weaponsArray.slice(index + 1)
				],
				nuyen: prevState.nuyen - modCost
			};
		},

		MODDING_CAPACITY(prevState, {index, category, mod, Rating}) {
			const gearArray = prevState[category],
				gearBeingModded = prevState[category][index],
				capacity = (gearBeingModded.capacity || 0) + (Rating || Number(mod.armorcapacity.match(/\d+/)[0]));

			if (capacity > gearBeingModded.armorcapacity) {
				return prevState;
			}

			let modtoAdd = mod,
				cost = mod.cost;

			if (Rating) {
				const evil = eval;
				cost = evil(cost.replace('Rating', Rating));
				modtoAdd = {
					...mod,
					currentRating: Rating,
					currentCost: cost
				};
			}

			return {
				...prevState,
				[category]: [
					...gearArray.slice(0, index),
					{
						...gearBeingModded,
						mods: {
							...gearBeingModded.mods,
							[mod.name]: modtoAdd
						},
						currentCost: Number(gearBeingModded.currentCost || gearBeingModded.cost) + Number(cost),
						capacity
					},
					...gearArray.slice(index + 1)
				],
				nuyen: prevState.nuyen + Number(cost)
			};
		},

		DEMODDING_CAPACITY(prevState, {index, category, demodName}) {
			const gearArray = prevState[category],
				gearBeingModded = prevState[category][index],
				{[demodName]: discard, ...remainingMods} = gearBeingModded.mods,
				capacityToRemove = discard.currentRating || Number(discard.armorcapacity.match(/\d+/)[0]),
				cost = discard.currentCost || Number(discard.cost);

			return {
				...prevState,
				[category]: [
					...gearArray.slice(0, index),
					{
						...gearBeingModded,
						mods: {
							...remainingMods
						},
						capacity: gearBeingModded.capacity - capacityToRemove,
						currentCost: gearBeingModded.currentCost - cost
					},
					...gearArray.slice(index + 1)
				],
				nuyen: prevState.nuyen - cost
			};
		},

		DEFAULT(prevState) { return prevState; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = purchaseGearReducer;
