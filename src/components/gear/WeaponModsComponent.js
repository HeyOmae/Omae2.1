import React from 'react';
import PropTypes from 'prop-types';


function WeaponModsComponent({weapon, weaponModLists}) {
	const {mount} = weapon.accessorymounts;

	return (
		<div className="row">
			{
			mount.map((mountLocation) => {
				return (
					<div className="col" key={`weapon-mods-${weapon.name}-${mountLocation}`}>
						<p><strong>{mountLocation}</strong></p>
						<WeaponModOptionsSelect
							weaponName={weapon.name}
							mountLocation={mountLocation}
							weaponModLists={weaponModLists}
						/>
					</div>
				);
			})
			}
		</div>
	);
}

WeaponModsComponent.propTypes = {
	weapon: PropTypes.shape({
		name: PropTypes.string.isRequired,
		accessorymounts: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
	}).isRequired,
	weaponModLists: PropTypes.objectOf(
		PropTypes.arrayOf(PropTypes.object)
	).isRequired
};

// Helper function
function WeaponModOptionsSelect({weaponName, mountLocation, weaponModLists}) {
	return (
		<select>
			<option value="">&mdash;</option>
			{weaponModLists[mountLocation].map((mod) => {
				return (<option key={`${weaponName}--${mountLocation}--${mod.name}`} value={mod.name}>{mod.name}</option>);
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
	).isRequired
};

export default WeaponModsComponent;
