import React from 'react';
import PropTypes from 'prop-types';

const ModificationButton = ({ attName, buttonClass, maxPoints, pointsLeft, modificationFunction, attType, symbol }) => {
	console.error(buttonClass);
	return (
		<td>
			<button
				className={`btn ${buttonClass}`}
				onClick={() => {
					if (pointsLeft > 0) {
						modificationFunction({
							attribute: attName,
							max: maxPoints,
							spend: attType
						});
					}
				}}
			>
				{symbol}
			</button>
		</td>
	);
};

ModificationButton.propTypes = {
	attName: PropTypes.string.isRequired,
	buttonClass: PropTypes.string.isRequired,
	maxPoints: PropTypes.number.isRequired,
	pointsLeft: PropTypes.number.isRequired,
	modificationFunction: PropTypes.func.isRequired,
	attType: PropTypes.string.isRequired,
	symbol: PropTypes.string.isRequired
};

export default ModificationButton;
