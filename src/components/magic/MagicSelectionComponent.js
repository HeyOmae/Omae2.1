'use strict';

import React from 'react';
import Modal from '../ModalComponent';

require('styles//magic/MagicSelection.sass');
const priorityData = require('json!../data/priority.json');
const spellData = require('json!../data/spells.json');


class MagicSelectionComponent extends React.Component {
	render() {
		const awakenTypes = ['Mage', 'Mystic', 'Technomancer','Adept', 'Aspected', 'mundane'],
			{magicPriority, magictype, actions} = this.props;
		let awakenButtons = [],
			spells = {
				Combat: [],
				Detection: [],
				Health: [],
				Illusion: [],
				Manipulation: [],
				Rituals: [],
				Enchantments: []
			},
			spellModals = [];

		awakenTypes.forEach((typeName) => {
			let selectedMagictype = magictype === typeName;
			awakenButtons.push(
				<AwakenButton
					typeName={typeName}
					anOption={typeName in priorityData[magicPriority].magic}
					checked={selectedMagictype}
					selectMagicTypeAction={actions.selectMagictype}
					resetFreeMagicSkills={actions.setMagicSkills}
					key={'awaken-selection-' + typeName}
				/>
			);
		});

		spellData.forEach((spell)=>{
			spells[spell.category].push(
				<tr key={spell.name.replace(/\s/g, '-')}>
					<td><button className="btn btn-success">+</button></td>
					<td>{spell.name}</td>
					<td>{spell.descriptor}</td>
					<td>{spell.type}</td>
					<td>{spell.range}</td>
					{spell.damage ? <td>{spell.damage}</td> : null}
					<td>{spell.duraction}</td>
					<td>{spell.dv}</td>
					<td>{spell.source + ' p' + spell.page}</td>
				</tr>
			);
		});

		for(let spellCat in spells) {
			spellModals.push(
				<Modal
					key={'spells-' + spellCat}
					modalName={spellCat}
					modalContent={<SpellsSelection
						spellRow={spells[spellCat]}/>}/>
			);
		}

		return (
			<div className="magicselection-component">
				<h2>Magic/Resonance</h2>
				<div className="btn-group">
					{awakenButtons}
				</div>
				<h3>Spells</h3>
				<div className="btn-group">
					{spellModals}
				</div>
			</div>
		);
	}
}

const SpellsSelection = ({spellRow}) => {
	return (
		<table className="table">
			<tbody>
				{spellRow}
			</tbody>
		</table>
	);
};

const AwakenButton = ({typeName, anOption, checked, selectMagicTypeAction, resetFreeMagicSkills}) => {
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
					if(anOption){
						selectMagicTypeAction(typeName);
						resetFreeMagicSkills({magicSkills: [null, null]});
					}
				}}
			/>
				{typeName}
		</label>
	);
};

MagicSelectionComponent.displayName = 'MagicMagicSelectionComponent';

// Uncomment properties you need
// MagicSelectionComponent.propTypes = {};
// MagicSelectionComponent.defaultProps = {};

export default MagicSelectionComponent;
