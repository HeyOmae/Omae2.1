import React from 'react';
import PropTypes from 'prop-types';

import {GearRatingComponent, GearCostComponent} from '../displayComponents';

function ArmorTableRow({armor, button, armorGear, mod}) {
	return (
		<tr>
			<td>{button}</td>
			<td>{mod || armor.name}</td>
			<td>{armor.armor}</td>
			<td><GearRatingComponent gear={armorGear} defaultValue={`${armor.currentRating || armor.armorcapacity}`} /></td>
			<td>{armor.avail}</td>
			<td><GearCostComponent cost={armor.cost} currentCost={armor.currentCost} gear={armorGear} /></td>
			<td>{armor.source} p{armor.page}</td>
		</tr>
	);
}

ArmorTableRow.propTypes = {
	armor: PropTypes.shape({
		name: PropTypes.string.isRequired,
		armor: PropTypes.string.isRequired,
		armorcapacity: PropTypes.string.isRequired,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired
	}).isRequired,
	armorGear: PropTypes.shape({
		gear: PropTypes.object.isRequired,
		updateCost: PropTypes.func.isRequired
	}),
	button: PropTypes.element.isRequired,
	mod: PropTypes.element
};

ArmorTableRow.defaultProps = {
	armorGear: null,
	mod: null
};

export default ArmorTableRow;
