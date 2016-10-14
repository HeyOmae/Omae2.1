'use strict';

import React from 'react';
import Modal from '../ModalComponent';
import FilterTable from '../FilterableTable';
import DisplayTable from '../DisplayTableComponent';

require('styles/gear/Weapons.scss');

let weaponData = require('json!../data/weapons.json');

class WeaponsComponent extends React.Component {
	componentWillMount() {
		let weaponsTableRow = {},
			weaponTable = [];

		const skipWeapons = ['Quality', 'Natural', 'Cyberweapon', 'Bio-Weapon', 'Cyber-Weapon', 'Underbarrel Weapons'],
			{purchaseGear} = this.props.actions;
		weaponData.forEach((weapon) => {
			if( skipWeapons.indexOf(weapon.category) > -1 ) {
				return;
			}
			if(!weaponsTableRow[weapon.category]) {
				weaponsTableRow[weapon.category] = [];
			}
			const purchaseButton = (
				<button
					className="btn btn-success"
					onClick={()=>{
						purchaseGear({gear: weapon, category: 'weapons'});
					}}
				>+</button>
			);
			weaponsTableRow[weapon.category].push(
					<WeaponsTableRow
						key={weapon.name}
						weapon={weapon}
						button={purchaseButton}
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
						<FilterTable
							tableData={{
								header: (<WeaponTableHeader
									reachCoil={reachCoil}/>),
								body: weaponsTableRow[category]
							}}/>
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
			purchased.forEach((weapon, index)=>{
				const sellButton = (
					<button
						className="btn btn-warning"
						onClick={
							() => {
								sellGear({index, category: 'weapons'});
							}
						}>
						-
					</button>
				);
				purchasedTableRow.push(
					<WeaponsTableRow
						key={weapon.name+'-purchased'}
						weapon={weapon}
						button={sellButton}
						/>
					);
			});
		}

		return (
			<div className="weapons-component">
				<h3>Weapons</h3>
				{this.weaponTable}
				{purchased?
				<DisplayTable
				header={<WeaponTableHeader
					reachCoil="Reach/RC"/>}
				body={purchasedTableRow}/>
				: null}
			</div>
		);
	}
}

const WeaponTableHeader = ({reachCoil}) => {
	return (
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
	);
};

const WeaponsTableRow = ({weapon, button}) => {
	return (
		<tr key={weapon.name}>
			<td>
				{button}
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
