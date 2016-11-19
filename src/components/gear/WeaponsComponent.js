'use strict';

import React from 'react';
import Modal from '../ModalComponent';
import FilterTable from '../FilterableTable';
import DisplayTable from '../DisplayTableComponent';

require('styles/gear/Weapons.scss');

const weaponData = require('json!../data/weapons.json'),
	weaponMods = require('json!../data/weaponAccessories.json');

class WeaponsComponent extends React.Component {
	componentWillMount() {
		let weaponsTableRow = {},
			weaponTable = [],
			weaponModLists = {
				slotless: []
			};

		weaponMods.forEach((accessory)=> {
			if(accessory.mount) {
				let modSlots = accessory.mount.split('/');
				modSlots.forEach((slot) => {
					if(!weaponModLists[slot]) {
						weaponModLists[slot] = [accessory];
					} else {
						weaponModLists[slot].push(accessory);
					}
				});
			} else {
				weaponModLists.slotless.push(accessory);
			}
		});

		this.weaponModLists = weaponModLists;

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
				),
				modButton = (
					<Modal
						modalName={weapon.name}
						modalID={weapon.name.replace(/\s/g, '') + index + '-modal'}
						modalContent={
							<WeaponModTable
								weapon={weapon}
								weaponModLists={this.weaponModLists}/>
						}
					/>
					);
				purchasedTableRow.push(
					<WeaponsTableRow
						key={weapon.name+ index +'-purchased'}
						weapon={weapon}
						button={sellButton}
						mod={modButton}
						/>
					);
			});
		}

		return (
			<div className="weapons-component">
				<h3>Weapons</h3>
				{this.weaponTable}
				{purchased?
					<div className="table-responsive purchased-weapons">
						<DisplayTable
							header={<WeaponTableHeader
								buySell="Sell"
								reachCoil="Reach/RC"
								isModable={true}/>}
							body={purchasedTableRow}/>
					</div>
					: null}
			</div>
		);
	}
}

// simple reusable components

function WeaponModTable({weapon, weaponModLists}) {
	const {mount} = weapon.accessorymounts,
		weaponModData = [],
		modHeader = mount.map((mountLocation) => {
			weaponModData.push(generateWeaponModOptions(weapon.name+'-mod-'+mountLocation));
			return <th key={weapon.name+'-'+mountLocation}>{mountLocation}</th>;
		});

	function generateWeaponModOptions(key) {
		return (<td key={key}><select>
					<option value="taco">taco</option>
				</select></td>);
	}

	return(
		<DisplayTable
			header={<tr>
						{modHeader}
					</tr>}
			body={<tr>
					{weaponModData}
				</tr>}
			/>
	);
}

function WeaponTableHeader({buySell='Buy', reachCoil, isModable}) {
	return (
		<tr>
			<th>{buySell}</th>
			{isModable? <th>Mod</th> : <th>Name</th>}
			<th>Acc</th>
			<th>Dam</th>
			<th>AP</th>
			<th>{reachCoil}</th>
			<th>Avail</th>
			<th>&yen;</th>
			<th>Ref</th>
		</tr>
	);
}

function WeaponsTableRow({weapon, button, mod}) {
	return (
		<tr key={weapon.name}>
			<td>{button}</td>
			{mod? <td>{mod}</td>: <td>{weapon.name}</td>}
			<td>{weapon.accuracy}</td>
			<td>{weapon.damage}</td>
			<td>{weapon.ap}</td>
			<td>{weapon.type === 'Melee'? weapon.reach : weapon.rc}</td>
			<td>{weapon.avail}</td>
			<td>{weapon.cost}&yen;</td>
			<td>{weapon.source} p{weapon.page}</td>
		</tr>
	);
}

WeaponsComponent.displayName = 'GearWeaponsComponent';

// Uncomment properties you need
// WeaponsComponent.propTypes = {};
// WeaponsComponent.defaultProps = {};

export default WeaponsComponent;
