import React from 'react';
import Modal from '../ModalComponent';
import DisplayTable from '../DisplayTableComponent';
import FilterTable from '../FilterableTable';

import spellData from '../data/spells.json';
import complexformData from '../data/complexforms.json';

import 'styles/magic/SpellSelector.sass';

// helper functions
function createSpellCategoryLabel({category, damage}) {
	const spellLabel = `${category}-label`,
		buildHeader = {
			'Complex Forms': () => {
				return (
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
			default: () => {
				return (
					<tr key={spellLabel} className={spellLabel}>
						<th>Learn</th>
						<th>Spell</th>
						<th>Descriptor</th>
						<th>Type</th>
						<th>Range</th>
						{damage === '0' ? null : <th>Damage</th>}
						<th>Duration</th>
						<th>Drain</th>
						<th>Ref</th>
					</tr>
				);
			}
		};

	return (buildHeader[category] || buildHeader.default)();
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

function createSpellIndividualRow(spellName, spellDetails, button, spellID) {
	// TODO: refactor this to not be complete bulldrek

	const buildRow = {
		'Complex Forms': () => {
			return (
				<tr key={`complexform-${spellID}${spellName.start}${spellName.end}`}>
					{button}
					<td>
						{spellName.start}
						{spellName.placeholderText ?
							<input
								className="form-control spell-option"
								type="text"
								ref={`spellOption${spellDetails.name}`}
								placeholder={spellName.placeholderText}/>
							: null
						}
						{spellName.end || null}
					</td>
					<td>{spellDetails.target}</td>
					<td>{spellDetails.duration}</td>
					<td>{spellDetails.fv}</td>
					<td>{`${spellDetails.source} p${spellDetails.page}`}</td>
				</tr>
			);
		},
		default: () => {
			return (
				<tr key={`spell-${spellID}${spellName.start}${spellName.end}`}>
					{button}
					<td>
						{spellName.start}
						{spellName.placeholderText ?
							<input
								className="form-control spell-option"
								type="text"
								ref={`spellOption${spellDetails.name}`}
								placeholder={spellName.placeholderText}/>
							: null
						}
						{spellName.end || null}
					</td>
					<td>{spellDetails.descriptor}</td>
					<td>{spellDetails.type}</td>
					<td>{spellDetails.range}</td>
					{spellDetails.damage === '0' ? null : <td>{spellDetails.damage}</td>}
					<td>{spellDetails.duration}</td>
					<td>{spellDetails.dv}</td>
					<td>{`${spellDetails.source} p${spellDetails.page}`}</td>
				</tr>
			);
		}
	};

	return (buildRow[spellDetails.category] || buildRow.default)();

}

function generateSpellDetailTablesRows(arrayOfSpells, generateBtnFn, abilityType) {
	let spellTables = {},
		spellID = 0;

	arrayOfSpells.forEach((spell, spellIndex) => {
		if (!spell.category) {
			spell.category = abilityType;
		}

		let spellTableData = spellTables[spell.category];

		if (!spellTables[spell.category]) {
			spellTables[spell.category] = {
				header: {},
				body: []
			};
			spellTableData = spellTables[spell.category];
			spellTableData.header = createSpellCategoryLabel(spell);
		}

		let spellName = createSpellNameWithOptions(spell.name),
			addSpellButton = (<td>{generateBtnFn(spell, spellName, spellIndex)}</td>);

		spellTableData.body.push(createSpellIndividualRow(spellName, spell, addSpellButton, spellID++));
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
				}
			},
			abilityData = activeAbility[abilities]();
		let spellsToSeletTables = {},
			addSpellModals = [],
			generateAddSpellButton = (spell, spellName) => {
				const addSpellClick = () => {
					if (spellMax > selectedSpells.length) {
						let spellNameOptions = this.refs[`spellOption${spell.name}`] ? this.refs[`spellOption${spell.name}`].value : '',
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

		// generated spell details to populate addSpellModals
		spellsToSeletTables = generateSpellDetailTablesRows(abilityData, generateAddSpellButton, abilities);

		for (const spellCat in spellsToSeletTables) {
			addSpellModals.push(
				<Modal
					key={`spells-${spellCat}`}
					modalName={spellCat}
					modalContent={
						<SpellsTables
							spellData={spellsToSeletTables[spellCat]}/>
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
			const removeSpellClick = () => {
				removeSpell({spellIndex: index});
			};
			return (<button className="btn btn-warning" onClick={removeSpellClick}>-</button>);
		};

	spellTableData = generateSpellDetailTablesRows(selectedSpells, generateRemoveSpellButton);

	for (const spellCat in spellTableData) {
		const spellData = spellTableData[spellCat];
		spellDisplayTables.push(
			<div key={`selected-${spellCat}`} className={`selected-spell-in-${spellCat}`}>
				<h4>{spellCat}</h4>
				<DisplayTable
					header={spellData.header}
					body={spellData.body}/>
			</div>
		);
	}

	return (
		<div className="selected-spells">
			{spellDisplayTables}
		</div>
	);
};

const SpellsTables = ({spellData}) => {
	return (
		<div className="table-responsive">
			<FilterTable tableData={spellData} />
		</div>
	);
};

export default SpellSelectorComponent;
