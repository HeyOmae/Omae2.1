'use strict';

import React from 'react';
import WeaponsComponent from './WeaponsComponent';

require('styles/gear/StreetGear.scss');

class StreetGearComponent extends React.Component {
	render() {
		return (
			<div className="streetgear-component">
				<WeaponsComponent />
			</div>
		);
	}
}

StreetGearComponent.displayName = 'StreetGearComponent';

// Uncomment properties you need
// StreetGearComponent.propTypes = {};
// StreetGearComponent.defaultProps = {};

export default StreetGearComponent;
