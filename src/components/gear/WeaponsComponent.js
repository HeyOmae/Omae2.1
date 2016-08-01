'use strict';

import React from 'react';

require('styles/gear/Weapons.scss');

let weaponData = require('json!../data/weapons.json');

class WeaponsComponent extends React.Component {
	render() {
		let weapons = {};
		weaponData.forEach((weapon) => {
			if(!weapons[weapon.category])
				weapons[weapon.category] = [];
			weapons[weapon.category].push(weapon);
		});
		console.log(weapons);
		return (
			<div className="weapons-component">
				Please edit src/components/gear//WeaponsComponent.js to update this component!
			</div>
		);
	}
}

WeaponsComponent.displayName = 'GearWeaponsComponent';

// Uncomment properties you need
// WeaponsComponent.propTypes = {};
// WeaponsComponent.defaultProps = {};

export default WeaponsComponent;
