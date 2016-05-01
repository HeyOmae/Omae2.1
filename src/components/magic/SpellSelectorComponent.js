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

function createSpellIndividualRow(spellArray, spellName, spellDetails, button, spellID) {
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

function generateSpellDetailTablesRows(arrayOfSpells, generateBtnFn) {
	let spellTables = {},
		spellID = 0;

	arrayOfSpells.forEach((spell, spellIndex)=>{
		spellTables = createSpellCategoryLabel(spellTables, spell);

		let spellName = createSpellNameWithOptions(spell.name),
			addSpellButton = (<td>{generateBtnFn(spell, spellName, spellIndex)}</td>);

		//need to make a Extended class component to make this work
		spellTables = createSpellIndividualRow(spellTables, spellName, spell, addSpellButton, spellID++);
	});

	return spellTables;
}

class SpellSelectorComponent extends React.Component {
	render() {
		const {addSpell, removeSpell, selectedSpells} = this.props;
		let spellsToSeletTables = {},
			addSpellModals = [],
			generateAddSpellButton = (spell, spellName) => {
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
		spellsToSeletTables = generateSpellDetailTablesRows(spellData, generateAddSpellButton);

		for(let spellCat in spellsToSeletTables) {
			addSpellModals.push(
				<Modal
					key={'spells-' + spellCat}
					modalName={spellCat}
					modalContent={
						<SpellsTables
							spellRow={spellsToSeletTables[spellCat]}/>
					}
				/>
			);
		}

		return (
			<div className="spells">
				<div className="spell-selector">
					<div className="btn-group">
						{addSpellModals}
					</div>
				</div>
				<SpellSelectedDisplay
						selectedSpells={selectedSpells}
						removeSpell={removeSpell}/>
			</div>
		);
	}
}

const SpellSelectedDisplay = ({selectedSpells, removeSpell}) => {
	let spellTableData = {},
		spellDisplayTables = [],
		generateRemoveSpellButton = (spell, spellName, index) => {
			let removeSpellClick = () => {
				removeSpell({spellIndex: index});
			};
			return (<button className="btn btn-warning" onClick={removeSpellClick}>-</button>);
		};

	spellTableData = generateSpellDetailTablesRows(selectedSpells, generateRemoveSpellButton);

	for(let spellCat in spellTableData) {
		spellDisplayTables.push(
			<div key={'selected-'+ spellCat} className={'selected-spell-in-' + spellCat}>
				<h4>{spellCat}</h4>
				<SpellsTables
					spellRow = {spellTableData[spellCat]}/>
			</div>
		);
	}
	return (
		<div className="selected-spells">
			{spellDisplayTables}
		</div>
	);
};

const SpellsTables = ({spellRow}) => {
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
