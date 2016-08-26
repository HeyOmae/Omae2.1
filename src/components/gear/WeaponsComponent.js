'use strict';

import React from 'react';
import Modal from '../ModalComponent';

require('styles/gear/Weapons.scss');

let weaponData = require('json!../data/weapons.json');

class WeaponsComponent extends React.Component {
	componentWillMount() {
		let weaponsTableRow = {},
			weaponTable = [];

		const skipWeapons = ['Quality', 'Natural', 'Cyberweapon', 'Bio-Weapon', 'Cyber-Weapon'],
			{purchaseGear} = this.props.actions;
		weaponData.forEach((weapon) => {
			if( skipWeapons.indexOf(weapon.category) > -1 ) {
				return;
			}
			if(!weaponsTableRow[weapon.category]) {
				weaponsTableRow[weapon.category] = [];
			}
			weaponsTableRow[weapon.category].push(
					<WeaponsTableRow
						key={weapon.name}
						weapon={weapon}
						purchaseGear={purchaseGear}
						/>
				);
		});

		for(let category in weaponsTableRow) {
			const reachCoil = weaponsTableRow[category][0].props.weapon.type === 'Melee'? 'Reach' : 'RC';
			weaponTable.push(
				<Modal
					key={category}
					modalName={category}
					modalContent={
						<div className="table-responsive">
							<table className="table">
								<WeaponTableHeader
									reachCoil={reachCoil}/>
								<tbody>{weaponsTableRow[category]}</tbody>
							</table>
						</div>
					}
				/>
				);
		}
		this.weaponTable = weaponTable;
	}
	render() {
		const {purchased} = this.props,
		{sellGear} = this.props.actions,
		purchasedTableRow = [];

		if(purchased) {
			purchased.forEach((weapon)=>{
				purchasedTableRow.push(
					<WeaponsTableRow
						key={weapon.name+'-purchased'}
						weapon={weapon}
						purchaseGear={sellGear}
						/>
					);
			});
		}

		return (
			<div className="weapons-component">
				<h3>Weapons</h3>
				{this.weaponTable}
				<div className="table-responsive">
					<table className="table">
						<WeaponTableHeader
							reachCoil="Reach/RC"/>
						<tbody>
							{purchasedTableRow}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const WeaponTableHeader = ({reachCoil}) => {
	return (
		<thead>
			<tr>
				<th>Buy</th>
				<th>Name</th>
				<th>Acc</th>
				<th>Dam</th>
				<th>AP</th>
				<th>{reachCoil}</th>
				<th>Avail</th>
				<th>&yen;</th>
				<th>Ref</th>
			</tr>
		</thead>
	);
};

const WeaponsTableRow = ({weapon, purchaseGear}) => {
	return (
		<tr key={weapon.name}>
			<td>
				<button
					className="btn btn-success"
					onClick={()=>{
						purchaseGear({gear: weapon, category: 'weapons'});
					}}
				>+</button>
			</td>
			<td>{weapon.name}</td>
			<td>{weapon.accuracy}</td>
			<td>{weapon.damage}</td>
			<td>{weapon.ap}</td>
			<td>{weapon.type === 'Melee'? weapon.reach : weapon.rc}</td>
			<td>{weapon.avail}</td>
			<td>{weapon.cost}&yen;</td>
			<td>{weapon.source} p{weapon.page}</td>
		</tr>
	);
};

WeaponsComponent.displayName = 'GearWeaponsComponent';

// Uncomment properties you need
// WeaponsComponent.propTypes = {};
// WeaponsComponent.defaultProps = {};

export default WeaponsComponent;
