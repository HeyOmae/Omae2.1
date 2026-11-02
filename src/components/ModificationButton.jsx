import React from 'react';
import PropTypes from 'prop-types';

const ModificationButton = ({ attName = '!!!!!!!!!!!!!!!!!!!!', buttonClass, maxPoints = 999, pointsLeft = 1, modificationFunction, attType = 'notDefined', symbol }) => (
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

ModificationButton.propTypes = {
	attName: PropTypes.string,
	buttonClass: PropTypes.string.isRequired,
	maxPoints: PropTypes.number,
	pointsLeft: PropTypes.number,
	modificationFunction: PropTypes.func.isRequired,
	attType: PropTypes.string,
	symbol: PropTypes.string.isRequired,
};

export default ModificationButton;
