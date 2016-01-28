'use strict';

import React from 'react';

require('styles//PriorityTable.sass');

class PriorityTableComponent extends React.Component {
	render() {
		return (
			<PriorityTable className="prioritytable-component" />
		);
	}
}

const PriorityLabel = props => {
	return (
		<tr>
			<th>Priority</th>
			<th>Metatype</th>
			<th>Attributes</th>
			<th>Magic/Resonance</th>
			<th>Skills</th>
			<th>Resources</th>
		</tr>
	);
};

const PriorityDataCell = ({ rating }) => {
	return (
		<th>
			{rating}
		</th>
		
	);
};

const PriorityRow = props => {
	return (
		<tr>
			<PriorityDataCell rating={props.rating}/>
		</tr>
	);
};

const PriorityTable = props => {
	return (
		<table>
			<tbody>
				<PriorityLabel />
				<PriorityRow rating="A"/>
			</tbody>
		</table>
	);
};

PriorityTableComponent.displayName = 'PriorityTableComponent';

// Uncomment properties you need
// PriorityTableComponent.propTypes = {};
// PriorityTableComponent.defaultProps = {};

export default PriorityTableComponent;
