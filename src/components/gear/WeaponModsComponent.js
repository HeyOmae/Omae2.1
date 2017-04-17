import React from 'react';
import PropTypes from 'prop-types';


function WeaponModsComponent({index, weapon, weaponModLists, weaponModding, moddingMulti}) {
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
							weaponModdingAction={(e) => {
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
				{
					weaponModLists.slotless.map((mod) => {
						return (
							<WeaponMultiModOptionsSelect
								key={`slotless-mod-${mod.name}`}
								mods={weapon.mods && weapon.mods.slotless}
								weaponModdingAction={(e) => {
									console.error(e.target.name, e.target.checked);

									// moddingMulti({
									// 	index,
									// 	category: 'weapons',
									// 	slot: 'slotless',
									// 	mods
									// });
								}}
								weaponName={weapon.name}
								mod={mod}
								multiple
							/>);
					})
				}
			</div>
		</div>
	);
}

WeaponModsComponent.propTypes = {
	index: PropTypes.number.isRequired,
	weapon: PropTypes.shape({
		name: PropTypes.string.isRequired,
		accessorymounts: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
	}).isRequired,
	weaponModLists: PropTypes.objectOf(
		PropTypes.arrayOf(PropTypes.object)
	).isRequired,
	weaponModding: PropTypes.func.isRequired,
	moddingMulti: PropTypes.func.isRequired
};

// Helper function
function WeaponMultiModOptionsSelect({ weaponName, mod, mods, weaponModdingAction}) {
	return (
		<div className="input-group">
			<span className="input-group-addon">
				<input
					type="checkbox"
					className="form-control"
					checked={mods[mod.name]}
					name={mod.name}
					id={`${weaponName}-${mod.name}`}
					onChange={weaponModdingAction}
				/>
			</span>
			<label
				htmlFor={`${weaponName}-${mod.name}`}
			>
				{mod.name} &mdash; {mod.cost}&yen;
			</label>
		</div>
	);
}

WeaponMultiModOptionsSelect.propTypes = {
	weaponName: PropTypes.string.isRequired,
	mod: PropTypes.shape({
		name: PropTypes.string,
		cost: PropTypes.string
	}).isRequired,
	mods: PropTypes.objectOf(PropTypes.object),
	weaponModdingAction: PropTypes.func.isRequired
};
WeaponMultiModOptionsSelect.defaultProps = {
	mods: {}
};

function WeaponModOptionsSelect({ weaponName, mountLocation, weaponModLists, mods, weaponModdingAction}) {
	return (
		<select
			className="form-control"
			onChange={weaponModdingAction}
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
	weaponModdingAction: PropTypes.func.isRequired
};
WeaponModOptionsSelect.defaultProps = {
	mods: {},
	multiple: false
};

export default WeaponModsComponent;
