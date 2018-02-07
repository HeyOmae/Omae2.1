import React from 'react';
import PropTypes from 'prop-types';

const MechRowComponent = ({mech}) => {
	return (
		<tr>
			<td className="mech--buy">+</td>
			<td className="mech--name">{mech.name}</td>
			<td className="mech--handling">{mech.handling}</td>
			<td className="mech--accel">{mech.accel}</td>
			<td className="mech--body">{mech.body}</td>
			<td className="mech--armor">{mech.armor}</td>
			<td className="mech--pilot">{mech.pilot}</td>
			<td className="mech--sensor">{mech.sensor}</td>
			<td className="mech--cost">{mech.cost}</td>
			<td className="mech--ref">{mech.source} {mech.page}p</td>
		</tr>
	);
};

MechRowComponent.propTypes = {
	mech: PropTypes.shape({
		name: PropTypes.string.isRequired
	}).isRequired,
};

export default MechRowComponent;
