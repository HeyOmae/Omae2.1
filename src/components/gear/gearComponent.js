import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../ModalComponent';
import FilterTable from '../FilterableTable';
import DisplayTable from '../DisplayTableComponent';
import PropTypeChecking from '../../config/propTypeChecking';
import GearClass from './GearCreator';
import {GearRatingComponent, GearCostComponent} from './displayComponents';

class GearComponent extends React.Component {
	componentWillMount() {
		const { purchaseGear } = this.props.actions,
			{gearData} = this.props;

		const gearRows = gearData.map((gear) => {
			return (

			);
		});
	}
}

GearComponent.propTypes = {
	geatData: PropTypes.ObjectOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			category: PropTypes.string.isRequired,
			avail: PropTypes.string.isRequired,
			cost: PropTypes.string.isRequired,
			source: PropTypes.string.isRequired,
			page: PropTypes.string.isRequired,
		}).isRequired
	).isRequired
};

function GearTableRow({gear, button, gearGear, mod}) {
	return (
		<tr>
			<td>{button}</td>
			<td>{gear.name}</td>
			<td>{gear.gear}</td>
			<td><GearRatingComponent gear={gearGear} defaultValue={`${gear.currentRating || gear.gearcapacity}`} /></td>
			<td>{gear.avail}</td>
			<td><GearCostComponent cost={gear.cost} currentCost={gear.currentCost} gear={gearGear} /></td>
			<td>{gear.source} p{gear.page}</td>
		</tr>
	);
}

GearTableRow.propTypes = {
	gear: PropTypes.shape({
		name: PropTypes.string.isRequired,
		gear: PropTypes.string.isRequired,
		gearcapacity: PropTypes.string.isRequired,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired
	}).isRequired,
	gearGear: PropTypes.shape({
		gear: PropTypes.object.isRequired,
		updateCost: PropTypes.func.isRequired
	}),
	button: PropTypes.element.isRequired,
	mod: PropTypes.element
};


export default GearComponent;
