import React from 'react';
import PropTypes from 'prop-types';
import weaponData from 'data/weapons.json';
import weaponMods from 'data/weaponAccessories.json';
import 'styles/gear/Weapons.scss';
import WeaponModsComponent from './WeaponModsComponent';
import Modal from '../../ModalButtonComponent';
import FilterTable from '../../FilterableTable';
import DisplayTable from '../../DisplayTableComponent';
import PropTypeChecking from '../../../config/propTypeChecking';
import WeaponsTableRow from './WeaponDisplayTableRow';


class WeaponsComponent extends React.Component {
	componentWillMount() {
		const weaponModLists = {
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

		const weaponsTableRow = weaponData.reduce((tableRow, weapon) => {
			if (skipWeapons.indexOf(weapon.category) === -1) {
				const purchaseButton = (
					<button
						className="btn btn-success"
						onClick={() => {
							purchaseGear({gear: weapon, category: 'weapons'});
						}}
					>+</button>
				);
				return {
					...tableRow,
					[weapon.category]: [
						...(tableRow[weapon.category] || []),
						<WeaponsTableRow
							key={weapon.name}
							weapon={weapon}
							button={purchaseButton}
								/>
					]
				};
			}
			return tableRow;
		}, {});

		const weaponTable = Object.keys(weaponsTableRow).map((category) => {
			const {weapon} = weaponsTableRow[category][0].props,
				reachCoil = weapon.type === 'Melee' ? 'Reach' : 'RC';
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
			{sellGear, weaponModding, moddingMulti, demoddingMulti} = this.props.actions,
			{weaponModLists, weaponTable} = this;
		let purchasedTableRow = [];

		if (purchased) {
			purchasedTableRow = purchased.map((weapon, index) => {
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
									demoddingMulti={demoddingMulti}
								/>
							}
						/>)
						: null;
				return (
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
			<div className="weapons-component modal-thirds row">
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
			<th>Mode</th>
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

WeaponsComponent.displayName = 'GearWeaponsComponent';

export default WeaponsComponent;
