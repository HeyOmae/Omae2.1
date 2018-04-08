import React from 'react';
import PropTypes from 'prop-types';
import DisplayTable from '../../DisplayTableComponent';
import Modal from '../../ModalButtonComponent';
import CyberlimbMods from './CyberlimbModsComponent';

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
							<th>Capacity</th>
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
										{ limb.allowsubsystems ?
											<Modal
												modalName={limb.name}
												modalID={`${limb.name.replace(/\s/g, '') + index}-modal`}
												modalContent={
													<CyberlimbMods
														index={index}
														modList={cyberware}
													/>
												}
											/> : limb.name
										}
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
		PropTypes.object.isRequired,
	),
	cyberware: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.arrayOf(
				PropTypes.object.isRequired,
			).isRequired,
			PropTypes.object.isRequired,
		]),
	).isRequired,
	sellGear: PropTypes.func.isRequired,
};

PurchasedCyberlimbComponent.defaultProps = {
	cyberlimbs: [],
};

export default PurchasedCyberlimbComponent;
