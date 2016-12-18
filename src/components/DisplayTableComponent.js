'use strict';

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


export default DisplayTableComponent;
