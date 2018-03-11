import React from 'react';
import PropTypes from 'prop-types';

class SelectRatingComponent extends React.PureComponent {
	generateRatingOptions() {
		const ratingOptions = [],
			{ rating, name } = this.props.item;

		for (let i = 1; i <= rating; ++i) {
			ratingOptions.push(
				<option key={`${name}-${i}`} value={i}>{i}</option>
			);
		}

		return ratingOptions;
	}

	render() {
		const { rating } = this.props.item;
		return (
			rating ?
				<select onChange={this.updateRating}>
					{this.generateRatingOptions()}
				</select>
				:
				'N/A'
		);
	}
}

SelectRatingComponent.propTypes = {
	item: PropTypes.shape({
		rating: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired
};

export default SelectRatingComponent;
