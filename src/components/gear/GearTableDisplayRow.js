import React from 'react';
import PropTypes from 'prop-types';
import {GearRatingComponent, GearCostComponent} from './displayComponents';


class GearTableRow extends React.Component {
	render() {
		const {gear, button, gearState} = this.props;
		return (
			<tr>
				<td>{button}</td>
				<td className="gear-name">{gear.name}</td>
				<td className="gear-rating"><GearRatingComponent gear={gearState} defaultValue={`${gear.currentRating || 'N/A'}`} /></td>
				<td className="gear-avail">{gear.avail}</td>
				<td className="gear-cost"><GearCostComponent cost={gear.cost} currentCost={gear.currentCost} gear={gearState} /></td>
				<td className="gear-ref">{gear.source} p{gear.page}</td>
			</tr>
		);
	}
}

GearTableRow.propTypes = {
	gear: PropTypes.shape({
		name: PropTypes.string.isRequired,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired
	}).isRequired,
	gearState: PropTypes.shape({
		gear: PropTypes.object.isRequired,
		updateCost: PropTypes.func.isRequired
	}),
	button: PropTypes.element.isRequired
};

GearTableRow.defaultProps = {
	gearState: null
};

export default GearTableRow;
