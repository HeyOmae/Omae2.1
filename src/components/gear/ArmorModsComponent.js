import React from 'react';
import PropTypes from 'prop-types';
import armorMods from '../../data/armorAccessories.json';

function ArmorModsComponent() {
	return (
		<div className="col">
			<p><strong>Capacity:</strong> {0}</p>
			<table className="table table-striped">
				<tbody>
					<tr>
						<td>
							<input
								type="checkbox"
								className="form-control"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default ArmorModsComponent;
