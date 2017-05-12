import React from 'react';
import PropTypes from 'prop-types';
import armorMods from '../../data/armorAccessories.json';

function ArmorModsComponent({armorName, usedCapacity, index, modArmor, demodArmor}) {
	return (
		<div className="col">
			<p><strong>Capacity:</strong> {usedCapacity}</p>
			<table className="table table-striped">
				<tbody>
					{
					armorMods.map((mod) => {
						return (
							<tr key={`${armorName}-mod-${mod.name}`}>
								<td className="input-group">
									<input
										id={`${armorName}-mod-${mod.name}`}
										type="checkbox"
										className="form-control"
										onChange={(e) => {
											const {name, checked} = e.target;
											if (checked) {
												modArmor({
													index,
													category: 'armors',
													mod
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
	armorName: PropTypes.string.isRequired,
	usedCapacity: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
	modArmor: PropTypes.func.isRequired,
	demodArmor: PropTypes.func.isRequired
};

export default ArmorModsComponent;
