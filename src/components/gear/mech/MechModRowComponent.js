import React from 'react';
import PropTypes from 'prop-types';

import SelectRating from '../SelectRatingComponent';

class MechModRowComponent extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			rating: 1
		};
		this.evil = eval;

		this.updateRating = this.updateRating.bind(this);
		this.calculateStat = this.calculateStat.bind(this);
		this.fixedValues = this.fixedValues.bind(this);
	}

	updateRating(event) {
		const { value } = event.target;

		this.setState({
			rating: +value
		});
	}

	calculateStat(stat) {
		if (/FixedValues/.test(stat)) {
			return this.fixedValues(stat);
		}

		return stat || 'N/A';
	}

	fixedValues(stat) {
		if (/Accelaration/.test(stat)) {
			const value = stat.match(/Acceleration\s*\*\s*\d+/g)[this.state.rating - 1];
			return this.evil(value.replace('Acceleration', this.mech.accel));
		} else if (/Handling/.test(stat)) {
			const value = stat.match(/Handling\s*\*\s*\d+/g)[this.state.rating - 1],
				// find a way to find the highest handling value
				handling = Math.max(...this.props.mech.handling.match(/\d+/g));
			return this.evil(value.replace('Handling', handling));
		}
		const value = stat.match(/\d+/g);
		return value[this.state.rating - 1];
	}

	render() {
		const { mod } = this.props;
		return (
			<tr>
				<td className="mech-mod--name">{mod.name}</td>
				<td className="mech-mod--rating">
					<SelectRating item={mod} updateRating={this.updateRating} />
				</td>
				<td className="mech-mod--slot">{this.calculateStat(mod.slots)}</td>
				<td className="mech-mod--avail">{this.calculateStat(mod.avail)}</td>
				<td className="mech-mod--cost">{this.calculateStat(mod.cost)}&yen;</td>
				<td className="mech-mod--ref">{mod.source} {mod.page}p</td>
			</tr>
		);
	}
}

MechModRowComponent.propTypes = {
	mod: PropTypes.shape({
		name: PropTypes.string.isRequired,
		rating: PropTypes.string.isRequired,
		slot: PropTypes.string,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired
	}).isRequired,
	mech: PropTypes.shape({
		accel: PropTypes.string.isRequired,
		handling: PropTypes.string.isRequired,
	}).isRequired
};

export default MechModRowComponent;
