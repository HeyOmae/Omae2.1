import React from 'react';
import PropTypes from 'prop-types';

const ModificationButton = ({ attName = '', buttonClass, maxPoints = 6, pointsLeft = undefined, modificationFunction, attType = 'baseSpent', symbol = '' }) => {
	return (
		<td>
			<button
				className={`btn ${buttonClass ? buttonClass: ''}`}
				onClick={() => {
					console.log(pointsLeft);
					if (pointsLeft === undefined || pointsLeft > 0) {
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
	pointsLeft: PropTypes.number,
	modificationFunction: PropTypes.func.isRequired,
	attType: PropTypes.string.isRequired,
	symbol: PropTypes.string
};

ModificationButton.defaultProps = {
	pointsLeft: undefined,
	symbol: ''
};

export default ModificationButton;
