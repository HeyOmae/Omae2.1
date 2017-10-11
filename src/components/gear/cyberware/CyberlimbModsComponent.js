import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CyberlimbModRow from './CyberlimbModRowComponent';
import DisplayTable from '../../DisplayTableComponent';
import { moddingCapacity, demoddingCapacity } from '../../../actions';

const CyberlimbMods = ({index, modList, cyberlimbs, modLimb, demodLimb}) => {
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
								striped
								invert
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
								{modList[modCategory].reduce((memo, mod) => {
									if (/\[.*[^0]\]/.test(mod.capacity)) {
										return [
											...memo,
											(
												<CyberlimbModRow
													gearName={cyberlimb.name}
													mod={mod}
													index={index}
													modArmor={modLimb}
													demodArmor={demodLimb}
												/>
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
