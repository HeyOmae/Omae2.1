import React from 'react';
import PropTypes from 'prop-types';

import { mechType, mechModType } from './mechPropTypes';

import VehicleModRow from './MechModRowComponent';
import SelectRating from '../SelectRatingComponent';

class DroneModRow extends VehicleModRow {
	constructor(props) {
		super(props);

		const calculatRatingLimits = (name, baseStat, modifyBaseBy = 1) => {
				this.minRating = baseStat ? baseStat + modifyBaseBy : 1;
				return { name, rating: (baseStat * 2 || 1)};
			},
			findRatingLimits = {
				'Handling (Drone)': ({name}, {handling}) => {
					const handlingMaxValue = Math.max(...handling.match(/\d+/g));
					return calculatRatingLimits(name, +handlingMaxValue);
				},
				'Speed (Drone)': ({name}, {speed}) => {
					return calculatRatingLimits(name, +speed);
				},
				'Acceleration (Drone)': ({name}, {accel}) => {
					return calculatRatingLimits(name, +accel);
				},
				'Sensor (Drone)': ({name}, {sensor}) => {
					const baseStat = +sensor,
						rating = baseStat * 2;
					this.minRating = baseStat + 1;
					return { name, rating: rating > 8 ? 8 : rating };
				},
				'Armor (Drone)': ({name}, {armor}) => {
					return calculatRatingLimits(name, +armor, 3);
				},
				default() {
					return undefined;
				},
			};

		this.selectRating = (findRatingLimits[props.mod.name] || findRatingLimits.default)(props.mod, props.mech);

		if (/Variable/.test(props.mod.cost)) {
			const minMax = props.mod.cost.match(/\d+/g);

			this.variableCost = {
				min: +minMax[0],
				max: +minMax[1],
			};
		}

		this.state = {
			rating: this.minRating || 1,
			cost: '',
		};

		this.calculateDroneSlots = this.calculateDroneSlots.bind(this);
		this.changeCost = this.changeCost.bind(this);
	}

	calculateDroneSlots(slotValue) {
		return this.minRating ? this.state.rating - this.minRating : this.displayStat(slotValue);
	}

	changeCost({target}) {
		const value = +target.value,
			{ max} = this.variableCost;
		this.setState({
			cost: value > max ? max : value,
		});
	}

	toggleMod(e) {
		const {modAction, demodAction, mechIndex, mod} = this.props;

		const cost = this.variableCost && this.state.cost < this.variableCost.min ?
			this.variableCost.min
			:
			this.state.cost;

		if (e.target.checked) {
			modAction({
				index: mechIndex,
				category: 'Drones',
				mod: {
					...mod,
					currentCost: this.variableCost ?
						cost
						:
						+this.displayStat(mod.cost),
					currentSlot: +this.calculateDroneSlots(mod.slots),
					...(
						mod.rating === '0' ?
							{}
							:
							{currentRating: this.state.rating}
					),
				},
			});
		} else {
			demodAction({
				index: mechIndex,
				category: 'Drones',
				demodName: mod.name,
				type: mod.category,
			});
		}
	}

	render() {
		const { mod, selectedMod } = this.props;
		const checkboxLabelText = `mech-mod--checkbox--${mod.name.replace(' ', '-')}`;

		return (
			<tr>
				<td className="mech-mod--name">
					<input
						id={checkboxLabelText}
						type="checkbox"
						className="mech-mod--checkbox"
						onChange={this.toggleMod}
						checked={selectedMod}
					/>
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
				<td className="mech-mod--cost">{
					this.variableCost ?
						<input
							type="text"
							onChange={this.changeCost}
							value={this.state.cost}
							placeholder={`${this.variableCost.min}-${this.variableCost.max}¥`}
						/>
					:
						`${this.displayStat(mod.cost)}¥`
				}</td>
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
