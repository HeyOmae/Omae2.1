import React from 'react';
import PropTypes from 'prop-types';

const LifeStylePurchasedRowComponent = ({lifestyle, index, sellLifestyle}) => (
	<tr>
		<td className="lifestyle--purchased__sell">
			<button className="btn btn-warning" onClick={() => sellLifestyle({index, category: 'lifestyles'})}>
				-
			</button>
		</td>
		<td className="lifestyle--purchased__name">{lifestyle.name}</td>
		<td className="lifestyle--purchased__cost">{lifestyle.cost}&yen;</td>
		<td className="lifestyle--purchased__ref">{lifestyle.source} {lifestyle.page}p</td>
	</tr>
);

LifeStylePurchasedRowComponent.propTypes = {
	lifestyle: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired,
	}).isRequired,
	index: PropTypes.number.isRequired,
	sellLifestyle: PropTypes.func.isRequired,
};

export default LifeStylePurchasedRowComponent;
