import React from 'react';
import PropTypes from 'prop-types';

const CyberlimbAttribute = ({incrementAttribute, decrementAttribute, attribute, att}) => {
	return (
		<div className="col">
			<h5>{att}</h5>
			<div className="row justify-content-center">
				<button
					className="btn btn-success col-3 col-sm-2 col-md-1"
					onClick={incrementAttribute}
				>
					+
				</button>
				<div className="col-auto text-center">
					<strong>{attribute}</strong>
				</div>
				<button
					className="btn btn-warning col-3 col-sm-2 col-md-1"
					onClick={decrementAttribute}
				>
					-
				</button>
			</div>
		</div>
	);
};

CyberlimbAttribute.propTypes = {
	incrementAttribute: PropTypes.func.isRequired,
	decrementAttribute: PropTypes.func.isRequired,
	attribute: PropTypes.number.isRequired,
	att: PropTypes.string.isRequired
};

export default CyberlimbAttribute;
