import React from 'react';
import PropTypes from 'prop-types';
import WeaponsComponent from './WeaponsComponent';
import priorityData from '../../data/priority.json';
import PropTypeChecking from '../../config/propTypeChecking';

import '../../styles/gear/StreetGear.scss';

class StreetGearComponent extends React.PureComponent {
	render() {
		const {actions, purchaseGear, resourcesPriority} = this.props;
		const nuyen = priorityData[resourcesPriority].resources;
		return (
			<div className="streetgear-component">
				<p>Nuyen: <strong>{nuyen - (purchaseGear.nuyen)}&yen;</strong></p>
				<h3>Weapons</h3>
				<WeaponsComponent
					actions={actions}
					purchased={purchaseGear.weapons} />
			</div>
		);
	}
}

StreetGearComponent.displayName = 'StreetGearComponent';

// Uncomment properties you need
StreetGearComponent.propTypes = {
	actions: PropTypeChecking.actions.isRequired,
	purchaseGear: PropTypeChecking.purchaseGear,
	resourcesPriority: PropTypes.string.isRequired
};
StreetGearComponent.defaultProps = {
	purchaseGear: null
};

export default StreetGearComponent;
