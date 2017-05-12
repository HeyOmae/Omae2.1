import React from 'react';
import PropTypes from 'prop-types';
import armorMods from '../../data/armorAccessories.json';

function ArmorModsComponent({armorName}) {
	return (
		<div className="col">
			<p><strong>Capacity:</strong> {0}</p>
			<table className="table table-striped">
				<tbody>
					{
					armorMods.map((mod) => {
						return (
							<tr>
								<td className="input-group" key={`${armorName}-mod-${mod.name}`}>
									<input
										id={`${armorName}-mod-${mod.name}`}
										type="checkbox"
										className="form-control"
									/>
									<label
										htmlFor={`${armorName}-mod-${mod.name}`}
									>
										{mod.name} &mdash; {mod.cost}&yen;
									</label>
								</td>
							</tr>
						);
					})
					}
				</tbody>
			</table>
		</div>
	);
}

ArmorModsComponent.propTypes = {
	armorName: PropTypes.string.isRequired
};

export default ArmorModsComponent;
