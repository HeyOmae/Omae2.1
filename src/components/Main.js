require('normalize.css');
require('styles/bootstrap-overwrite.scss');
require('styles/App.css');

import React from 'react';

class AppComponent extends React.Component {
	render() {
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
