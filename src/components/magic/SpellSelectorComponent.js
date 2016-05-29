'use strict';

import React from 'react';
import Modal from '../ModalComponent';
const spellData = require('json!../data/spells.json');
const complexformData = require('json!../data/complexforms.json');
const powerData = require('json!../data/powers.json');

require('styles/magic/SpellSelector.sass');

//helper functions
function createSpellCategoryLabel (SpellsObj, {category, damage}) {
	if(!SpellsObj[category]) {
		SpellsObj[category] = [];
		const spellLabel = category + '-label',
			buildHeader = {
				'Complex Forms': () => {
					SpellsObj[category].push(
						<tr key={spellLabel} className={spellLabel}>
							<th>Learn</th>
							<th>Complex Form</th>
							<th>Target</th>
							<th>Duration</th>
							<th>Fade</th>
							<th>Ref</th>
						</tr>
					);
				},
				Powers: () => {
					SpellsObj[category].push(
						<tr key={spellLabel} className={spellLabel}>
							<th>Learn</th>
							<th>Rating</th>
							<th>Power</th>
							<th>Cost</th>
							<th>Bonus</th>
							<th>Ref</th>
						</tr>
					);
				},
				default: () => {
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
			};
		
		(buildHeader[category] || buildHeader.default)();
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

function powerBonus(boni, powerName) {
	const powerBonus = {
		selectattribute: (attributes) => {
			let options = [];
			attributes.attribute.forEach((attName) => {
				let loweCase = attName.toLowerCase();
				options.push(<option key={powerName+'-'+attName} value={loweCase}>{loweCase}</option>);
			});
			console.log(powerName, attributes, options);

			return (<select className='form-control'>{options}</select>);
		},
		default: (thing) => {
			console.log(powerName, thing);

			return 'placeholder here';
		}
	};

	for(let effect in boni) {
		return (powerBonus[effect]||powerBonus.default)(boni[effect]);
	}
}

function createSpellIndividualRow(spellArray, spellName, spellDetails, button, spellID) {
	//TODO: refactor this to not be complete bulldrek

	const buildRow = {
		'Complex Forms': () => {
			spellArray[spellDetails.category].push(
				<tr key={'complexform-'+ (spellID)}>
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
					<td>{spellDetails.target}</td>
					<td>{spellDetails.duration}</td>
					<td>{spellDetails.fv}</td>
					<td>{spellDetails.source + ' p' + spellDetails.page}</td>
				</tr>
			);
		},

		Powers: () => {
			spellArray[spellDetails.category].push(
				<tr key={'complexform-'+ (spellID)}>
					{button}
					<td>{spellDetails.levels === 'yes'? 1 : 'N/A'}</td>
					<td>{spellName.start}</td>
					<td>{spellDetails.points}</td>
					<td>{spellDetails.bonus?powerBonus(spellDetails.bonus, spellName.start):'N/A'}</td>
					<td>{spellDetails.source + ' p' + spellDetails.page}</td>
				</tr>
			);
		},

		default: () => {
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
		}
	};

	(buildRow[spellDetails.category]||buildRow.default)();

	return spellArray;
}

function generateSpellDetailTablesRows(arrayOfSpells, generateBtnFn, abilityType) {
	let spellTables = {},
		spellID = 0;

	arrayOfSpells.forEach((spell, spellIndex)=>{
		if(!spell.category) {
			spell.category = abilityType;
		}
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
		const {abilities, addSpell, removeSpell, selectedSpells, spellMax} = this.props,
		activeAbility = {
			Spells: () => {
				return spellData;
			},
			'Complex Forms': () => {
				return complexformData;
			},
			Powers: () => {
				return powerData;
			}
		},
		abilityData = activeAbility[abilities]();
		let spellsToSeletTables = {},
			addSpellModals = [],
			generateAddSpellButton = (spell, spellName) => {
			let addSpellClick = () => {
				if(spellMax > selectedSpells.length) {
					let spellNameOptions = this.refs['spellOption'+spell.name] ? this.refs['spellOption'+spell.name].value : '',
						newName = spellName.start + spellNameOptions + spellName.end,
						spellToAdd = Object.assign(
							{},
							spell,
							{name: newName}
						);
					addSpell({newSpell: spellToAdd});
				}
			};
			
			return (<button className="btn btn-success" onClick={addSpellClick}>+</button>);
		};

		//generated spell details to populate addSpellModals
		spellsToSeletTables = generateSpellDetailTablesRows(abilityData, generateAddSpellButton, abilities);

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
