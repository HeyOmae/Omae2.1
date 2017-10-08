import React from 'react';
import PropTypes from 'prop-types';
import DisplayTable from '../../DisplayTableComponent';

class PurchasedCyberlimbComponent extends React.PureComponent {
	render() {
		const {cyberlimbs, sellGear} = this.props;
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
						cyberlimbs.map((aug, index) => {
							return (
								// eslint-disable-next-line react/no-array-index-key
								<tr key={`cyberlimb-${aug.name}-${index}`}>
									<td>
										<button
											className="btn btn-warning"
											onClick={() => {
												sellGear({index, category: 'cyberlimbs', gear: aug});
											}}
										>
										-
										</button>
									</td>
									<td>{aug.name}</td>
									<td>{aug.agi}</td>
									<td>{aug.str}</td>
									<td>{aug.ess}</td>
									<td>{aug.capacity}</td>
									<td>{aug.avail}</td>
									<td>{aug.cost}&yen;</td>
									<td>{aug.source} {aug.page}p</td>
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
	sellGear: PropTypes.func.isRequired
};

PurchasedCyberlimbComponent.defaultProps = {
	cyberlimbs: []
};

export default PurchasedCyberlimbComponent;
