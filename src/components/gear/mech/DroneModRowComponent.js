import React from 'react';
import PropTypes from 'prop-types';

import { mechType, mechModType } from './mechPropTypes';

import VehicleModRow from './MechModRowComponent';
import SelectRating from '../SelectRatingComponent';

class DroneModRow extends VehicleModRow {
	constructor(props) {
		super(props);

		const findMaxRating = {
			'Handling (Drone)': ({name}, {handling}) => {
				const baseStat = +handling;
				this.minRating = baseStat + 1;
				return { name, rating: baseStat * 2};
			},
			'Speed (Drone)': ({name}, {speed}) => {
				const baseStat = +speed;
				this.minRating = baseStat + 1;
				return { name, rating: baseStat * 2};
			},
			default() {
				return undefined;
			},
		};

		this.selectRating = (findMaxRating[props.mod.name] || findMaxRating.default)(props.mod, props.mech);

		this.state = {
			rating: this.minRating || 1,
		};

		this.calculateDroneSlots = this.calculateDroneSlots.bind(this);
	}

	calculateDroneSlots(slotValue) {
		return this.minRating ? this.state.rating - this.minRating : this.displayStat(slotValue);
	}

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
				<td className="mech-mod--slot">{this.calculateDroneSlots(mod.slots)}</td>
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
