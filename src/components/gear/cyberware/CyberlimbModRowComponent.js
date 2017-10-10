import React from 'react';
import PropTypes from 'prop-types';
import ArmorModRow from '../armor/ArmorModRow';

class CyberlimbModRow extends ArmorModRow {
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
						className="cyberlimb-mod--name"
						htmlFor={this.inputId}
					>
						{mod.name}
					</label>
				</td>
			</tr>
		);
	}
}

CyberlimbModRow.propTypes = {
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

export default CyberlimbModRow;
