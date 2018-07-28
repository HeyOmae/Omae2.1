import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { purchaseGear, sellGear, moddingVehicle, demoddingVehicle } from '../../../actions';

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
	constructor(props) {
		super(props);

		this.generatePurchasedMechs = this.generatePurchasedMechs.bind(this);

		this.modsToNotDisplay = ['Vehicle Weapon Mount', 'Model-Specific'];
	}

	componentWillMount() {
		this.modalContent = {};
	}

	generateMechMods(mech, mechIndex) {
		const { mechMods, demodAction, modAction } = this.props;
		return Object.keys(mechMods).reduce(
			(memo, modType) => {
				return this.modsToNotDisplay.indexOf(modType) !== -1 ? memo : [
					...memo,
					(
						<div key={modType}>
							<h4>{modType}</h4>
							<h5>Slots Left: {+mech.body - ((mech.mods[modType] && mech.mods[modType].currentSlot) || 0)}</h5>
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
											mechIndex={mechIndex}
											mech={mech}
											modAction={modAction}
											demodAction={demodAction}
											selectedMod={!!(mech.mods[mod.category] && mech.mods[mod.category][mod.name])}
										/>
									);
								})}
							</FilterableTable>
						</div>
					),
				];
			}, [],
		);
	}

	generateMechTable(mechsByType, typeName) {
		const {purchaseMechAction, classOfMechs} = this.props;
		return (
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
												category: classOfMechs,
											});
										}
									}
								>+</button>
							}
						/>
					);
				})}
			</FilterableTable>
		);
	}

	generatePurchasedMechs(mech, index) {
		const {classOfMechs, sellMechAction} = this.props;
		return (
			<MechRow
				key={`purchased-${classOfMechs}-${mech.name + index}`}
				mech={mech}
				mechButton={
					<button
						className="btn btn-warning"
						onClick={() => {
							sellMechAction({index, category: classOfMechs});
						}}
					>-</button>
				}
				mechMod={
					<ModalButton
						modalName={mech.name}
						modalContent={
							this.generateMechMods(mech, index)
						}
					/>
				}
			/>
		);
	}

	render() {
		const {classOfMechs, mechsByType, purchasedMech} = this.props;
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
									this.generateMechTable(mechsByType, typeName)
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
								{purchasedMech.map(this.generatePurchasedMechs)}
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
	mods: PropTypes.object,
});

MechComponent.propTypes = {
	classOfMechs: PropTypes.oneOf(['Vehicles', 'Drones']).isRequired,
	mechsByType: PropTypes.objectOf(
		PropTypes.arrayOf(mechType).isRequired,
	).isRequired,
	purchaseMechAction: PropTypes.func.isRequired,
	sellMechAction: PropTypes.func.isRequired,
	purchasedMech: PropTypes.arrayOf(mechType),
	modAction: PropTypes.func.isRequired,
	demodAction: PropTypes.func.isRequired,
	mechMods: PropTypes.objectOf(
		PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string.isRequired,
			rating: PropTypes.string.isRequired,
			slot: PropTypes.string,
			avail: PropTypes.string.isRequired,
			cost: PropTypes.string.isRequired,
			source: PropTypes.string.isRequired,
			page: PropTypes.string.isRequired,
		}).isRequired).isRequired,
	).isRequired,
};

MechComponent.defaultProps = {
	purchasedMech: null,
};

export {MechComponent};

export default connect(null, { purchaseMechAction: purchaseGear, sellMechAction: sellGear, modAction: moddingVehicle, demodAction: demoddingVehicle })(MechComponent);
