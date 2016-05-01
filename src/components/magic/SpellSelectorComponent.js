'use strict';

import React from 'react';
import Modal from '../ModalComponent';
const spellData = require('json!../data/spells.json');

require('styles/magic/SpellSelector.sass');

//helper functions
function createSpellCategoryLabel (SpellsObj, {category, damage}) {
	if(!SpellsObj[category]) {
		SpellsObj[category] = [];
		const spellLabel = category + '-label';
		SpellsObj[category].push(
			<tr key={spellLabel} className={spellLabel}>
				<th>Learn</th>
				<th>Spell</th>
				<th>Descriptor</th>
				<th>Type</th>
				<th>Range</th>
				{damage === '0' ? null: <th>Damage</th>}
				<th>Duration</th>
				<th>Drain</th>
				<th>Ref</th>
			</tr>
		);
	}

	return SpellsObj;
}

function createSpellNameWithOptions(spellName) {
	let partsOfName = {
		start: '',
		end: '',
		placeholderText: ''
	},
	nameWithNoOptions = spellName.replace(/\[[\s\S]*\]/g, (match, offset, string) => {
		partsOfName.placeholderText = match;
		partsOfName.start = offset === 0 ? '' : string.slice(0, offset);
		partsOfName.end = string.slice(string.indexOf(']') + 1);
		return '';
	});
	if (!partsOfName.start && !partsOfName.end) {
		partsOfName.start = nameWithNoOptions;
	}

	return partsOfName;
}

function createSpellTable(spellArray, spellName, spellDetails, button, spellID) {
	spellArray[spellDetails.category].push(
		<tr key={'spell-'+ (spellID)}>
			{button}
			<td>
				{spellName.start}
				{spellName.placeholderText ?
					<input
						className="form-control spell-option"
						type="text"
						ref={'spellOption'+spellDetails.name}
						placeholder={spellName.placeholderText}/>
					:null
				}
				{spellName.end||null}
				</td>
			<td>{spellDetails.descriptor}</td>
			<td>{spellDetails.type}</td>
			<td>{spellDetails.range}</td>
			{spellDetails.damage === '0' ? null: <td>{spellDetails.damage}</td>}
			<td>{spellDetails.duration}</td>
			<td>{spellDetails.dv}</td>
			<td>{spellDetails.source + ' p' + spellDetails.page}</td>
		</tr>
	);

	return spellArray;
}

class SpellSelectorComponent extends React.Component {
	render() {
		const {addSpell, removeSpell, selectedSpells} = this.props;
		let spells = {},
			addSpellModals = [];

		console.log(selectedSpells);

		function generateSpellDetailTable(arrayOfSpells, generateBtnFn) {
			let spellTables = {},
				spellID = 0;

			arrayOfSpells.forEach((spell)=>{
				spellTables = createSpellCategoryLabel(spellTables, spell);

				let spellName = createSpellNameWithOptions(spell.name),
					addSpellButton = (<td>{generateBtnFn(spell, spellName)}</td>);

				//need to make a Extended class component to make this work
				spells = createSpellTable(spellTables, spellName, spell, addSpellButton, spellID++);
			});

			return spellTables;
		}

		let generateAddSpellButton = (spell, spellName) => {
			let addSpellClick = () => {
				let spellNameOptions = this.refs['spellOption'+spell.name] ? this.refs['spellOption'+spell.name].value : '',
					newName = spellName.start + spellNameOptions + spellName.end,
					spellToAdd = Object.assign(
						{},
						spell,
						{name: newName}
					);
				addSpell({newSpell: spellToAdd});
			};
			
			return (<button className="btn btn-success" onClick={addSpellClick}>+</button>);
		};

		//generated spell details to populate addSpellModals
		spells = generateSpellDetailTable(spellData, generateAddSpellButton);

		for(let spellCat in spells) {
			addSpellModals.push(
				<Modal
					key={'spells-' + spellCat}
					modalName={spellCat}
					modalContent={
						<SpellsSelection
						spellRow={spells[spellCat]}/>
					}
				/>
			);
		}

		return (
			<div className="spell-selector">
				<div className="btn-group">
					{addSpellModals}
				</div>
				
			</div>
		);
	}
}

const spellSelectedDisplay = ({selectedSpells}) => {
	selectedSpells;
	return (
		<div className="table-responsive">
			<table className="table">
				<thead>
					<tr>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

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

export default SpellSelectorComponent;
