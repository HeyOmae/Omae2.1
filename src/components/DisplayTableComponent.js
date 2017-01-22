import React from 'react';

import 'styles//DisplayTable.scss';

const DisplayTableComponent = ({header, body}) => {
	return (
		<table className="table">
			<thead>{header}</thead>
			<tbody>{body}</tbody>
		</table>
	);
};

DisplayTableComponent.propTypes = {
	header: React.PropTypes.element.isRequired,
	body: React.PropTypes.arrayOf(React.PropTypes.element)
};


export default DisplayTableComponent;
