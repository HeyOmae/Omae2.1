import React from 'react';
import PropTypes from 'prop-types';
import armorData from 'data/armor.json';
import Modal from '../../ModalButtonComponent';
import ArmorMods from './ArmorModsComponent';
import FilterTable from '../../FilterableTable';
import DisplayTable from '../../DisplayTableComponent';
import PropTypeChecking from '../../../config/propTypeChecking';
import ArmorClass from '../GearCreator';
import {GearRatingComponent, GearCostComponent} from '../displayComponents';

class ArmorsComponent extends React.PureComponent {
	componentWillMount() {
		const { purchaseGear } = this.props.actions,
			armorRows = armorData.map((armor) => {
				const armorGear = new ArmorClass(armor);
				return (
					<ArmorTableRow
						key={`armor-to-buy--${armor.name}`}
						armor={armor}
						armorGear={armorGear}
						button={
							<button
								className="btn btn-success"
								onClick={() => {
									purchaseGear({gear: armorGear.getGear(), category: 'armors', Rating: armorGear.getGear().currentRating});
								}}
							>
								+
							</button>
					} />
				);
			});

		this.armorModal = (
			<Modal
				modalName="Armor"
				modalContent={
					<FilterTable
						tableData={{
							header: <ArmorTableHeader />,
							body: armorRows
						}} />
				} />
		);
	}

	render() {
		const {armorModal} = this,
			{ purchased, actions } = this.props;

		const purchasedTableRow = purchased ?
			purchased.map((armor, index) => {
				return (
					<ArmorTableRow
						key={`${armor.name + index}-purchased`}
						armor={armor}
						mod={
							<Modal
								modalName={armor.name}
								modalContent={
									<ArmorMods
										index={index}
									/>
								} />
						}
						button={
							<button
								className="btn btn-warning"
								onClick={() => {
									actions.sellGear({index, category: 'armors'});
								}}
							>
								-
							</button>
					} />
				);
			})
			: null;
		return (
			<div className="armor-component row">
				{armorModal}
				{purchased ?
					<div className="table-responsive purchased-armors">
						<DisplayTable
							header={<ArmorTableHeader />}
							body={purchasedTableRow} />
					</div>
					: null}
			</div>
		);
	}
}

ArmorsComponent.propTypes = {
	actions: PropTypeChecking.actions.isRequired,
	purchased: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		armor: PropTypes.string.isRequired,
		armorcapacity: PropTypes.string.isRequired,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired
	}))
};

ArmorsComponent.defaultProps = {
	purchased: null
};

function ArmorTableHeader() {
	return (
		<tr>
			<th>Buy</th>
			<th>Name</th>
			<th>Armor</th>
			<th>Capacity</th>
			<th>Avail</th>
			<th>&yen;</th>
			<th>Ref</th>
		</tr>
	);
}

function ArmorTableRow({armor, button, armorGear, mod}) {
	return (
		<tr>
			<td>{button}</td>
			<td>{mod || armor.name}</td>
			<td>{armor.armor}</td>
			<td><GearRatingComponent gear={armorGear} defaultValue={`${armor.currentRating || armor.armorcapacity}`} /></td>
			<td>{armor.avail}</td>
			<td><GearCostComponent cost={armor.cost} currentCost={armor.currentCost} gear={armorGear} /></td>
			<td>{armor.source} p{armor.page}</td>
		</tr>
	);
}

ArmorTableRow.propTypes = {
	armor: PropTypes.shape({
		name: PropTypes.string.isRequired,
		armor: PropTypes.string.isRequired,
		armorcapacity: PropTypes.string.isRequired,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired
	}).isRequired,
	armorGear: PropTypes.shape({
		gear: PropTypes.object.isRequired,
		updateCost: PropTypes.func.isRequired
	}),
	button: PropTypes.element.isRequired,
	mod: PropTypes.element
};

ArmorTableRow.defaultProps = {
	armorGear: null,
	mod: null
};

export default ArmorsComponent;
