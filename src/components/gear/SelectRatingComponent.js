import React from 'react';
import PropTypes from 'prop-types';

class SelectRatingComponent extends React.PureComponent {
	generateRatingOptions() {
		const ratingOptions = [],
			{ rating, name } = this.props.item;

		for (let i = this.props.minRating; i <= rating; ++i) {
			ratingOptions.push(
				<option key={`${name}-${i}`} value={i}>{i}</option>,
			);
		}

		return ratingOptions;
	}

	render() {
		const { rating } = this.props.item;
		return (
			rating && rating !== '0' ?
				<select onChange={this.props.updateRating}>
					{this.generateRatingOptions()}
				</select>
				:
				'N/A'
		);
	}
}

SelectRatingComponent.propTypes = {
	item: PropTypes.shape({
		rating: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		name: PropTypes.string.isRequired,
	}).isRequired,
	updateRating: PropTypes.func.isRequired,
	minRating: PropTypes.number,
};

SelectRatingComponent.defaultProps = {
	minRating: 1,
};

export default SelectRatingComponent;
