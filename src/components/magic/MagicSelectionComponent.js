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
			spells = {},
			spellModals = [],
			spellID = 0;

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
			if(!spells[spell.category]) {
				spells[spell.category] = [];
				spells[spell.category].push(
					<tr key={spell.category + '-label'}>
						<th>Learn</th>
						<th>Spell</th>
						<th>Descriptor</th>
						<th>Type</th>
						<th>Range</th>
						{spell.damage === '0' ? null: <th>Damage</th>}
						<th>Duration</th>
						<th>Drain</th>
						<th>Ref</th>
					</tr>
				);
			}

			let spellNameStart = null,
				spellNameEnd = '',
				spellPlaceholderInput = '',
				spellName = spell.name.replace(/\[[\s\S]*\]/g, (match, offset, string) => {
					spellPlaceholderInput = match;
					spellNameStart = offset === 0 ? '' : string.slice(0, offset);
					spellNameEnd = string.slice(string.indexOf(']') + 1);
					return '';
				});

			spells[spell.category].push(
				<tr key={'spell-'+ (spellID++)}>
					<td><button className="btn btn-success" onClick={()=>{console.log(this.refs['spellOption'+spell.name].value);}}>+</button></td>
					<td>
						{spellNameStart === null ? spellName:spellNameStart}
						{spellPlaceholderInput?
							<input
								className="form-control spell-option"
								type="text"
								ref={'spellOption'+spell.name}
								placeholder={spellPlaceholderInput}/>
							:null
						}
						{spellNameEnd||null}
						</td>
					<td>{spell.descriptor}</td>
					<td>{spell.type}</td>
					<td>{spell.range}</td>
					{spell.damage === '0' ? null: <td>{spell.damage}</td>}
					<td>{spell.duration}</td>
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
		<div className="table-responsive">
		<table className="table">
			<tbody>
				{spellRow}
			</tbody>
		</table>
		</div>
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
