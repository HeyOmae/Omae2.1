import React from 'react';
import PropTypes from 'prop-types';

const DisplayTableComponent = ({ header, body, children, striped, invert }) => {
	return (
		<table
			className={`table table-responsive-lg ${
				striped && 'table-striped'
			} ${invert && 'table-inverse'}`}
		>
			<thead>{header}</thead>
			<tbody>{body || children}</tbody>
		</table>
	);
};

DisplayTableComponent.propTypes = {
	header: PropTypes.element.isRequired,
	body: PropTypes.arrayOf(PropTypes.element),
	children: PropTypes.node,
	striped: PropTypes.bool,
	invert: PropTypes.bool,
};

DisplayTableComponent.defaultProps = {
	body: null,
	children: null,
	striped: false,
	invert: false,
};

export default DisplayTableComponent;
