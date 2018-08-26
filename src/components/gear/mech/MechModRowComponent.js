import React from 'react';
import PropTypes from 'prop-types';

import { mechType, mechModType } from './mechPropTypes';

import SelectRating from '../SelectRatingComponent';

class MechModRowComponent extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			rating: 1,
		};

		const findMaxRating = {
			body({name}, {body: rating}) {
				return { name, rating};
			},
			Seats({name}, {seats: rating}) {
				return { name, rating };
			},
			default() {
				return undefined;
			},
		};

		this.selectRating = (findMaxRating[props.mod.rating] || findMaxRating.default)(props.mod, props.mech);

		this.evil = eval;

		this.updateRating = this.updateRating.bind(this);
		this.calculateStat = this.calculateStat.bind(this);
		this.fixedValues = this.fixedValues.bind(this);
		this.toggleMod = this.toggleMod.bind(this);

	}

	updateRating(event) {
		const { value } = event.target;

		this.setState({
			rating: +value,
		});
	}

	displayStat(stat) {
		if (/number/.test(stat)) {
			return this.conditionalValue(stat);
		} else if (/FixedValues/.test(stat)) {
			return this.fixedValues(stat);
		} else if (/Body/.test(stat)) {
			return this.calculateBody(stat);
		} else if (/Vehicle Cost/.test(stat)) {
			return this.evil(stat.replace('Vehicle Cost', this.props.mech.cost));
		} else if (/Range/.test(stat)) {
			return this.state.rating;
		} else if (/Rating/.test(stat)) {
			const replaceMatchs = {
				Rating: this.state.rating,
				R: '+"R"',
				F: '+"F"',
			};
			return this.evil(
				stat.replace(/Rating|R|F/g, (match) => {
					return replaceMatchs[match];
				}),
			);
		}

		return stat || 'N/A';
	}

	calculateBody(stat) {
		const {body: Body} = this.props.mech,
			{rating: Rating} = this.state,
			replaceTerm = {
				Body, Rating,
			};

		return this.evil(stat.replace(/Body|Rating/g, (match) => {
			return replaceTerm[match];
		}));
	}

	conditionalValue(stat) {
		/* eslint-disable no-unused-vars, no-eval */
		const number = Number;
		return eval(stat.replace(/Body/g, this.props.mech.body).replace('R', '+"R"'));
		/* eslint-enable */
	}

	fixedValues(stat) {
		if (/Accelaration/.test(stat)) {
			return this.calculateStat(stat, 'Acceleration', 'accel');
		} else if (/Handling/.test(stat)) {
			return this.calculateStat(stat, 'Handling', 'handling');
		} else if (/Speed/.test(stat)) {
			return this.calculateStat(stat, 'Speed', 'speed');
		} else if (/Body/.test(stat)) {
			return this.calculateStat(stat, 'Body', 'body');
		}
		const value = stat.match(/\d+\w*/g);
		return value[this.state.rating - 1];
	}

	calculateStat(stat, mechAttribute, attributeKey) {
		const regex = new RegExp(`${mechAttribute}\\s*\\*\\s*\\d+`, 'g'),
			value = stat.match(regex)[this.state.rating - 1],
			attribute = Math.max(...this.props.mech[attributeKey].match(/\d+/g));
		return this.evil(value.replace(mechAttribute, attribute));
	}

	toggleMod(e) {
		const {modAction, demodAction, mechIndex, mod} = this.props;

		if (e.target.checked) {
			modAction({
				index: mechIndex,
				category: 'Vehicles',
				mod: {
					...mod,
					currentCost: +this.displayStat(mod.cost),
					currentSlot: +this.displayStat(mod.slots),
				},
			});
		} else {
			demodAction({
				index: mechIndex,
				category: 'Vehicles',
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

MechModRowComponent.propTypes = {
	mod: mechModType.isRequired,
	mechIndex: PropTypes.number.isRequired,
	mech: mechType.isRequired,
	modAction: PropTypes.func.isRequired,
	demodAction: PropTypes.func.isRequired,
	selectedMod: PropTypes.bool.isRequired,
};

export default MechModRowComponent;
