import React from 'react';
import PropTypes from 'prop-types';

import 'styles//DisplayTable.scss';

const DisplayTableComponent = ({header, body}) => {
	return (
		<div className="table-responsive">
			<table className="table">
				<thead>{header}</thead>
				<tbody>{body}</tbody>
			</table>
		</div>
	);
};

DisplayTableComponent.propTypes = {
	header: PropTypes.element.isRequired,
	body: PropTypes.arrayOf(PropTypes.element).isRequired
};


export default DisplayTableComponent;
