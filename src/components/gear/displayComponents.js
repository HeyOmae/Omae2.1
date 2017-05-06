import React from 'react';
import PropTypes from 'prop-types';

function GearRatingComponent({gear, defaultValue}) {
	if (gear && gear.getGear().currentRating) {
		const gearInstance = gear.getGear();
		return (
			<input
				type="number"
				className="form-control"
				min={1}
				max={gearInstance.rating}
				onChange={(e) => {
					gear.updateRating(e.target.value);
				}}
				placeholder={`1-${gearInstance.rating}`} />
		);
	}

	return (
		<span>{defaultValue}</span>
	);
}

GearRatingComponent.propTypes = {
	gear: PropTypes.shape({
		getGear: PropTypes.func.isRequired,
		updateRating: PropTypes.func.isRequired
	}),
	defaultValue: PropTypes.string.isRequired
};

GearRatingComponent.defaultProps = {
	gear: null
};

function GearCostComponent({cost, currentCost, gear}) {
	if (cost.search('Variable') > -1 && !currentCost) {
		const costRange = cost.match(/\d+/g);
		return (
			<input
				type="number"
				className="form-control"
				min={costRange[0]}
				max={costRange[1]}
				onChange={(e) => {
					gear.updateCost(e.target.value);
				}}
				placeholder={`${costRange[0]}-${costRange[1]}`} />
		);
	}
	return (
		<span>{currentCost || cost}&yen;</span>
	);
}

GearCostComponent.propTypes = {
	cost: PropTypes.string.isRequired,
	currentCost: PropTypes.number,
	gear: PropTypes.shape({
		updateCost: PropTypes.func.isRequired
	})
};

GearCostComponent.defaultProps = {
	currentCost: 0,
	gear: null
};

export {GearCostComponent, GearRatingComponent};
