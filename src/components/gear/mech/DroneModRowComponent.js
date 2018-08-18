import React from 'react';
import PropTypes from 'prop-types';

import { mechType, mechModType } from './mechPropTypes';

import VehicleModRow from './MechModRowComponent';
import SelectRating from '../SelectRatingComponent';

class DroneModRow extends VehicleModRow {
	render() {
		const { mod, selectedMod } = this.props;
		const checkboxLabelText = `mech-mod--checkbox--${mod.name.replace(' ', '-')}`;
		return (
			<tr>
				<td className="mech-mod--name">
					<input id={checkboxLabelText} type="checkbox" className="mech-mod--checkbox" onChange={this.toggleMod} checked={selectedMod} />
					<label htmlFor={checkboxLabelText}>{mod.name}</label>
				</td>
				<td className="mech-mod--rating">
					<SelectRating
						item={this.selectRating || mod}
						updateRating={this.updateRating}
						minRating={this.minRating}
					/>
				</td>
				<td className="mech-mod--slot">{this.displayStat(mod.slots)}</td>
				<td className="mech-mod--avail">{this.displayStat(mod.avail)}</td>
				<td className="mech-mod--cost">{this.displayStat(mod.cost)}&yen;</td>
				<td className="mech-mod--ref">{mod.source} {mod.page}p</td>
			</tr>
		);
	}
}

DroneModRow.propTypes = {
	mod: mechModType.isRequired,
	mechIndex: PropTypes.number.isRequired,
	mech: mechType.isRequired,
	modAction: PropTypes.func.isRequired,
	demodAction: PropTypes.func.isRequired,
	selectedMod: PropTypes.bool.isRequired,
};

export default DroneModRow;
