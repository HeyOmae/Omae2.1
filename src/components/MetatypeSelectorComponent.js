'use strict';

import React from 'react';
let metatypeData = require('json!./data/metatype.json'),
	priorityData = require('json!./data/priority.json');

require('styles//MetatypeSelector.sass');

class MetatypeSelectorComponent extends React.Component {
	render() {
		const {priorityRating, metatype, action} = this.props;
		let buttonElements = [];

		for(let typeName in metatypeData) {
			buttonElements.push(
				<MetatypeButton
					typeName={typeName}
					anOption={typeName in priorityData[priorityRating].metatype}
					checked={metatype === typeName}
					key={typeName}
					selectMetatypeAction = {action}
				/>
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

const MetatypeButton = ({typeName, anOption, checked, selectMetatypeAction}) => {
	return(
		<label className={'btn'
			+ (!anOption && checked ? ' btn-danger' : ' btn-primary')
			+ (anOption ? '' : ' disabled')
			+ (checked ? ' active' : '')
		}>
			<input
				type="radio"
				name="metatype-selector"
				id={'metatype-' + typeName}
				autoComplete="off"
				checked={checked}
				onChange={()=> {
					if(anOption){
						selectMetatypeAction(typeName);
					}
				}}
			/>
				{typeName}
		</label>
	)
}

MetatypeSelectorComponent.displayName = 'MetatypeSelectorComponent';

// Uncomment properties you need
// MetatypeSelectorComponent.propTypes = {};
// MetatypeSelectorComponent.defaultProps = {};

export default MetatypeSelectorComponent;
