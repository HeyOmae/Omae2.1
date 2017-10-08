import React from 'react';
import PropTypes from 'prop-types';
import DisplayTable from '../../DisplayTableComponent';
import Modal from '../../ModalButtonComponent';

class PurchasedCyberlimbComponent extends React.PureComponent {
	render() {
		const {cyberlimbs, sellGear, cyberware} = this.props;
		return (
			<div className="purchased-cyberlimbs col-12">
				<h4>Cyberlimbs</h4>
				<DisplayTable
					header={
						<tr>
							<th>Sell</th>
							<th>Name</th>
							<th>Agi</th>
							<th>Str</th>
							<th>Essense</th>
							<th>Capcaity</th>
							<th>Avail</th>
							<th>Cost</th>
							<th>Ref</th>
						</tr>
					}
					body={
						cyberlimbs.map((limb, index) => {
							return (
								// eslint-disable-next-line react/no-array-index-key
								<tr key={`cyberlimb-${limb.name}-${index}`}>
									<td>
										<button
											className="btn btn-warning"
											onClick={() => {
												sellGear({index, category: 'cyberlimbs', gear: limb});
											}}
										>
										-
										</button>
									</td>
									<td>
										<Modal
											modalName={limb.name}
											modalID={`${limb.name.replace(/\s/g, '') + index}-modal`}
											modalContent={
												<CyberlimbMods
													index={index}
													modList={cyberware}
													cyberlimb={limb}
												/>
											}
										/>
									</td>
									<td>{limb.agi}</td>
									<td>{limb.str}</td>
									<td>{limb.ess}</td>
									<td>{limb.capacity}</td>
									<td>{limb.avail}</td>
									<td>{limb.cost}&yen;</td>
									<td>{limb.source} {limb.page}p</td>
								</tr>
							);
						})
					}
				/>
			</div>
		);
	}
}

PurchasedCyberlimbComponent.propTypes = {
	cyberlimbs: PropTypes.arrayOf(
		PropTypes.object.isRequired
	),
	cyberware: PropTypes.arrayOf(
		PropTypes.object.isRequired
	).isRequired,
	sellGear: PropTypes.func.isRequired,
};

PurchasedCyberlimbComponent.defaultProps = {
	cyberlimbs: []
};

const CyberlimbMods = ({index, modList, cyberlimb}) => {
	return (
		<div className="col">
			<p>
				<strong>Capacity: </strong>{cyberlimb.capacity}
			</p>
			{
				cyberlimb.allowsubsystems.category.map((modCategory) => {
					return (
						<div>
							<h4>{modCategory}</h4>
							<DisplayTable>
								{modList[modCategory].reduce((memo, mod) => {
									if (/\[.*[^0]\]/.test(mod.capacity)) {
										return [
											...memo,
											(
												<tr>
													<td>{mod.name}</td>
													<td>{mod.capacity}</td>
													<td>{mod.cost}</td>
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
	cyberlimb: PropTypes.shape({
		capacity: PropTypes.string.isRequired
	}).isRequired
};

export default PurchasedCyberlimbComponent;
