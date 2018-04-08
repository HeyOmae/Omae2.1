import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CyberlimbModRow from './CyberlimbModRowComponent';
import FilterableTable from '../../FilterableTable';
import { moddingCapacity, demoddingCapacity } from '../../../actions';

const CyberlimbMods = ({index, modList, cyberlimbs, modGear, demodGear}) => {
	const cyberlimb = cyberlimbs[index],
		{mods} = cyberlimb;

	return (
		<div className="col">
			<p>
				<strong>Capacity: </strong>{cyberlimb.capacity - (cyberlimb.currentCapacity || 0)}
			</p>
			{
				cyberlimb.allowsubsystems.category.map((modCategory) => {
					return (
						<div key={modCategory}>
							<h4>{modCategory}</h4>
							<FilterableTable
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
													key={`${modCategory}-${mod.name}`}
													gearName={cyberlimb.name}
													selectedMod={!!(mods && mods[mod.name])}
													category="cyberlimbs"
													mod={mod}
													index={index}
													modGear={modGear}
													demodGear={demodGear}
												/>
											),
										];
									}
									return memo;
								}, [])}
							</FilterableTable>
						</div>
					);
				})
			}
		</div>
	);
};

CyberlimbMods.propTypes = {
	index: PropTypes.number.isRequired,
	modList: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.array,
		]).isRequired,
	).isRequired,
	cyberlimbs: PropTypes.arrayOf(PropTypes.object).isRequired,
	modGear: PropTypes.func.isRequired,
	demodGear: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {cyberlimbs: state.purchaseGear.cyberlimbs};
};

export default connect(mapStateToProps, { modGear: moddingCapacity, demodGear: demoddingCapacity })(CyberlimbMods);
