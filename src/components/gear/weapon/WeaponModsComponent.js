import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function WeaponModsComponent({index, weapon, weaponModLists, weaponModding, moddingMulti, demoddingMulti}) {
	const {mount} = weapon.accessorymounts;

	return (
		<div className="row">
			{
			mount.map((mountLocation) => {
				return (
					<div className="col-xs-12 col-md-4" key={`weapon-mods-${weapon.name}-${mountLocation}`}>
						<p><strong>{mountLocation}</strong></p>
						<WeaponModOptionsSelect
							mods={weapon.mods}
							weaponModding={weaponModding}
							index={index}
							weaponName={weapon.name}
							mountLocation={mountLocation}
							weaponModLists={weaponModLists}
						/>
					</div>
				);
			})
			}
			<div className="col-md-12">
				<p><strong>Slotless</strong></p>
				<table className="table table-striped">
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
										moddingMulti={moddingMulti}
										demoddingMulti={demoddingMulti}
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

WeaponModsComponent.propTypes = {
	index: PropTypes.number.isRequired,
	weapon: PropTypes.shape({
		name: PropTypes.string.isRequired,
		accessorymounts: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
		cost: PropTypes.string.isRequired
	}).isRequired,
	weaponModLists: PropTypes.objectOf(
		PropTypes.arrayOf(PropTypes.object)
	).isRequired,
	weaponModding: PropTypes.func.isRequired,
	moddingMulti: PropTypes.func.isRequired,
	demoddingMulti: PropTypes.func.isRequired
};

// Helper function
function WeaponMultiModding({ weaponName, weaponCost, mod, mods, moddingMulti, demoddingMulti, index}) {
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
						moddingMulti({
							index,
							category: 'weapons',
							slot: 'slotless',
							mod: {
								...mod,
								cost: modCost
							}
						});
					} else {
						demoddingMulti({
							index,
							category: 'weapons',
							slot: 'slotless',
							demodName: name
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
		cost: PropTypes.string
	}).isRequired,
	mods: PropTypes.objectOf(PropTypes.object),
	moddingMulti: PropTypes.func.isRequired,
	demoddingMulti: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired
};
WeaponMultiModding.defaultProps = {
	mods: {}
};

function WeaponModOptionsSelect({ weaponName, mountLocation, weaponModLists, mods, weaponModding, index}) {
	return (
		<select
			className="form-control"
			onChange={(e) => {
				const selectedMod = e.target.value,
					mod = weaponModLists[mountLocation].find((searchMod) => {
						return searchMod.name === selectedMod;
					});
				weaponModding({
					index,
					category: 'weapons',
					slot: mountLocation,
					mod
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
	weaponModLists: PropTypes.objectOf(
		PropTypes.arrayOf(
			PropTypes.object.isRequired
		).isRequired
	).isRequired,
	mods: PropTypes.objectOf(PropTypes.object),
	weaponModding: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired
};
WeaponModOptionsSelect.defaultProps = {
	mods: {},
	multiple: false
};

const mapStateToProps = (state) => {
	return {
		weapons: state.purchaseGear.weapons
	};
};

export { WeaponModsComponent };

export default connect(mapStateToProps, {})(WeaponModsComponent);
