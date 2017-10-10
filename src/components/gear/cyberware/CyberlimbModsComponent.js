import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DisplayTable from '../../DisplayTableComponent';
import { moddingCapacity, demoddingCapacity } from '../../../actions';

const CyberlimbMods = ({index, modList, cyberlimbs}) => {
	const cyberlimb = cyberlimbs[index];
	return (
		<div className="col">
			<p>
				<strong>Capacity: </strong>{cyberlimb.capacity}
			</p>
			{
				cyberlimb.allowsubsystems.category.map((modCategory) => {
					return (
						<div key={modCategory}>
							<h4>{modCategory}</h4>
							<DisplayTable
								header={
									<tr>
										<th>Name</th>
										<th>Capacity</th>
										<th>Avail</th>
										<th>Cost</th>
									</tr>
								}
							>
								{modList[modCategory].reduce((memo, mod) => {
									if (/\[.*[^0]\]/.test(mod.capacity)) {
										return [
											...memo,
											(
												<tr key={mod.name}>
													<td>{mod.name}</td>
													<td>{mod.capacity}</td>
													<td>{mod.avail}</td>
													<td>{mod.cost}&yen;</td>
												</tr>
											)
										];
									}
									return memo;
								}, [])}
							</DisplayTable>
						</div>
					);
				})
			}
		</div>
	);
};

CyberlimbMods.propTypes = {
	index: PropTypes.number.isRequired,
	modList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
	cyberlimbs: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = (state) => {
	return {cyberlimbs: state.purchaseGear.cyberlimbs};
};

export default connect(mapStateToProps, { modLimb: moddingCapacity, demodLimb: demoddingCapacity })(CyberlimbMods);
