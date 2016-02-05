'use strict';

import React from 'react';

require('styles//magic/MagicSelection.sass');
let priorityData = require('json!../data/priority.json');


class MagicSelectionComponent extends React.Component {
	render() {
		const awakenTypes = ['Mage', 'Mystic', 'Technomancer','Adept', 'Aspected', 'mundane'],
			{magicPriority, magictype, action} = this.props;
		let awakenButtons = []

		awakenTypes.forEach((typeName) => {
			let selectedMagictype = magictype === typeName;
			awakenButtons.push(
				<AwakenButton
					typeName={typeName}
					anOption={typeName in priorityData[magicPriority].magic}
					checked={selectedMagictype}
					selectMagicTypeAction={action}
					key={'awaken-selection-' + typeName}
				/>
			);
		});
		return (
			<div className="magicselection-component">
				<h2>Magic/Resonance</h2>
				{awakenButtons}
			</div>
		);
	}
}

const AwakenButton = ({typeName, anOption, checked, selectMagicTypeAction}) => {
	return (
		<label className={`btn
			${(!anOption && checked ? 'btn-danger' : 'btn-primary')}
			${(anOption ? '' : 'disabled')}
			${(checked ? 'active' : '')}`
		}>
			<input
				type="radio"
				name="magres-selector"
				id={'awakentype-' + typeName}
				autoComplete="off"
				checked={checked}
				onChange={()=>{
					selectMagicTypeAction(typeName);
				}}
			/>
				{typeName}
		</label>
	)
}

MagicSelectionComponent.displayName = 'MagicMagicSelectionComponent';

// Uncomment properties you need
// MagicSelectionComponent.propTypes = {};
// MagicSelectionComponent.defaultProps = {};

export default MagicSelectionComponent;
