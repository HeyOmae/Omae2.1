import React from 'react';
import PropTypes from 'prop-types';
import DisplayTable from '../../DisplayTableComponent';

class PurchasedAugmentationComponent extends React.PureComponent {
	render() {
		const {augmentations, sellAugment} = this.props;

		return (
			<div className="purchased-augmentations col-12">
				<h4>Augmentations</h4>
				<DisplayTable
					header={
						<tr>
							<th>Sell</th>
							<th>Name</th>
							<th>Essense</th>
							<th>Avail</th>
							<th>Cost</th>
							<th>Ref</th>
						</tr>
					}
				>
					{augmentations.map((aug, index) => {
						return (
								// eslint-disable-next-line react/no-array-index-key
							<tr key={`augmentations-${aug.name}-${index}`}>
								<td>
									<button
										className="btn btn-warning"
										onClick={() => {
											sellAugment({
												index,
												category: 'augmentations',
												gear: aug,
											});
										}}
									>-</button>
								</td>
								<td>{aug.name}</td>
								<td>{aug.ess}</td>
								<td>{aug.avail}</td>
								<td>{aug.cost}&yen;</td>
								<td>{aug.source} {aug.page}p</td>
							</tr>
						);
					})}
				</DisplayTable>
			</div>
		);
	}
}

PurchasedAugmentationComponent.propTypes = {
	augmentations: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			ess: PropTypes.number.isRequired,
			avail: PropTypes.string.isRequired,
			cost: PropTypes.number.isRequired,
			source: PropTypes.string.isRequired,
			page: PropTypes.string.isRequired,
		}).isRequired,
	),
	sellAugment: PropTypes.func.isRequired,
};

PurchasedAugmentationComponent.defaultProps = {
	augmentations: [],
};

export default PurchasedAugmentationComponent;
