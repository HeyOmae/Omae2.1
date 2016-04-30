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

			let spellNameStart = null,
				spellNameEnd = '',
				spellPlaceholderInput = '',
				spellName = spell.name.replace(/\[[\s\S]*\]/g, (match, offset, string) => {
					spellPlaceholderInput = match;
					spellNameStart = offset === 0 ? '' : string.slice(0, offset);
					spellNameEnd = string.slice(string.indexOf(']') + 1);
					return '';
				}),
				spellNameOptions = this.refs['spellOption'+spell.name],
				addSpellClick = () => {
					let newName = spellNameOptions ? ((spellNameStart?spellNameStart:'') + spellNameOptions.value + spellNameEnd) : spell.name,
						spellToAdd = Object.assign(
							{},
							spell,
							{name: newName}
						);
					addSpell({newSpell: spellToAdd});
				};

			spells[spell.category].push(
				<tr key={'spell-'+ (spellID++)}>
					<td><button className="btn btn-success" onClick={addSpellClick}>+</button></td>
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
				<div>
					<table>
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

export default SpellSelectorComponent;
