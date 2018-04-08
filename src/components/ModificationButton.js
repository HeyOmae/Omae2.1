import React from 'react';
import PropTypes from 'prop-types';

const ModificationButton = ({ attName, buttonClass, maxPoints, pointsLeft, modificationFunction, attType, symbol }) => {
	return (
		<button
			className={`btn ${buttonClass}`}
			onClick={() => {
				if (pointsLeft === undefined || pointsLeft > 0) {
					modificationFunction({
						attribute: attName,
						max: maxPoints,
						spend: attType,
					});
				}
			}}
			>
			{symbol}
		</button>
	);
};

ModificationButton.propTypes = {
	attName: PropTypes.string,
	buttonClass: PropTypes.string.isRequired,
	maxPoints: PropTypes.number,
	pointsLeft: PropTypes.number,
	modificationFunction: PropTypes.func.isRequired,
	attType: PropTypes.string,
	symbol: PropTypes.string.isRequired,
};

ModificationButton.defaultProps = {
	pointsLeft: 1,
	attName: '!!!!!!!!!!!!!!!!!!!!',
	maxPoints: 999,
	attType: 'notDefined',
};

export default ModificationButton;
