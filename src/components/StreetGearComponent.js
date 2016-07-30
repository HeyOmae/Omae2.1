'use strict';

import React from 'react';

require('styles//StreetGear.scss');

class StreetGearComponent extends React.Component {
	render() {
		return (
			<div className="streetgear-component">
				<h3>Melee Weapons</h3>
			</div>
		);
	}
}

StreetGearComponent.displayName = 'StreetGearComponent';

// Uncomment properties you need
// StreetGearComponent.propTypes = {};
// StreetGearComponent.defaultProps = {};

export default StreetGearComponent;
