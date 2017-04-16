import React from 'react';
import PropTypes from 'prop-types';
import WeaponModsComponent from './WeaponModsComponent';
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
									reachCoil={reachCoil} />),
								body: weaponsTableRow[category]
							}} />
					}
				/>
			);
		});

		this.weaponTable = weaponTable;
		this.weaponModLists = weaponModLists;
	}

	render() {
		const {purchased} = this.props,
			{sellGear, weaponModding, moddingMulti} = this.props.actions,
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
					modButton = weapon.accessorymounts ?
						(<Modal
							modalName={weapon.name}
							modalID={`${weapon.name.replace(/\s/g, '') + index}-modal`}
							modalContent={
								<WeaponModsComponent
									index={index}
									weapon={weapon}
									weaponModLists={weaponModLists}
									weaponModding={weaponModding}
									moddingMulti={moddingMulti}
								/>
							}
						/>)
						: null;
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
			<div className="weapons-component row">
				{weaponTable}
				{purchased ?
					<div className="table-responsive purchased-weapons">
						<DisplayTable
							header={<WeaponTableHeader
								buySell="Sell"
								reachCoil="Reach/RC"
								isModable />}
							body={purchasedTableRow} />
					</div>
					: null}
			</div>
		);
	}
}

WeaponsComponent.propTypes = {
	purchased: PropTypes.arrayOf(PropTypes.object),
	actions: PropTypeChecking.actions.isRequired
};
WeaponsComponent.defaultProps = {
	purchased: null
};

function WeaponTableHeader({buySell, reachCoil, isModable}) {
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

WeaponTableHeader.propTypes = {
	buySell: PropTypes.string,
	reachCoil: PropTypes.string.isRequired,
	isModable: PropTypes.bool
};
WeaponTableHeader.defaultProps = {
	buySell: 'Buy',
	isModable: false
};

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
			<td>{weapon.currentCost || weapon.cost}&yen;</td>
			<td>{weapon.source} p{weapon.page}</td>
		</tr>
	);
}

WeaponsTableRow.propTypes = {
	weapon: PropTypes.shape({
		name: PropTypes.string.isRequired,
		accuracy: PropTypes.string.isRequired,
		damage: PropTypes.string.isRequired,
		ap: PropTypes.string,
		type: PropTypes.string.isRequired,
		reach: PropTypes.string,
		rc: PropTypes.string,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired
	}).isRequired,
	button: PropTypes.element.isRequired,
	mod: PropTypes.element
};
WeaponsTableRow.defaultProps = {
	mod: null
};

WeaponsComponent.displayName = 'GearWeaponsComponent';

export default WeaponsComponent;
