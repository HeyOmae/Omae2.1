import React from 'react';
import PropTypes from 'prop-types';

import SelectRating from '../SelectRatingComponent';

class MechModRowComponent extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			rating: 1
		};
	}

	updateRating(x) {
		console.log(x);
	}

	calculateStat(stat) {
		if (/FixedValues/.test(stat)) {
			const value = stat.match(/\d+/g);
			return value[this.state.rating - 1];
		}

		return stat || 'N/A';
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
				<td className="mech-mod--avail">{mod.avail}</td>
				<td className="mech-mod--cost">{mod.cost}&yen;</td>
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
	}).isRequired
};

export default MechModRowComponent;
