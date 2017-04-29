import React from 'react';
import PropTypes from 'prop-types';
import armorData from '../../data/armor.json';
import Modal from '../ModalComponent';
import FilterTable from '../FilterableTable';
import DisplayTable from '../DisplayTableComponent';
import PropTypeChecking from '../../config/propTypeChecking';

class ArmorClass {
	constructor(armor) {
		if (armor.cost.search('Variable') > -1) {
			this.armor = {
				...armor,
				cost: armor.cost.match(/\d+/g)[0]
			};
		} else if (armor.cost.search('Rating') > -1) {
			this.armor = {
				...armor,
				currentRating: 1
			};
		} else {
			this.armor = armor;
		}
	}
	updateCost(cost) {
		this.armor = {
			...this.armor,
			cost: Math.ceil(cost)
		};
	}
	updateRating(rating) {
		const ratingNum = Number(rating);
		this.armor = {
			...this.armor,
			currentRating: ratingNum > 0 && ratingNum < this.armor.rating ? Math.floor(ratingNum) : 1
		};
	}
	getArmor() {
		return this.armor;
	}
}

class ArmorsComponent extends React.Component {
	componentWillMount() {
		const { purchaseGear } = this.props.actions;
		const armorRows = armorData.map((armor) => {
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
								purchaseGear({gear: armorGear.getArmor(), category: 'armors', Rating: armorGear.getArmor().currentRating});
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

function ArmorTableRow({armor, button, armorGear}) {
	return (
		<tr>
			<td>{button}</td>
			<td>{armor.name}</td>
			<td>{armor.armor}</td>
			<td><GearRatingComponent armorGear={armorGear} defaultValue={`${armor.currentRating || armor.armorcapacity}`} /></td>
			<td>{armor.avail}</td>
			<td><GearCostComponent cost={armor.cost} currentCost={armor.currentCost} armorGear={armorGear} /></td>
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
		armor: PropTypes.object.isRequired,
		updateCost: PropTypes.func.isRequired
	}),
	button: PropTypes.element.isRequired
};

ArmorTableRow.defaultProps = {
	armorGear: null
};

function GearRatingComponent({armorGear, defaultValue}) {
	if (armorGear && armorGear.getArmor().currentRating) {
		const armor = armorGear.getArmor();
		return (
			<input
				type="number"
				className="form-control"
				min={1}
				max={armor.rating}
				onChange={(e) => {
					armorGear.updateRating(e.target.value);
				}}
				placeholder={`1-${armor.rating}`} />
		);
	}

	return (
		<span>{defaultValue}</span>
	);
}

GearRatingComponent.propTypes = {
	armorGear: PropTypes.shape({
		armor: PropTypes.object.isRequired,
		updateRating: PropTypes.func.isRequired
	}),
	defaultValue: PropTypes.string.isRequired
};

GearRatingComponent.defaultProps = {
	armorGear: null
};

function GearCostComponent({cost, currentCost, armorGear}) {
	if (cost.search('Variable') > -1 && !currentCost) {
		const costRange = cost.match(/\d+/g);
		return (
			<input
				type="number"
				className="form-control"
				min={costRange[0]}
				max={costRange[1]}
				onChange={(e) => {
					armorGear.updateCost(e.target.value);
				}}
				placeholder={`${costRange[0]}-${costRange[1]}`} />
		);
	}
	return (
		<span>{currentCost || cost}&yen;</span>
	);
}

GearCostComponent.propTypes = {
	cost: PropTypes.string.isRequired,
	currentCost: PropTypes.number,
	armorGear: PropTypes.shape({
		armor: PropTypes.object.isRequired,
		updateCost: PropTypes.func.isRequired
	})
};

GearCostComponent.defaultProps = {
	currentCost: 0,
	armorGear: null
};

export default ArmorsComponent;
