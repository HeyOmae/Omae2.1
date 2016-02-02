require('normalize.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
require('styles/App.css');

import React from 'react';

class AppComponent extends React.Component {
	render() {
		const {actions, priorityTable, selectMetatype, attributes} = this.props;
		return (
			<div className="index">
				<div className="program-title">
					<h1>Omae v 2</h1>
					<p>Shadowrun 5<sup>th</sup> Edition Character Generator</p>
				</div>
			</div>
		);
	}
}

AppComponent.defaultProps = {
};

export default AppComponent;
