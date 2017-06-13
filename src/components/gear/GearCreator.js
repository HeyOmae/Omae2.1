export default class GearClass {
	constructor(gear) {
		if (gear.cost.search('Variable') > -1) {
			this.gear = {
				...gear,
				cost: gear.cost.match(/\d+/g)[0]
			};
		} else if (gear.cost.search('Rating') > -1) {
			this.gear = {
				...gear,
				currentRating: 1
			};
		} else {
			this.gear = gear;
		}
	}

	updateCost(cost) {
		this.gear = {
			...this.gear,
			cost: Math.ceil(cost)
		};
	}

	updateRating(rating) {
		const ratingNum = Number(rating);
		this.gear = {
			...this.gear,
			currentRating: ratingNum > 1 && ratingNum <= this.gear.rating ? Math.floor(ratingNum) : 1
		};
	}

	getGear() {
		return this.gear;
	}
}
