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
				<td className="cyberlimb-mod--rating">
					{isNaN(mod.cost) ?
						<input
							className="form-control"
							type="number"
							placeholder={`1-${mod.rating}`}
							onChange={this.updateRating}
							value={this.state.Rating}
						/>
						: 'N/A'
					}
				</td>
				<td className="cyberlimb-mod--capacity">{mod.capacity}</td>
				<td className="cyberlimb-mod--avail">
					{mod.avail}
				</td>
				<td className="cyberlimb-mod--cost">
					{mod.cost}&yen;
				</td>
			</tr>
		);
	}
}

CyberlimbModRow.propTypes = {
	gearName: PropTypes.string.isRequired,
	mod: PropTypes.shape({
		name: PropTypes.string.isRequired,
		rating: PropTypes.string,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
	}).isRequired,
	selectedMod: PropTypes.bool.isRequired,
	index: PropTypes.number.isRequired,
	modGear: PropTypes.func.isRequired,
	demodGear: PropTypes.func.isRequired,
	currentRating: PropTypes.number,
};

export default CyberlimbModRow;
