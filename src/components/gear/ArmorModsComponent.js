import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { moddingCapacity, demoddingCapacity } from '../../actions';
import GearClass from './GearCreator';
import DisplayTableComponent from '../DisplayTableComponent';
import armorMods from '../../data/armorAccessories.json';

class ArmorModsComponent extends React.PureComponent {
	render() {
		const {index, modArmor, demodArmor, armors} = this.props,
			armor = armors[index],
			{name, mods = {}} = armor;

		return (
			<div className="col">
				<p>
					<strong>Capacity: </strong>
					<span className="capacity">
						{Number(armor.armorcapacity) - (armor.capacity || 0)}
					</span>
				</p>
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
									key={`${name}-mod-${mod.name}`}
									armorName={name}
									mod={mod}
									selectedMod={!!mods[mod.name]}
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
}

ArmorModsComponent.propTypes = {
	index: PropTypes.number.isRequired,
	modArmor: PropTypes.func.isRequired,
	demodArmor: PropTypes.func.isRequired,
	armors: PropTypes.arrayOf(PropTypes.object).isRequired
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
						console.log(name);
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
	demodArmor: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {armors: state.purchaseGear.armors};
};

export { ArmorModsComponent, ArmorModRow };

export default connect(mapStateToProps, { modArmor: moddingCapacity, demodArmor: demoddingCapacity })(ArmorModsComponent);
