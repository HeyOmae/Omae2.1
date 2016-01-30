'use strict';

import React from 'react';
let metatypeData = require('json!./data/metatype.json'),
	priorityData = require('json!./data/priority.json');

require('styles//MetatypeSelector.sass');

class MetatypeSelectorComponent extends React.Component {
	render() {
		const {rating} = this.props;
		let buttonElements = [];
		for(let type in metatypeData) {
			buttonElements.push(
				<MetatypeButton type={type} option={type in priorityData[rating].metatype}/>
			);
		}
		return (
			<div className="metatypeselector-component">
				<h2>Metatype</h2>
				<div className="btn-group">
					{buttonElements}
				</div>
			</div>
		);
	}
}

const MetatypeButton = ({type, option}) => {
	return(
		<label className={'btn btn-primary ' + (option ? '' : 'disabled')} >
			<input type="radio" name="metatype-selector" id={'metatype-' + type} autoComplete="off" /> {type}
		</label>
	)
}

MetatypeSelectorComponent.displayName = 'MetatypeSelectorComponent';

// Uncomment properties you need
// MetatypeSelectorComponent.propTypes = {};
// MetatypeSelectorComponent.defaultProps = {};

export default MetatypeSelectorComponent;
