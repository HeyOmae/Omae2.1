import React from 'react';
import PropTypes from 'prop-types';

class GearTableRow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			rating: props.gear.rating > 0 ? '' : null
		};

		this.updateRating = this.updateRating.bind(this);
	}

	updateRating({ target }) {
		this.setState({
			rating: target.value
		});
	}

	render() {
		const {gear, button} = this.props;
		return (
			<tr>
				<td>{button}</td>
				<td className="gear-name">{gear.name}</td>
				<td className="gear-rating">
					{gear.rating > 0 ?
						<input
							type="number"
							className="form-control"
							min="1"
							max={gear.rating}
							placeholder={`1-${gear.rating}`}
							onChange={this.updateRating}
							value={this.state.rating}
						/>
						:
						'N/A'
					}
				</td>
				<td className="gear-avail">{gear.avail}</td>
				<td className="gear-cost">
					{gear.cost}&yen;
				</td>
				<td className="gear-ref">{gear.source} p{gear.page}</td>
			</tr>
		);
	}
}

GearTableRow.propTypes = {
	gear: PropTypes.shape({
		name: PropTypes.string.isRequired,
		rating: PropTypes.string.isRequired,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired
	}).isRequired,
	button: PropTypes.element.isRequired
};

GearTableRow.defaultProps = {
	gearState: null
};

export default GearTableRow;
