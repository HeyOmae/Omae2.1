import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { purchaseGear } from '../../../actions';

import ModalButton from '../../ModalButtonComponent';
import FilterableTable from '../../FilterableTable';
import DisplayTable from '../../DisplayTableComponent';
import MechRow from './MechRowComponent';
import MechModRow from './MechModRowComponent';

const MechHeader = () => {
	return (
		<tr>
			<th>Buy</th>
			<th>Name</th>
			<th>Handling</th>
			<th>Accel</th>
			<th>Body</th>
			<th>Armor</th>
			<th>Pilot</th>
			<th>Sensor</th>
			<th>Cost</th>
			<th>Ref</th>
		</tr>
	);
};

class MechComponent extends React.Component {
	componentWillMount() {
		this.modalContent = {};
	}
	render() {
		const {classOfMechs, mechsByType, purchaseMechAction, purchasedMech, mechMods} = this.props;
		return (
			<div className="row">
				<div className="col">
					<h3>{classOfMechs}</h3>
					{ Object.keys(mechsByType).map((typeName) => {
						return (
							<ModalButton
								key={`${classOfMechs}-${typeName}`}
								modalName={typeName}
								modalContent={
									<FilterableTable
										header={<MechHeader />}
									>
										{mechsByType[typeName].map((mech) => {
											return (
												<MechRow
													key={`${typeName}-${mech.name}-${mech.source}`}
													mech={mech}
													mechButton={
														<button
															className="btn btn-success"
															onClick={
																() => {
																	purchaseMechAction({
																		gear: mech,
																		category: classOfMechs
																	});
																}
															}
														>+</button>
													}
												/>
											);
										})}
									</FilterableTable>
								}
							/>
						);
					}) }
				</div>
				{purchasedMech &&
					(
						<div className="col mech-purchared">
							<DisplayTable
								header={<MechHeader />}
							>
								{
									purchasedMech.map((mech, index) => {
										return (
											<MechRow
												key={`purchased-${classOfMechs}-${mech.name + index}`}
												mech={mech}
												mechButton={
													<button
														className="btn btn-warning"
														onClick={() => {
															this.actions.sellGear({index, category: classOfMechs});
														}}
													>-</button>
												}
												mechMod={
													<ModalButton
														modalName={mech.name}
														modalContent={
															Object.keys(mechMods).map((modType) => {
																return (
																	<div key={modType}>
																		<h4>{modType}</h4>
																		<FilterableTable
																			header={
																				<tr>
																					<th>Name</th>
																					<th>Rating</th>
																					<th>Slot</th>
																					<th>Avail</th>
																					<th>Cost</th>
																					<th>Ref</th>
																				</tr>
																			}
																		>
																			{mechMods[modType].map((mod) => {
																				return (
																					<MechModRow
																						key={`${mech.name}--${modType}-${mod.name}`}
																						mod={mod}
																						mech={mech}
																					/>
																				);
																			})}
																		</FilterableTable>
																	</div>
																);
															})
														}
													/>
												}
											/>
										);
									})
								}
							</DisplayTable>
						</div>
					)
				}
			</div>
		);
	}
}

const mechType = PropTypes.shape({
	name: PropTypes.string.isRequired,
	page: PropTypes.string.isRequired,
	source: PropTypes.string.isRequired,
	accel: PropTypes.string.isRequired,
	armor: PropTypes.string.isRequired,
	avail: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	cost: PropTypes.string.isRequired,
	handling: PropTypes.string.isRequired,
	pilot: PropTypes.string.isRequired,
	sensor: PropTypes.string.isRequired,
	speed: PropTypes.string.isRequired,
});

MechComponent.propTypes = {
	classOfMechs: PropTypes.oneOf(['Vehicles', 'Drones']).isRequired,
	mechsByType: PropTypes.objectOf(
		PropTypes.arrayOf(mechType).isRequired
	).isRequired,
	purchaseMechAction: PropTypes.func.isRequired,
	purchasedMech: PropTypes.arrayOf(mechType),
	mechMods: PropTypes.objectOf(
		PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string.isRequired,
			rating: PropTypes.string.isRequired,
			slot: PropTypes.string,
			avail: PropTypes.string.isRequired,
			cost: PropTypes.string.isRequired,
			source: PropTypes.string.isRequired,
			page: PropTypes.string.isRequired
		}).isRequired).isRequired
	).isRequired
};

MechComponent.defaultProps = {
	purchasedMech: null
};

export {MechComponent};

export default connect(null, {purchaseMechAction: purchaseGear})(MechComponent);
