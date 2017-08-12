import React from 'react';
import PropTypes from 'prop-types';

import 'styles//DisplayTable.scss';

const DisplayTableComponent = ({header, body, children}) => {
	return (
		<table className="table table-responsive">
			<thead>{header}</thead>
			<tbody>{body || children}</tbody>
		</table>
	);
};

DisplayTableComponent.propTypes = {
	header: PropTypes.element.isRequired,
	body: PropTypes.arrayOf(PropTypes.element),
	children: PropTypes.node
};

DisplayTableComponent.defaultProps = {
	body: null,
	children: null
};


export default DisplayTableComponent;
