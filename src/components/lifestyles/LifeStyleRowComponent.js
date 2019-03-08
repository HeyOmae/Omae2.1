import React from 'react';
import PropTypes from 'prop-types';

const LifeStyleRowComponent = ({lifestyle, purchaseGear}) => {
	return (
		<tr className="lifestyle--item">
			<td className="lifestyle--item__select">
				<button
					className="btn btn-success"
					onClick={() => {
					purchaseGear({
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
				{lifestyle.cost}&yen;
			</td>
			<td className="lifestyle--item__reference">
				{lifestyle.source} {lifestyle.page}p
			</td>
		</tr>
	);
};

LifeStyleRowComponent.propTypes = {
	lifestyle: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired,
	}).isRequired,
	purchaseGear: PropTypes.func.isRequired,
};

export default LifeStyleRowComponent;
