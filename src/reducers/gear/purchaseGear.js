/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
	nuyen: 0,
};


const purchaseGearReducer = (state = initialState, action) => {

	const actionsToTake = {
		PURCHASE(prevState, {gear, category, Rating}) {
			let { cost } = gear,
				gearToAdd = Rating ? {...gear, currentRating: Rating} : gear;

			if (Rating && cost.search('Rating') > -1) {
				const evil = eval;
				cost = evil(cost.replace('Rating', Rating));
				gearToAdd = {
					...gearToAdd,
					currentCost: cost,
				};
			}

			return {
				...prevState,
				[category]: [
					...prevState[category] || [],
					gearToAdd,
				],
				nuyen: prevState.nuyen + Number(cost),
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
							...gearArray.slice(index + 1),
						],
						nuyen: newCost,
					},
				);
			}

			const {[category]: discard, ...newState} = prevState;

			return {
				...newState,
				nuyen: newCost,
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
								...remainingMods,
							},
							currentCost: Number(gearBeingModded.cost),
						},
						...weaponsArray.slice(index + 1),
					],
					nuyen: prevState.nuyen - nuyenRefund,
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
							[slot]: mod,
						},
						currentCost: Number(gearBeingModded.currentCost || gearBeingModded.cost) + Number(modPrice),
					},
					...weaponsArray.slice(index + 1),
				],
				nuyen: prevState.nuyen + modPrice,
			};
		},

		MODDING_MULTI(prevState, {index, category, slot, mod}) {
			const weaponsArray = prevState[category],
				gearBeingModded = weaponsArray[index],
				updatedMods = gearBeingModded.mods ? {
					...gearBeingModded.mods[slot],
					[mod.name]: mod,
				}
					: {
						[mod.name]: mod,
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
								...updatedMods,
							},
						},
						currentCost: (gearBeingModded.currentCost || Number(gearBeingModded.cost)) + modCost,
					},
					...weaponsArray.slice(index + 1),
				],
				nuyen: prevState.nuyen + modCost,
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
							[slot]: updatedMods,
						},
						currentCost: (gearBeingDemodded.currentCost) - modCost,
					},
					...weaponsArray.slice(index + 1),
				],
				nuyen: prevState.nuyen - modCost,
			};
		},

		findCapacity({currentCapacity}, {armorcapacity, capacity}, Rating) {
			return actionsToTake.findCurrentCapacity(currentCapacity) + (actionsToTake.findRatingAsCapacity(armorcapacity, capacity, Rating) || actionsToTake.findModCapacity(armorcapacity, capacity));
		},

		findCurrentCapacity(currentCapacity) {
			return currentCapacity || 0;
		},

		findModCapacity(armorcapacity, capacity) {
			return Number((armorcapacity || capacity).match(/\d+/)[0]);
		},

		findRatingAsCapacity(armorcapacity, capacity, Rating) {
			return /Rating|FixedValues/.test(armorcapacity || capacity)
				&&
				actionsToTake.findCapacityMultiplier(capacity, Number(/-/.test(capacity) ? -Rating : Rating));
		},

		findCapacityMultiplier(capacity, rating) {
			const multiplier = capacity && capacity.match(/\d/);

			if (multiplier) {
				return rating * Number(multiplier[0]);
			}
			return rating;
		},

		MODDING_CAPACITY(prevState, {index, category, mod, Rating}) {
			const gearArray = prevState[category],
				gearBeingModded = prevState[category][index],
				currentCapacity = actionsToTake.findCapacity(gearBeingModded, mod, Rating);

			if (currentCapacity > (gearBeingModded.capacity || gearBeingModded.armorcapacity)) {
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
					currentCost: cost,
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
							[mod.name]: modtoAdd,
						},
						currentCost: Number(gearBeingModded.currentCost || gearBeingModded.cost) + Number(cost),
						currentCapacity,
					},
					...gearArray.slice(index + 1),
				],
				nuyen: prevState.nuyen + Number(cost),
			};
		},

		DEMODDING_CAPACITY(prevState, {index, category, demodName}) {
			const gearArray = prevState[category],
				gearBeingModded = prevState[category][index],
				{[demodName]: discard, ...remainingMods} = gearBeingModded.mods,
				capacityToRemove = actionsToTake.findRatingAsCapacity(discard.armorcapacity, discard.capacity, discard.currentRating) || actionsToTake.findModCapacity(discard.armorcapacity, discard.capacity),
				cost = discard.currentCost || Number(discard.cost);

			return {
				...prevState,
				[category]: [
					...gearArray.slice(0, index),
					{
						...gearBeingModded,
						mods: {
							...remainingMods,
						},
						currentCapacity: gearBeingModded.currentCapacity - capacityToRemove,
						currentCost: gearBeingModded.currentCost - cost,
					},
					...gearArray.slice(index + 1),
				],
				nuyen: prevState.nuyen - cost,
			};
		},

		MODDING_VEHICLE(prevState, {index, category, mod}) {
			const vehicleArray = prevState[category],
				vehicleBeingModded = {
					...vehicleArray[index],
					mods: vehicleArray[index].mods || {},
				},
				vehicleMods = vehicleBeingModded.mods[mod.category] || {},
				cost = mod.currentCost || +mod.cost,
				vahicleModCategory = vehicleBeingModded.mods[mod.category];

			if (((vahicleModCategory && vahicleModCategory.currentSlot) || 0) +
				(mod.currentSlot || +mod.slot)
				>
				+vehicleBeingModded.body) {
				return prevState;
			}

			return {
				...prevState,
				[category]: [
					...vehicleArray.slice(0, index),
					{
						...vehicleBeingModded,
						mods: {
							...vehicleBeingModded.mods,
							[mod.category]: {
								...vehicleMods,
								[mod.name]: mod,
								currentSlot: (vehicleMods.currentSlot || 0) + (mod.currentSlot || +mod.slots),
							},
						},
						currentCost: (vehicleBeingModded.currentCost || +vehicleBeingModded.cost) + (cost),
					},
					...vehicleArray.slice(index + 1),
				],
				nuyen: prevState.nuyen + cost,
			};
		},

		DEMODDING_VEHICLE(prevState, {index, category, demodName, type}) {
			const vehicleArray = prevState[category],
				vehicleBeingModded = vehicleArray[index],
				{[demodName]: discard, ...remainingMods} = vehicleBeingModded.mods[type],
				slotsToRemove = discard.currentSlot || +discard.slots,
				cost = discard.currentCost || +discard.cost;

			return {
				...prevState,
				[category]: [
					...vehicleArray.slice(0, index),
					{
						...vehicleBeingModded,
						mods: {
							...vehicleBeingModded.mods,
							[type]: {
								...remainingMods,
								currentSlot: vehicleBeingModded.mods[type].currentSlot - slotsToRemove,
							},
						},
						currentCost: vehicleBeingModded.currentCost - cost,
					},
					...vehicleArray.slice(index + 1),
				],
				nuyen: prevState.nuyen - cost,
			};
		},

		droneCurretStatMap: {
			'Acceleration (Drone)': 'currentAccel',
			'Speed (Drone)': 'currentSpeed',
			'Handling (Drone)': 'currentHandling',
			'Armor (Drone)': 'currentArmor',
			'Pilot Program (Drone)': 'currentPilot',
		},

		MODDING_DRONE(prevState, {index, category, mod}) {
			const droneArray = prevState[category],
				droneBeingModded = droneArray[index],
				newDroneStat = actionsToTake.droneCurretStatMap[mod.name] && mod.currentRating;

			return {
				...prevState,
				[category]: [
					...droneArray.slice(0, index),
					{
						...droneBeingModded,
						mods: {
							...droneBeingModded.mods,
							[mod.name]: mod,
						},
						currentSlot: ((droneBeingModded.currentSlot || 0) + mod.currentSlot),
						currentCost: (droneBeingModded.currentCost || +droneBeingModded.cost) + mod.currentCost,
						...(
							newDroneStat ?
								{
									[actionsToTake.droneCurretStatMap[mod.name]]: newDroneStat,
								}
								:
								{}
						),
					},
					...droneArray.slice(index + 1),
				],
				nuyen: prevState.nuyen + mod.currentCost,
			};
		},

		DEFAULT(prevState) { return prevState; },
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = purchaseGearReducer;
