import React from 'react';
import PropTypes from 'prop-types';

class CyberwareRowComponent extends React.Component {
	generateRatingOptions(maxRating) {
		const ratingOptions = [];

		for (let i = 1; i <= maxRating; ++i) {
			ratingOptions.push(
				<option value={i}>{i}</option>
			);
		}

		return ratingOptions;
	}

	render() {
		const {name, ess, rating, avail, cost, source, page} = this.props.ware;
		return (
			<tr>
				<td className="cyberware--buy">+</td>
				<td className="cyberware--name">{name}</td>
				<td className="cyberware--ess">{ess}</td>
				<td className="cyberware--rating">{rating ?
					<select>
						{this.generateRatingOptions(rating)}
					</select>
					: 'N/A'}</td>
				<td className="cyberware--avail">{avail}</td>
				<td className="cyberware--cost">{cost}&yen;</td>
				<td className="cyberware--ref">{source} p{page}</td>
			</tr>
		);
	}
}

CyberwareRowComponent.propTypes = {
	ware: PropTypes.shape({
		name: PropTypes.string.isRequired,
		ess: PropTypes.string.isRequired,
		rating: PropTypes.string,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired,
	}).isRequired
};

export default CyberwareRowComponent;
