import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import armorMods from 'data/armorAccessories.json';
import ArmorModRow from './ArmorModRow';
import { moddingCapacity, demoddingCapacity } from '../../../actions';
import DisplayTableComponent from '../../DisplayTableComponent';

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
						{Number(armor.armorcapacity) - (armor.currentCapacity || 0)}
					</span>
				</p>
				<DisplayTableComponent
					striped
					header={
						<tr>
							<th>Name</th>
							<th>Rating</th>
							<th>Capacity</th>
							<th>Avail</th>
							<th>Cost</th>
						</tr>
					}
				>
					{
						armorMods.reduce((memo, mod) => {
							return mod.cost > 0 || isNaN(mod.cost) ? [
								...memo,
								<ArmorModRow
									key={`${name}-mod-${mod.name}`}
									gearName={name}
									mod={mod}
									selectedMod={!!mods[mod.name]}
									index={index}
									modGear={modArmor}
									demodGear={demodArmor}
									currentRating={mods[mod.name] && mods[mod.name].currentRating}
								/>
							] : memo;
						}, [])
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

const mapStateToProps = (state) => {
	return {armors: state.purchaseGear.armors};
};

export { ArmorModsComponent };

export default connect(mapStateToProps, { modArmor: moddingCapacity, demodArmor: demoddingCapacity })(ArmorModsComponent);
