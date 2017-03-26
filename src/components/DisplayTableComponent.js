import React from 'react';

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
	header: React.PropTypes.element.isRequired,
	body: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
};


export default DisplayTableComponent;
