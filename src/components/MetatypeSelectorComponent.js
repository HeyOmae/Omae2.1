'use strict';

import React from 'react';
let metatypeData = require('json!./data/metatype.json'),
	priorityData = require('json!./data/priority.json');

require('styles//MetatypeSelector.sass');

class MetatypeSelectorComponent extends React.Component {
	render() {
		const {priorityRating, metatype, action} = this.props;
		let buttonElements = [],
			racialDetails = [],
			currentMetaData = metatypeData[metatype];

		for(let typeName in metatypeData) {
			let selectedMetatype = metatype === typeName;
			buttonElements.push(
				<MetatypeButton
					typeName={typeName}
					anOption={typeName in priorityData[priorityRating].metatype}
					checked={selectedMetatype}
					key={typeName}
					selectMetatypeAction = {action}
				/>
			);

			if(selectedMetatype) {
				let racials = metatypeData[typeName].racial;
				for(let trait in racials) {
					racialDetails.push(
						<p key={typeName + trait}>
							<strong>{trait}: </strong>
							{racials[trait]}
						</p>
					)
				}
			}
		}
		return (
			<div className="metatypeselector-component">
				<h2>Metatype</h2>
				<div className="btn-group">
					{buttonElements}
				</div>
				<div className='row'>
					<div className='col-xs-6'>
						<h3>Racial Traits</h3>
						{racialDetails}
					</div>
					<div className='col-xs-6'>
						<h3>Reference</h3>
						<strong>{currentMetaData.reference.book}</strong> p{currentMetaData.reference.page}
					</div>
				</div>
			</div>
		);
	}
}

const MetatypeButton = ({typeName, anOption, checked, selectMetatypeAction}) => {
	return(
		<label className={`btn
			${(!anOption && checked ? 'btn-danger' : 'btn-primary')}
			${(anOption ? '' : 'disabled')}
			${(checked ? 'active' : '')}`
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
