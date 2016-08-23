'use strict';

import React from 'react';
import WeaponsComponent from './WeaponsComponent';

require('styles/gear/StreetGear.scss');

class StreetGearComponent extends React.Component {
	render() {
        const {actions, purchaseGear} = this.props;
		return (
			<div className="streetgear-component">
				<WeaponsComponent
                    actions={actions}
                    purchased={purchaseGear.weapons}/>
			</div>
		);
	}
}

StreetGearComponent.displayName = 'StreetGearComponent';

// Uncomment properties you need
// StreetGearComponent.propTypes = {};
// StreetGearComponent.defaultProps = {};

export default StreetGearComponent;
