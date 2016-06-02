'use strict';

import React from 'react';
import Modal from '../ModalComponent';
const powerData = require('json!../data/powers.json');

require('styles/magic/SpellSelector.sass');

//helper functions
function createSpellCategoryLabel (SpellsObj, {category}) {
	if(!SpellsObj[category]) {
		SpellsObj[category] = [];
		const spellLabel = category + '-label',
			buildHeader = {
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
				}
			};
		
		(buildHeader[category])();
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
	const powerBoni = {
		selectattribute: (attributes) => {
			let options = [];
			attributes.attribute.forEach((attName) => {
				let loweCase = attName.toLowerCase();
				options.push(<option key={powerName+'-'+attName}> ({loweCase}) </option>);
			});

			return (<select className='form-control' ref={'spellOption'+powerName}>{options}</select>);
		},
		default: (thing) => {
			// console.log(powerName, thing);

			return Object.keys(thing).join(', ');
		}
	};

	for(let effect in boni) {
		return (powerBoni[effect]||powerBoni.default)(boni[effect]);
	}
}

function createSpellIndividualRow(spellArray, spellName, spellDetails, button, spellID) {
	//TODO: refactor this to not be complete bulldrek

	const buildRow = {
		Powers: () => {
			spellArray[spellDetails.category].push(
				<tr key={'complexform-'+ (spellID)}>
					{button}
					<td>{spellDetails.levels === 'yes'? 1 : 'N/A'}</td>
					<td>{spellName.start}</td>
					<td>{spellDetails.points}</td>
					<td>{spellDetails.bonus?powerBonus(spellDetails.bonus, spellDetails.name):'N/A'}</td>
					<td>{spellDetails.source + ' p' + spellDetails.page}</td>
				</tr>
			);
		}
	};

	(buildRow[spellDetails.category])();

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
							{
								name: newName
							}
						);
						if (spellToAdd.bonus) {
							spellToAdd.bonus = spellNameOptions.replace(/[()]/g, '');
						}
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
