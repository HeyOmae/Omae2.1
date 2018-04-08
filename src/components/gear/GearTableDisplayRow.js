import React from 'react';
import PropTypes from 'prop-types';

class GearTableRow extends React.Component {
	constructor(props) {
		super(props);

		const isCostVariable = (typeof props.gear.cost === 'string' && props.gear.cost.search('Variable') > -1);

		this.state = {
			rating: (props.gear.rating > 0) ? '' : null,
			currentCost: isCostVariable ? '' : null,
		};

		if (isCostVariable) {
			const range = props.gear.cost.match(/\d+/g);
			this.gearCost = {
				max: range[1],
				min: range[0],
			};
		}

		this.updateRating = this.updateRating.bind(this);
		this.updateCost = this.updateCost.bind(this);
	}

	updateRating({ target }) {
		const maxRating = Number(this.props.gear.rating);
		let rating = Number(target.value);

		if (rating > maxRating) {
			rating = maxRating;
		} else if (rating < 1) {
			rating = '';
		}

		this.setState({
			rating,
		});
	}

	updateCost({target}) {
		this.setState({
			currentCost: isNaN(target.value) ? 0 : Number(target.value),
		});
	}

	render() {
		const { gear, btnAction, btnClass, btnSymbol } = this.props;
		return (
			<tr>
				<td>
					<button
						className={`btn ${btnClass}`}
						onClick={btnAction({gear, state: this.state})}
					>
						{btnSymbol}
					</button>
				</td>
				<td className="gear-name">{gear.name}</td>
				<td className="gear-rating">
					{this.state.rating === null || gear.currentRating ?
						(gear.currentRating || 'N/A')
						:
						<input
							type="number"
							className="form-control"
							min="1"
							max={gear.rating}
							placeholder={`1-${gear.rating}`}
							onChange={this.updateRating}
							value={this.state.rating}
						/>
					}
				</td>
				<td className="gear-avail">{gear.avail}</td>
				<td className="gear-cost">
					{
						this.state.currentCost === null ?
							(<span>{gear.currentCost || gear.cost}&yen;</span>)
							:
							<input
								type="number"
								min="1"
								max={this.gearCost.max}
								placeholder={`${this.gearCost.min}-${this.gearCost.max}`}
								onChange={this.updateCost}
								value={this.state.currentCost}
							/>
					}
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
		cost: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]).isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired,
		currentRating: PropTypes.number,
	}).isRequired,
	btnClass: PropTypes.string.isRequired,
	btnAction: PropTypes.func.isRequired,
	btnSymbol: PropTypes.oneOf(['+', '-']).isRequired,
};

export default GearTableRow;
