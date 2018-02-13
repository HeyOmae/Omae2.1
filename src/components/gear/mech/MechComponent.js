import React from 'react';
import PropTypes from 'prop-types';
import ModalButton from '../../ModalButtonComponent';
import FilterableTable from '../../FilterableTable';
import MechRow from './MechRowComponent';

class MechComponent extends React.Component {
	componentWillMount() {
		this.modalContent = {};
	}
	render() {
		const {classOfMechs, mechsByType} = this.props;
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
										header={
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
										}
									>
										{mechsByType[typeName].map((mech) => {
											return (
												<MechRow
													key={`${typeName}-${mech.name}`}
													mech={mech}
													mechButton={
														<button className="btn btn-success">+</button>
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
			</div>
		);
	}
}

MechComponent.propTypes = {
	classOfMechs: PropTypes.oneOf(['Vehicles', 'Drones']).isRequired,
	mechsByType: PropTypes.objectOf(
		PropTypes.arrayOf(PropTypes.shape({
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
		})).isRequired
	).isRequired
};

export default MechComponent;
