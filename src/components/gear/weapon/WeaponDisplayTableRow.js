import React from 'react';
import PropTypes from 'prop-types';

class WeaponsTableRow extends React.Component {
	render() {
		const {weapon, button, mod} = this.props;
		return (
			<tr key={weapon.name}>
				<td>{button}</td>
				{mod ? <td>{mod}</td> : <td>{weapon.name}</td>}
				<td>{weapon.accuracy}</td>
				<td>{weapon.damage}</td>
				<td>{weapon.ap}</td>
				<td>{weapon.mode === '0' ? 'N/A' : weapon.mode}</td>
				<td>{weapon.type === 'Melee' ? weapon.reach : weapon.rc}</td>
				<td>{weapon.avail}</td>
				<td>{weapon.currentCost || weapon.cost}&yen;</td>
				<td>{weapon.source} p{weapon.page}</td>
			</tr>
		);
	}
}

WeaponsTableRow.propTypes = {
	weapon: PropTypes.shape({
		name: PropTypes.string.isRequired,
		accuracy: PropTypes.string.isRequired,
		damage: PropTypes.string.isRequired,
		ap: PropTypes.string,
		mode: PropTypes.string,
		type: PropTypes.string.isRequired,
		reach: PropTypes.string,
		rc: PropTypes.string,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired,
	}).isRequired,
	button: PropTypes.element.isRequired,
	mod: PropTypes.element,
};
WeaponsTableRow.defaultProps = {
	mod: null,
};

export default WeaponsTableRow;
