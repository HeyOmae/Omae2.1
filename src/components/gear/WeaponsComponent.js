import React from 'react';
import Modal from '../ModalComponent';
import FilterTable from '../FilterableTable';
import DisplayTable from '../DisplayTableComponent';
import weaponData from '../data/weapons.json';
import weaponMods from '../data/weaponAccessories.json';
import PropTypeChecking from '../../config/propTypeChecking';

import '../../styles/gear/Weapons.scss';

class WeaponsComponent extends React.Component {
	componentWillMount() {
		const weaponsTableRow = {},
			weaponModLists = {
				slotless: []
			};

		const skipWeapons = ['Quality', 'Natural', 'Cyberweapon', 'Bio-Weapon', 'Cyber-Weapon', 'Underbarrel Weapons'],
			{purchaseGear} = this.props.actions;

		weaponMods.forEach((accessory) => {
			if (accessory.mount) {
				const modSlots = accessory.mount.split('/');
				modSlots.forEach((slot) => {
					if (!weaponModLists[slot]) {
						weaponModLists[slot] = [accessory];
					} else {
						weaponModLists[slot].push(accessory);
					}
				});
			} else {
				weaponModLists.slotless.push(accessory);
			}
		});

		weaponData.forEach((weapon) => {
			if (skipWeapons.indexOf(weapon.category) > -1) {
				return;
			}
			if (!weaponsTableRow[weapon.category]) {
				weaponsTableRow[weapon.category] = [];
			}
			const purchaseButton = (
				<button
					className="btn btn-success"
					onClick={() => {
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

		const weaponTable = Object.keys(weaponsTableRow).map((category) => {
			const reachCoil = weaponsTableRow[category][0].props.weapon.type === 'Melee' ? 'Reach' : 'RC';
			return (
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
		});

		this.weaponTable = weaponTable;
		this.weaponModLists = weaponModLists;
	}

	render() {
		const {purchased} = this.props,
			{sellGear} = this.props.actions,
			{weaponModLists, weaponTable} = this,
			purchasedTableRow = [];

		if (purchased) {
			purchased.forEach((weapon, index) => {
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
							modalID={`${weapon.name.replace(/\s/g, '') + index}-modal`}
							modalContent={
								<WeaponModTable
									weapon={weapon}
									weaponModLists={weaponModLists}/>
						}
					/>
					);
				purchasedTableRow.push(
					<WeaponsTableRow
						key={`${weapon.name + index}-purchased`}
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
				{weaponTable}
				{purchased ?
					<div className="table-responsive purchased-weapons">
						<DisplayTable
							header={<WeaponTableHeader
								buySell="Sell"
								reachCoil="Reach/RC"
								isModable/>}
							body={purchasedTableRow}/>
					</div>
					: null}
			</div>
		);
	}
}

WeaponsComponent.propTypes = {
	purchased: React.PropTypes.arrayOf(React.PropTypes.object),
	actions: PropTypeChecking.actions
};

// Helper function
function generateWeaponModOptions(weaponName, mountLoc, weaponModLists) {
	return (<td key={`${weaponName}--${mountLoc}`}>
		<select>
			<option value="">&mdash;</option>
			{weaponModLists[mountLoc].map((mod) => {
				return (<option key={`${weaponName}--${mountLoc}--${mod.name}`} value={mod.name}>{mod.name}</option>);
			})}
		</select>
	</td>);
}

// simple reusable components
function WeaponModTable({weapon, weaponModLists}) {
	const {mount} = weapon.accessorymounts,
		weaponModData = [],
		modHeader = mount.map((mountLocation) => {
			weaponModData.push(generateWeaponModOptions(weapon.name, mountLocation, weaponModLists));
			return <th key={`${weapon.name}-${mountLocation}`}>{mountLocation}</th>;
		});

	return (
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

WeaponModTable.propTypes = {
	weapon: React.PropTypes.shape({
		name: React.PropTypes.string.isRequired,
		accessorymounts: React.PropTypes.objectOf(React.PropTypes.arrayOf(React.PropTypes.string))
	}),
	weaponModLists: React.PropTypes.objectOf(
		React.PropTypes.arrayOf(React.PropTypes.object)
	)
};

function WeaponTableHeader({buySell = 'Buy', reachCoil, isModable}) {
	return (
		<tr>
			<th>{buySell}</th>
			{isModable ? <th>Mod</th> : <th>Name</th>}
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
			{mod ? <td>{mod}</td> : <td>{weapon.name}</td>}
			<td>{weapon.accuracy}</td>
			<td>{weapon.damage}</td>
			<td>{weapon.ap}</td>
			<td>{weapon.type === 'Melee' ? weapon.reach : weapon.rc}</td>
			<td>{weapon.avail}</td>
			<td>{weapon.cost}&yen;</td>
			<td>{weapon.source} p{weapon.page}</td>
		</tr>
	);
}

WeaponsComponent.displayName = 'GearWeaponsComponent';

// Uncomment properties you need
// WeaponsComponent.defaultProps = {};

export default WeaponsComponent;
