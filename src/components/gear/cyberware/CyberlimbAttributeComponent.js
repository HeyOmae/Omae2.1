import React from 'react';
import PropTypes from 'prop-types';
import ModificationButton from '../../ModificationButton';

const CyberlimbAttribute = ({incrementAttribute, decrementAttribute, attributeValue, attributeName}) => {
	return (
		<div className="col">
			<h5>{attributeName}</h5>
			<div className="row justify-content-center">
				<ModificationButton
					attName={attributeName}
					buttonClass="btn-success"
					maxPoints={999}
					pointsLeft={999}
					modificationFunction={incrementAttribute}
					attType="not used"
					symbol="+" />
				<div className="col-auto text-center">
					<strong>{attributeValue}</strong>
				</div>
				<ModificationButton
					attName={attributeName}
					buttonClass="btn-warning"
					maxPoints={999}
					pointsLeft={999}
					modificationFunction={decrementAttribute}
					attType="not used"
					symbol="-" />
			</div>
		</div>
	);
};

CyberlimbAttribute.propTypes = {
	incrementAttribute: PropTypes.func.isRequired,
	decrementAttribute: PropTypes.func.isRequired,
	attributeValue: PropTypes.number.isRequired,
	attributeName: PropTypes.string.isRequired,
};

export default CyberlimbAttribute;
