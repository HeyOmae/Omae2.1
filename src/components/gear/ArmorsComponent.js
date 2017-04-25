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
		this.armorRows = armorData.map((armor) => {
			return (
				<tr>
					<td>
						<button
							className="btn btn-success"
							onClick={() => {
								purchaseGear({gear: armor, category: 'armors'});
							}}
						>+
						</button>
					</td>
					<td>{armor.name}</td>
					<td>{armor.armor}</td>
					<td>{armor.armorcapacity}</td>
					<td>{armor.avail}</td>
					<td>{armor.cost} &yen;</td>
					<td>{armor.source} p{armor.page}</td>
				</tr>
			);
		});
	}

	render() {
		const {armorRows} = this;
		return (
			<table>
				<thead>
					<tr>
						<th>Buy</th>
						<th>Name</th>
						<th>Armor</th>
						<th>Capacity</th>
						<th>Avail</th>
						<th>&yen;</th>
						<th>Ref</th>
					</tr>
				</thead>
				<tbody>
					{armorRows}
				</tbody>
			</table>
		);
	}
}

ArmorsComponent.propTypes = {
	actions: PropTypeChecking.actions.isRequired
};

export default ArmorsComponent;
