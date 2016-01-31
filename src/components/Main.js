require('normalize.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
require('styles/App.css');

import React from 'react';
import PriorityTableComponent from './PriorityTableComponent';
import MetatypeSelector from './MetatypeSelectorComponent';
import AttributesComponent from './AttributesComponent';

class AppComponent extends React.Component {
	render() {
		const {actions, priorityTable, selectMetatype} = this.props;
		return (
			<div className="index container">
				<div className="program-title">
					<h1>Omae v 2</h1>
					<p>Shadowrun 5<sup>th</sup> Edition Character Generator</p>
				</div>
				<h2>Priority Table</h2>
				<PriorityTableComponent actions={actions.priorityTable} priorityTable={priorityTable} />
				<MetatypeSelector priorityRating={priorityTable.metatype} metatype={selectMetatype} action={actions.selectMetatype}/>
				<AttributesComponent priorityRating={priorityTable.attributes} metatype={selectMetatype} />
			</div>
		);
	}
}

AppComponent.defaultProps = {
};

export default AppComponent;
