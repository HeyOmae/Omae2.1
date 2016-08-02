'use strict';

import React from 'react';

require('styles/gear/Weapons.scss');

let weaponData = require('json!../data/weapons.json');

class WeaponsComponent extends React.Component {
	render() {
		let weaponsTableRow = {},
			weaponTable = [];
		weaponData.forEach((weapon) => {
			if(!weaponsTableRow[weapon.category]) {
				weaponsTableRow[weapon.category] = [];
			}
			weaponsTableRow[weapon.category].push(
					<tr key={weapon.name}>
						<td>
							<button
								className="btn btn-success"
								onClick={()=>{
									console.log(weapon);
								}}
							>+</button>
						</td>
						<td>{weapon.name}</td>
						<td>{weapon.accuracy}</td>
						<td>{weapon.damage}</td>
						<td>{weapon.ap}</td>
						<td>{weapon.type === 'Melee'? weapon.reach : weapon.rc}</td>
						<td>{weapon.avail}</td>
						<td>{weapon.cost}</td>
						<td>{weapon.source} p{weapon.page}</td>
					</tr>
				);
		});

		for(let category in weaponsTableRow) {
			weaponTable.push(
				<div key={category} className="table-responsive">
					<h3>{category}</h3>
					<table className="table">
						<tbody>{weaponsTableRow[category]}</tbody>
					</table>
				</div>
				);
		}

		console.log(weaponsTableRow);
		return (
			<div className="weapons-component">
				{weaponTable}
			</div>
		);
	}
}

WeaponsComponent.displayName = 'GearWeaponsComponent';

// Uncomment properties you need
// WeaponsComponent.propTypes = {};
// WeaponsComponent.defaultProps = {};

export default WeaponsComponent;
