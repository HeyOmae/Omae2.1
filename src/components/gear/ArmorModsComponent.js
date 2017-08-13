import React from 'react';
import PropTypes from 'prop-types';
import GearClass from './GearCreator';
import DisplayTableComponent from '../DisplayTableComponent';
import armorMods from '../../data/armorAccessories.json';

function ArmorModsComponent({armorName, usedCapacity, installedMods, index, modArmor, demodArmor}) {
	return (
		<div className="col">
			<p><strong>Capacity:</strong> {usedCapacity}</p>
			<DisplayTableComponent
				striped
				invert
				header={
					<tr>
						<th>Name</th>
						<th>Rating</th>
						<th>Avail</th>
						<th>Cost</th>
					</tr>
				}
			>
				{
					armorMods.map((mod) => {
						return (
							<ArmorModRow
								key={`${armorName}-mod-${mod.name}`}
								armorName={armorName}
								mod={mod}
								selectedMod={!!installedMods[mod.name]}
								index={index}
								modArmor={modArmor}
								demodArmor={demodArmor}
							/>
						);
					})
				}
			</DisplayTableComponent>
		</div>
	);
}

ArmorModsComponent.propTypes = {
	armorName: PropTypes.string.isRequired,
	usedCapacity: PropTypes.number.isRequired,
	installedMods: PropTypes.objectOf(PropTypes.object),
	index: PropTypes.number.isRequired,
	modArmor: PropTypes.func.isRequired,
	demodArmor: PropTypes.func.isRequired
};

ArmorModsComponent.defaultProps = {
	installedMods: {}
};

const ArmorModRow = ({armorName, mod, selectedMod, index, modArmor, demodArmor}) => {
	const modState = new GearClass(mod);
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
								mod: modState.getGear()
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
			<td>
				{isNaN(mod.cost) ?
					<input
						className="form-control"
						type="number"
						placeholder={`1-${mod.maxrating}`}
						onChange={(e) => {
							modState.updateRating(e.target.value);
						}}
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
};

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
	demodArmor: PropTypes.func.isRequired
};

export default ArmorModsComponent;
