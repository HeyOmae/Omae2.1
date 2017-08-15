import React from 'react';
import PropTypes from 'prop-types';

class ArmorModRow extends React.Component {
	render() {
		const {armorName, mod, selectedMod, index, modArmor, demodArmor} = this.props;
		return (
			<tr>
				<td className="input-group">
					<input
						id={`${armorName}-mod-${mod.name}`}
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
						htmlFor={`${armorName}-mod-${mod.name}`}
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
				<td>
					{mod.avail}
				</td>
				<td>
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
