import React from 'react';
import PropTypes from 'prop-types';

const LifeStylePurchasedRowComponent = ({lifestyle}) => (
	<tr>
		<td>Testing</td>
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
};

export default LifeStylePurchasedRowComponent;
