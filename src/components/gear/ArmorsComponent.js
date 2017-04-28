import React from 'react';
import PropTypes from 'prop-types';
import armorData from '../../data/armor.json';
import Modal from '../ModalComponent';
import FilterTable from '../FilterableTable';
import DisplayTable from '../DisplayTableComponent';
import PropTypeChecking from '../../config/propTypeChecking';

class ArmorsComponent extends React.Component {
	componentWillMount() {
		const { purchaseGear } = this.props.actions;
		const armorRows = armorData.map((armor) => {
			return (
				<ArmorTableRow
					armor={armor}
					button={
						<button
							className="btn btn-success"
							onClick={() => {
								purchaseGear({gear: armor, category: 'armors'});
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
							header: (
								<tr>
									<th>Buy</th>
									<th>Name</th>
									<th>Armor</th>
									<th>Capacity</th>
									<th>Avail</th>
									<th>&yen;</th>
									<th>Ref</th>
								</tr>
							),
							body: armorRows
						}} />
				} />
		);
	}

	render() {
		const {armorModal} = this;
		return (
			<div className="armor-component row">
				{armorModal}
			</div>
		);
	}
}

ArmorsComponent.propTypes = {
	actions: PropTypeChecking.actions.isRequired
};

function ArmorTableRow({armor, button}) {
	return (
		<tr>
			<td>{button}</td>
			<td>{armor.name}</td>
			<td>{armor.armor}</td>
			<td>{armor.armorcapacity}</td>
			<td>{armor.avail}</td>
			<td>{armor.cost} &yen;</td>
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
	button: PropTypes.element.isRequired
};

export default ArmorsComponent;
