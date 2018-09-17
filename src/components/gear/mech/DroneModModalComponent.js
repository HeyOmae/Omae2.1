import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { moddingDrone, demoddingDrone } from '../../../actions';

import {mechType, mechModType} from './mechPropTypes';

import FilterableTable from '../../FilterableTable';
import MechModRow from './DroneModRowComponent';

const DroneModModalComponent = ({modType, mech, mechMods, mechIndex, modAction, demodAction}) => {
	return (
		<div>
			<h4>{modType}</h4>
			<h5>Slots Left: {+mech.body - ((mech.currentSlot) || 0)}</h5>
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
							selectedMod={!!(mech.mods && mech.mods[mod.name])}
						/>
					);
				})}
			</FilterableTable>
		</div>
	);
};

DroneModModalComponent.propTypes = {
	modType: PropTypes.string.isRequired,
	mech: mechType.isRequired,
	mechMods: PropTypes.objectOf(
		PropTypes.arrayOf(mechModType).isRequired,
	).isRequired,
	mechIndex: PropTypes.number.isRequired,
	modAction: PropTypes.func.isRequired,
	demodAction: PropTypes.func.isRequired,
};

export default connect(null, {modAction: moddingDrone, demodAction: demoddingDrone})(DroneModModalComponent);
