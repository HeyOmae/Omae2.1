import React from 'react';
import PropTypes from 'prop-types';
import LifeStyleData from '../../data/lifestyle.json';

class LifeStyleComponent extends React.PureComponent {
	componentWillMount() {
		const [discard, ...lifestyles] = LifeStyleData.lifestyles.lifestyle;
		this.lifestyles = lifestyles;
	}

	render() {
		return (
			<div className="life-style-component">
				<h3>Life Styles</h3>
				<table className="table">
					<thead>
						<th>Select</th>
						<th>Name</th>
						<th>¥</th>
						<th>Ref</th>
					</thead>
					<tbody>
						{
							this.lifestyles.map((lifestyle) => {
								return (
									<tr key={lifestyle.id} className="lifestyle--item">
										<td className="lifestyle--item__select">
											<button
												className="btn btn-success"
												onClick={() => {
												this.props.purchaseGear({
													gear: lifestyle,
													category: 'lifestyles',
												});
											}}>
												+
											</button>
										</td>
										<td className="lifestyle--item__name">
											{lifestyle.name}
										</td>
										<td className="lifestyle--item__cost">
											{lifestyle.cost}
										</td>
										<td className="lifestyle--item__reference">
											{lifestyle.source} {lifestyle.page}p
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
}

LifeStyleComponent.propType = {
	purchaseGear: PropTypes.func.isRequired,
};

export default LifeStyleComponent;
