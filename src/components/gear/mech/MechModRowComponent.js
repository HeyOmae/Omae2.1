import React from 'react';
import PropTypes from 'prop-types';

import SelectRating from '../SelectRatingComponent';

class MechModRowComponent extends React.PureComponent {
	updateRating(x) {
		console.log(x);
	}

	render() {
		const { mod } = this.props;
		return (
			<tr>
				<td className="mech-mod--name">{mod.name}</td>
				<td className="mech-mod--rating">
					<SelectRating item={mod} updateRating={this.updateRating} />
				</td>
				<td className="mech-mod--slot">{mod.slots || 'N/A'}</td>
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
