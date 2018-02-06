import React from 'react';
import PropTypes from 'prop-types';

const MechRowComponent = ({mech}) => {
	return (
		<tr>
			<td className="mech--buy">+</td>
			<td className="mech--name">{mech.name}</td>
		</tr>
	);
};

MechRowComponent.propTypes = {
	mech: PropTypes.shape({
		name: PropTypes.string.isRequired
	}).isRequired,
};

export default MechRowComponent;
