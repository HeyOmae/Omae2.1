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
			<div>
				<h3>{classOfMechs}</h3>
				{ Object.keys(mechsByType).map((typeName) => {
					return (
						<ModalButton
							key={`${classOfMechs}-${typeName}`}
							modalName={typeName}
							modalContent={
								<FilterableTable
									header={
										<th>
											<td>Name</td>
											<td>Handling</td>
											<td>Accel</td>
											<td>Body</td>
											<td>Armor</td>
											<td>Pilot</td>
											<td>Sensor</td>
											<td>Cost</td>
											<td>Ref</td>
										</th>
									}
								>
									{mechsByType[typeName].map((mech) => {
										return (
											<MechRow
												key={`${typeName}-${mech.name}`}
												mech={mech}
												button={
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
