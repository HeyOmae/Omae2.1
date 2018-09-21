import React from 'react';
import PropTypes from 'prop-types';

const MechDataCell = ({statName, stat, currentStat}) => {
	return (
		<td className={`mech--${statName}`}>
			{stat}{currentStat && `(${currentStat})`}
		</td>
	);
};

MechDataCell.propTypes = {
	statName: PropTypes.string.isRequired,
	stat: PropTypes.string.isRequired,
	currentStat: PropTypes.number,
};

MechDataCell.defaultProps = {
	currentStat: null,
};

const MechRowComponent = ({mech, mechButton, mechMod}) => {
	return (
		<tr>
			<td className="mech--buy">
				{mechButton}
			</td>
			<td className="mech--name">{mechMod || mech.name}</td>
			<MechDataCell statName="handling" stat={mech.handling} currentStat={mech.currentHandling} />
			<MechDataCell statName="accel" stat={mech.accel} currentStat={mech.currentAccel} />
			<MechDataCell statName="body" stat={mech.body} currentStat={mech.currentBody} />
			<MechDataCell statName="armor" stat={mech.armor} currentStat={mech.currentArmor} />
			<MechDataCell statName="pilot" stat={mech.pilot} currentStat={mech.currentPilot} />
			<MechDataCell statName="sensor" stat={mech.sensor} currentStat={mech.currentSensor} />
			<td className="mech--avail">{mech.avail}</td>
			<td className="mech--cost">{mech.currentCost || mech.cost}&yen;</td>
			<td className="mech--ref">{mech.source} {mech.page}p</td>
		</tr>
	);
};

MechRowComponent.propTypes = {
	mech: PropTypes.shape({
		name: PropTypes.string.isRequired,
		handling: PropTypes.string.isRequired,
		accel: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
		armor: PropTypes.string.isRequired,
		pilot: PropTypes.string.isRequired,
		sensor: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired,
	}).isRequired,
	mechButton: PropTypes.node.isRequired,
	mechMod: PropTypes.node,
};

MechRowComponent.defaultProps = {
	mechMod: null,
};

export default MechRowComponent;
