'use strict';

import React from 'react';
import Modal from '../ModalComponent';
const spellData = require('json!../data/spells.json');

require('styles/magic/SpellSelector.sass');

class SpellSelectorComponent extends React.Component {
	render() {
		const {addSpell, removeSpell, selectedSpells} = this.props;
		let spells = {},
			addSpellModals = [],
			spellID = 0;

		console.log(selectedSpells);

		//generated spell details to populate addSpellModals
		spellData.forEach((spell)=>{
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

			spells = createSpellCategoryLabel(spells, spell);

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
				if (!partsOfName.start) {
					partsOfName.start = nameWithNoOptions;
				}

				return partsOfName;
			}

			let spellName = createSpellNameWithOptions(spell.name),
				spellNameOptions = this.refs['spellOption'+spell.name] ? this.refs['spellOption'+spell.name].value : '',
				addSpellClick = () => {
					let newName = spellName.start + spellNameOptions + spellName.end,
						spellToAdd = Object.assign(
							{},
							spell,
							{name: newName}
						);
					addSpell({newSpell: spellToAdd});
				};

			//need to make a Extended class component to make this work
			spells[spell.category].push(
				<tr key={'spell-'+ (spellID++)}>
					<td><button className="btn btn-success" onClick={addSpellClick}>+</button></td>
					<td>
						{spellName.start}
						{spellName.placeholderText ?
							<input
								className="form-control spell-option"
								type="text"
								ref={'spellOption'+spell.name}
								placeholder={spellName.placeholderText}/>
							:null
						}
						{spellName.end||null}
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
