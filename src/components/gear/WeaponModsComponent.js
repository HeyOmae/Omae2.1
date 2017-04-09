import React from 'react';
import PropTypes from 'prop-types';


function WeaponModsComponent({index, weapon, weaponModLists, weaponModding}) {
	const {mount} = weapon.accessorymounts;

	return (
		<div className="row">
			{
			mount.map((mountLocation) => {
				return (
					<div className="col-xs-12 col-md-4" key={`weapon-mods-${weapon.name}-${mountLocation}`}>
						<p><strong>{mountLocation}</strong></p>
						<WeaponModOptionsSelect
							index={index}
							mods={weapon.mods}
							weaponModding={weaponModding}
							weaponName={weapon.name}
							mountLocation={mountLocation}
							weaponModLists={weaponModLists}
						/>
					</div>
				);
			})
			}
			<div className="col-xs-12 col-md-4">
				<p><strong>Slotless</strong></p>
				<WeaponModOptionsSelect
					index={index}
					mods={weapon.mods}
					weaponModding={weaponModding}
					weaponName={weapon.name}
					mountLocation="slotless"
					weaponModLists={weaponModLists}
					multiple
				/>
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
	weaponModding: PropTypes.func.isRequired
};

// Helper function
function WeaponModOptionsSelect({index, weaponName, mountLocation, weaponModLists, mods, weaponModding, multiple}) {
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
			multiple={multiple}
		>
			<option value="">&mdash;</option>
			{weaponModLists[mountLocation].map((mod) => {
				return (<option key={`${weaponName}--${mountLocation}--${mod.name}`} value={mod.name}>{mod.name}</option>);
			})}
		</select>
	);
}

WeaponModOptionsSelect.propTypes = {
	index: PropTypes.number.isRequired,
	weaponName: PropTypes.string.isRequired,
	mountLocation: PropTypes.string.isRequired,
	weaponModLists: PropTypes.objectOf(
		PropTypes.arrayOf(
			PropTypes.object.isRequired
		).isRequired
	).isRequired,
	mods: PropTypes.objectOf(PropTypes.object),
	weaponModding: PropTypes.func.isRequired,
	multiple: PropTypes.bool
};
WeaponModOptionsSelect.defaultProps = {
	mods: {},
	multiple: false
};

export default WeaponModsComponent;
