require('normalize.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
require('styles/App.css');

import React from 'react';
import PriorityTableComponent from './PriorityTableComponent';
import MetatypeSelector from './MetatypeSelectorComponent';

class AppComponent extends React.Component {
	render() {
		const {actions, priorityTable} = this.props;
		return (
			<div className="index container">
				<div className="program-title">
					<h1>Omae v 2</h1>
					<p>Shadowrun 5<sup>th</sup> Edition Character Generator</p>
				</div>
				<h2>Priority Table</h2>
				<PriorityTableComponent actions={actions.priorityTable} priorityTable={priorityTable} />
				<MetatypeSelector rating={priorityTable.metatype}/>
			</div>
		);
	}
}

AppComponent.defaultProps = {
};

export default AppComponent;
