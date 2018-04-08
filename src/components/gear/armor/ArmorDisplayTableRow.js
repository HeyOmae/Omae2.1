import React from 'react';
import PropTypes from 'prop-types';

class ArmorTableRow extends React.PureComponent {
	constructor(props) {
		super(props);

		const isCostVariable = (props.armor.cost.search('Variable') > -1);

		this.state = {
			Rating: (props.armor.rating) ? '' : null,
			currentCost: isCostVariable ? '' : null,
		};

		if (isCostVariable) {
			const range = props.armor.cost.match(/\d+/g);
			this.gearCost = {
				max: range[1],
				min: range[0],
			};
		}

		this.updateRating = this.updateRating.bind(this);
		this.updateCost = this.updateCost.bind(this);
	}

	updateRating({ target }) {
		const { rating } = this.props.armor;
		let { value } = target;

		if (value > rating) {
			value = rating;
		} else if (value < 1) {
			value = '';
		}

		this.setState({
			Rating: value,
		});
	}

	updateCost({target}) {
		this.setState({
			currentCost: isNaN(target.value) ? '0' : target.value,
		});
	}

	render() {
		const {armor, btnClass, btnAction, btnSymbol, mod, index} = this.props;
		return (
			<tr>
				<td className="armor-button">
					<button
						className={`btn ${btnClass}`}
						onClick={btnAction({armor, index, state: this.state})}
					>
						{btnSymbol}
					</button>
				</td>
				<td className="armor-name">{mod || armor.name}</td>
				<td className="armor-value">{armor.armor}</td>
				<td className="armor-capacity">
					{
						this.state.Rating === null || armor.currentRating ?
							(armor.currentRating || armor.armorcapacity)
							:
							<input
								type="number"
								className="form-control"
								min="1"
								max={armor.rating}
								placeholder={`1-${armor.rating}`}
								onChange={this.updateRating}
								value={this.state.Rating}
							/>
					}
				</td>
				<td className="armor-avail">{armor.avail}</td>
				<td className="armor-cost">
					{
						this.state.currentCost === null ?
							(<span>{armor.currentCost || armor.cost}&yen;</span>)
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
				<td className="armor-ref">{armor.source} p{armor.page}</td>
			</tr>
		);
	}
}

ArmorTableRow.propTypes = {
	armor: PropTypes.shape({
		name: PropTypes.string.isRequired,
		armor: PropTypes.string.isRequired,
		armorcapacity: PropTypes.string.isRequired,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired,
		rating: PropTypes.string,
		currentCost: PropTypes.number,
		currentRating: PropTypes.number,
	}).isRequired,
	btnClass: PropTypes.string.isRequired,
	btnAction: PropTypes.func.isRequired,
	btnSymbol: PropTypes.oneOf(['+', '-']).isRequired,
	mod: PropTypes.element,
	index: PropTypes.number,
};

ArmorTableRow.defaultProps = {
	mod: null,
	index: undefined,
};

export default ArmorTableRow;
