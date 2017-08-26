import React from 'react';
import PropTypes from 'prop-types';

class ArmorTableRow extends React.PureComponent {
	render() {
		const {armor, button, mod} = this.props;
		return (
			<tr>
				<td className="armor-button">{button}</td>
				<td className="armor-name">{mod || armor.name}</td>
				<td className="armor-value">{armor.armor}</td>
				<td className="armor-capacity">{`${armor.currentRating || armor.armorcapacity}`}</td>
				<td className="armor-avail">{armor.avail}</td>
				<td className="armor-cost">{armor.currentCost || armor.cost}</td>
				<td className="armor-ref">{armor.source} p{armor.page}</td>
			</tr>
		);
	}
}

ArmorTableRow.propTypes = {
	armor: PropTypes.shape({
		name: PropTypes.string.isRequired,
		armor: PropTypes.string.isRequired,
		armorcapacity: PropTypes.string.isRequired,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired,
		currentCost: PropTypes.string,
		currentRating: PropTypes.string
	}).isRequired,
	button: PropTypes.element.isRequired,
	mod: PropTypes.element
};

ArmorTableRow.defaultProps = {
	armorGear: null,
	mod: null
};

export default ArmorTableRow;
