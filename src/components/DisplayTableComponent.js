'use strict';

import React from 'react';

require('styles//DisplayTable.scss');

const DisplayTableComponent = ({header, body}) => {
	return (
		<table className="table">
			<thead>{header}</thead>
			<tbody>{body}</tbody>
		</table>
	);
};


export default DisplayTableComponent;
