import React from 'react';
import PropTypes from 'prop-types';

class ArmorTableRow extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			Rating: (props.armor.rating) ? '' : null
		};

		this.updateRating = this.updateRating.bind(this);
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
			Rating: value
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
						this.state.Rating === null ?
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
				<td className="armor-cost">{armor.currentCost || armor.cost}&yen;</td>
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
		currentRating: PropTypes.number
	}).isRequired,
	btnClass: PropTypes.string.isRequired,
	btnAction: PropTypes.func.isRequired,
	btnSymbol: PropTypes.oneOf(['+', '-']).isRequired,
	mod: PropTypes.element,
	index: PropTypes.number
};

ArmorTableRow.defaultProps = {
	armorGear: null,
	mod: null,
	index: undefined
};

export default ArmorTableRow;
