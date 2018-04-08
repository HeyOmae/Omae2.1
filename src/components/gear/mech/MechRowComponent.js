import React from 'react';
import PropTypes from 'prop-types';

const MechRowComponent = ({mech, mechButton, mechMod}) => {
	return (
		<tr>
			<td className="mech--buy">
				{mechButton}
			</td>
			<td className="mech--name">{mechMod || mech.name}</td>
			<td className="mech--handling">{mech.handling}</td>
			<td className="mech--accel">{mech.accel}</td>
			<td className="mech--body">{mech.body}</td>
			<td className="mech--armor">{mech.armor}</td>
			<td className="mech--pilot">{mech.pilot}</td>
			<td className="mech--sensor">{mech.sensor}</td>
			<td className="mech--cost">{mech.cost}&yen;</td>
			<td className="mech--ref">{mech.source} {mech.page}p</td>
		</tr>
	);
};

MechRowComponent.propTypes = {
	mech: PropTypes.shape({
		name: PropTypes.string.isRequired,
		handling: PropTypes.string.isRequired,
		accel: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
		armor: PropTypes.string.isRequired,
		pilot: PropTypes.string.isRequired,
		sensor: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired,
	}).isRequired,
	mechButton: PropTypes.node.isRequired,
	mechMod: PropTypes.node,
};

MechRowComponent.defaultProps = {
	mechMod: null,
};

export default MechRowComponent;
