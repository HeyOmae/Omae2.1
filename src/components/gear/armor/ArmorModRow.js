import React from 'react';
import PropTypes from 'prop-types';

class ArmorModRow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			Rating: (props.currentRating || '')
		};

		this.inputId = `${props.gearName}-mod-${props.mod.name}`.replace(/\s/g, '');

		this.updateRating = this.updateRating.bind(this);
		this.modifying = this.modifying.bind(this);
	}

	updateRating(e) {
		let value = Number(e.target.value);
		const {mod} = this.props;

		if (value > mod.maxrating) {
			value = mod.maxrating;
		} else if (value < 1) {
			value = '';
		}

		this.setState({Rating: value});
	}

	modifying(e) {
		const {mod, index, modArmor, demodArmor} = this.props,
			{name, checked} = e.target;

		if (checked) {
			modArmor({
				index,
				category: 'armors',
				mod,
				Rating: isNaN(mod.cost) && (this.state.Rating || 1)
			});
		} else {
			demodArmor({
				index,
				category: 'armors',
				demodName: name
			});
		}
	}

	render() {
		const {mod, selectedMod} = this.props;

		return (
			<tr>
				<td className="input-group">
					<input
						id={this.inputId}
						name={mod.name}
						type="checkbox"
						className="form-control"
						checked={selectedMod}
						onChange={this.modifying}
					/>
					<label
						className="armor-mod--name"
						htmlFor={this.inputId}
					>
						{mod.name}
					</label>
				</td>
				<td className="armor-mod--rating">
					{isNaN(mod.cost) ?
						<input
							className="form-control"
							type="number"
							placeholder={`1-${mod.maxrating}`}
							onChange={this.updateRating}
							value={this.state.Rating}
						/>
						: 'N/A'
					}
				</td>
				<td className="armor-mod--capacity">{/FixedValues/.test(mod.armorcapacity) ? '[Rating]' : mod.armorcapacity}</td>
				<td className="armor-mod--avail">
					{mod.avail}
				</td>
				<td className="armor-mod--cost">
					{mod.cost}&yen;
				</td>
			</tr>
		);
	}
}

ArmorModRow.propTypes = {
	gearName: PropTypes.string.isRequired,
	mod: PropTypes.shape({
		name: PropTypes.string.isRequired,
		maxrating: PropTypes.string.isRequired,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired
	}).isRequired,
	selectedMod: PropTypes.bool.isRequired,
	index: PropTypes.number.isRequired,
	modArmor: PropTypes.func.isRequired,
	demodArmor: PropTypes.func.isRequired,
	currentRating: PropTypes.number
};

ArmorModRow.defaultProps = {
	currentRating: 0
};

export default ArmorModRow;
