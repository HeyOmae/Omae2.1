import React from 'react';
import PropTypes from 'prop-types';

class ArmorModRow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mod: props.mod
		};

		this.updateRating = this.updateRating.bind(this);
	}

	updateRating(e) {
		const { value } = e.target;
		this.setState((prevState) => {
			return {
				mod: {
					...prevState.mod,
					rating: value
				}
			};
		});
	}

	render() {
		const {armorName, mod, selectedMod, index, modArmor, demodArmor} = this.props,
			oneWordArmorName = armorName.replace(/\s/g, '');

		return (
			<tr>
				<td className="input-group">
					<input
						id={`${oneWordArmorName}-mod-${mod.name}`}
						name={mod.name}
						type="checkbox"
						className="form-control"
						checked={selectedMod}
						onChange={(e) => {
							const {name, checked} = e.target;
							if (checked) {
								modArmor({
									index,
									category: 'armors',
									mod: this.state.mod
								});
							} else {
								demodArmor({
									index,
									category: 'armors',
									demodName: name
								});
							}
						}}
					/>
					<label
						className="armor-mod--name"
						htmlFor={`${oneWordArmorName}-mod-${mod.name}`}
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
						/>
						: 'N/A'
					}
				</td>
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
	armorName: PropTypes.string.isRequired,
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
};

export default ArmorModRow;
