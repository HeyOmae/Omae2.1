import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { weaponModding, moddingMulti, demoddingMulti } from '../../../actions';

class WeaponModsComponent extends React.PureComponent {
	render() {
		const {index, weaponModLists, weapons, weaponSlotModding, slotlessModding, slotlessDemodding} = this.props,
			weapon = weapons[index],
			{mount} = weapon.accessorymounts;

		return (
			<div className="row">
				{
					mount.map((mountLocation) => {
						return (
							<div className="col-12 col-md-4" key={`weapon-mods-${weapon.name}-${mountLocation}`}>
								<p><strong>{mountLocation}</strong></p>
								<WeaponModOptionsSelect
									mods={weapon.mods}
									weaponModLists={weaponModLists}
									weaponSlotModding={weaponSlotModding}
									index={index}
									weaponName={weapon.name}
									mountLocation={mountLocation}
								/>
							</div>
						);
					})
				}
				<div className="col-md-12 modal-content">
					<p><strong>Slotless</strong></p>
					<table className="table table-striped table-dark table-responsive-lg">
						<tbody>
							{
								weaponModLists.slotless.map((mod) => {
									return (
										<tr key={`slotless-mod-${mod.name}`}>
											<WeaponMultiModding
												mods={weapon.mods && weapon.mods.slotless}
												weaponName={weapon.name}
												weaponCost={weapon.cost}
												mod={mod}
												multiple
												slotlessModding={slotlessModding}
												slotlessDemodding={slotlessDemodding}
												index={index}
											/>
										</tr>
									);
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

WeaponModsComponent.propTypes = {
	index: PropTypes.number.isRequired,
	weaponModLists: PropTypes.objectOf(PropTypes.array).isRequired,
	weapons: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			accessorymounts: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
			cost: PropTypes.string.isRequired,
		}),
	).isRequired,
	weaponSlotModding: PropTypes.func.isRequired,
	slotlessModding: PropTypes.func.isRequired,
	slotlessDemodding: PropTypes.func.isRequired,
};

// Helper function
function WeaponMultiModding({ weaponName, weaponCost, mod, mods, slotlessModding, slotlessDemodding, index}) {
	const modCost = isNaN(mod.cost) ? weaponCost : mod.cost;
	return (
		<td className="input-group">
			<input
				type="checkbox"
				className="form-control"
				checked={!!mods[mod.name]}
				name={mod.name}
				id={`${weaponName}-${mod.name}`}
				onChange={(e) => {
					const {name, checked} = e.target;
					if (checked) {
						slotlessModding({
							index,
							category: 'weapons',
							slot: 'slotless',
							mod: {
								...mod,
								cost: modCost,
							},
						});
					} else {
						slotlessDemodding({
							index,
							category: 'weapons',
							slot: 'slotless',
							demodName: name,
						});
					}
				}}
			/>
			<label
				htmlFor={`${weaponName}-${mod.name}`}
			>
				{mod.name} &mdash; {modCost}&yen;
			</label>
		</td>
	);
}

WeaponMultiModding.propTypes = {
	weaponName: PropTypes.string.isRequired,
	weaponCost: PropTypes.string.isRequired,
	mod: PropTypes.shape({
		name: PropTypes.string,
		cost: PropTypes.string,
	}).isRequired,
	mods: PropTypes.objectOf(PropTypes.object),
	slotlessModding: PropTypes.func.isRequired,
	slotlessDemodding: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
};
WeaponMultiModding.defaultProps = {
	mods: {},
};

function WeaponModOptionsSelect({ weaponName, mountLocation, mods, weaponSlotModding, index, weaponModLists}) {
	return (
		<select
			className="form-control"
			onChange={(e) => {
				const selectedMod = e.target.value,
					mod = weaponModLists[mountLocation].find((searchMod) => {
						return searchMod.name === selectedMod;
					});
				weaponSlotModding({
					index,
					category: 'weapons',
					slot: mountLocation,
					mod,
				});
			}}
			value={(mods[mountLocation] && mods[mountLocation].name) || ''}
			>
			<option value="">&mdash;</option>
			{weaponModLists[mountLocation].map((mod) => {
				return (<option key={`${weaponName}--${mountLocation}--${mod.name}`} value={mod.name}>{mod.name} {mod.cost}&yen;</option>);
			})}
		</select>
	);
}

WeaponModOptionsSelect.propTypes = {
	weaponName: PropTypes.string.isRequired,
	mountLocation: PropTypes.string.isRequired,
	mods: PropTypes.objectOf(PropTypes.object),
	weaponSlotModding: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	weaponModLists: PropTypes.objectOf(PropTypes.array).isRequired,
};
WeaponModOptionsSelect.defaultProps = {
	mods: {},
	multiple: false,
};

const mapStateToProps = (state) => {
	return {
		weapons: state.purchaseGear.weapons,
	};
};

export { WeaponModsComponent };

export default connect(mapStateToProps, { weaponSlotModding: weaponModding, slotlessModding: moddingMulti, slotlessDemodding: demoddingMulti })(WeaponModsComponent);
