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
		const {gearData, category, purchaseGear} = this.props;

		const gearRows = Object.keys(gearData).map((gearName) => {
			const gear = gearData[gearName],
				gearState = new GearClass(gear);
			return (
				<GearTableRow
					key={`gear-to-buy--${gear.name}`}
					gear={gear}
					gearState={gearState}
					button={
						<button
							className="btn btn-success"
							onClick={() => {
								purchaseGear({
									gear: gearState.getGear(),
									category,
									Rating: gearState.getGear().currentRating
								});
							}}
						>
							+
						</button>
					}
				/>
			);
		});

		this.gearModal = (
			<Modal
				modalName={category}
				modalContent={
					<FilterTable
						tableData={{
							header: <GearTableHeader />,
							body: gearRows
						}}
					/>
				}
			/>
		);
	}

	render() {
		
	}
}

GearComponent.propTypes = {
	gearData: PropTypes.ObjectOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			category: PropTypes.string.isRequired,
			avail: PropTypes.string.isRequired,
			cost: PropTypes.string.isRequired,
			source: PropTypes.string.isRequired,
			page: PropTypes.string.isRequired,
		}).isRequired
	).isRequired,
	category: PropTypes.string.isRequired,
	purchaseGear: PropTypes.func.isRequired
};

function GearTableHeader() {
	return (
		<tr>
			<th>Buy</th>
			<th>Name</th>
			<th>Rating</th>
			<th>Avail</th>
			<th>&yen;</th>
			<th>Ref</th>
		</tr>
	);
}

function GearTableRow({gear, button, gearState}) {
	return (
		<tr>
			<td>{button}</td>
			<td>{gear.name}</td>
			<td><GearRatingComponent gear={gearState} defaultValue={`${gear.currentRating || gear.gearcapacity}`} /></td>
			<td>{gear.avail}</td>
			<td><GearCostComponent cost={gear.cost} currentCost={gear.currentCost} gear={gearState} /></td>
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
	gearState: PropTypes.shape({
		gear: PropTypes.object.isRequired,
		updateCost: PropTypes.func.isRequired
	}),
	button: PropTypes.element.isRequired
};


export default GearComponent;
