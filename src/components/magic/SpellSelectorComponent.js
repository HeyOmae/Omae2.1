import React from 'react';
import 'styles/magic/SpellSelector.sass';
import Modal from '../ModalComponent';
import DisplayTable from '../DisplayTableComponent';
import FilterTable from '../FilterableTable';

import spellData from '../data/spells.json';
import complexformData from '../data/complexforms.json';


// helper functions
function createSpellCategoryLabel(damage, category) {
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
	const partsOfName = {
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

function spellNameTableData({start, end, placeholderText}, name) {
	return (
		<td>
			{start}
			{placeholderText ?
				<input
					className="form-control spell-option"
					type="text"
					ref={`spellOption${name}`}
					placeholder={placeholderText}/>
				: null
			}
			{end || null}
		</td>
	);
}

spellNameTableData.propTypes = {
	start: React.PropTypes.string.isRequired,
	end: React.PropTypes.string.isRequired,
	placeholderText: React.PropTypes.string
};

function createSpellIndividualRow(spellName, spellDetails, button, spellID) {
	return spellDetails.category === 'Complex Forms' ? (
		<tr key={`complexform-${spellID}${spellName.start}${spellName.end}`}>
			{button}
			{spellNameTableData(spellName, spellDetails.name)}
			<td>{spellDetails.target}</td>
			<td>{spellDetails.duration}</td>
			<td>{spellDetails.fv}</td>
			<td>{`${spellDetails.source} p${spellDetails.page}`}</td>
		</tr>)
			:
		(<tr key={`spell-${spellID}${spellName.start}${spellName.end}`}>
			{button}
			{spellNameTableData(spellName, spellDetails.name)}
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

function generateSpellDetailTablesRows(arrayOfSpells, generateBtnFn, abilityType) {
	const spellTables = {};
	let spellID = 0;

	arrayOfSpells.forEach((spell, spellIndex) => {
		const {category = abilityType} = spell;
		let spellTableData = spellTables[category];

		if (!spellTableData) {
			spellTables[category] = {
				header: createSpellCategoryLabel(spell.damage, category),
				body: []
			};
			spellTableData = spellTables[category];
		}

		const spellName = createSpellNameWithOptions(spell.name),
			addSpellButton = (<td>{generateBtnFn(spell, spellName, spellIndex)}</td>);

		// eslint-disable-next-line no-plusplus
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
			abilityData = activeAbility[abilities](),
			generateAddSpellButton = (spell, spellName) => {
				const addSpellClick = () => {
					if (spellMax > selectedSpells.length) {
						const spellNameOptions = this.refs[`spellOption${spell.name}`] ? this.refs[`spellOption${spell.name}`].value : '',
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
			},
			spellsToSeletTables = generateSpellDetailTablesRows(abilityData, generateAddSpellButton, abilities),
			addSpellModals = Object.keys(spellsToSeletTables).map((spellCat) => {
				return (
					<Modal
						key={`spells-${spellCat}`}
						modalName={spellCat}
						modalContent={
							<SpellsTables
								spellData={spellsToSeletTables[spellCat]}/>
						}
					/>
				);
			});

		return (
			<div className="spells">
				<div className="spell-selector">
					{addSpellModals}
				</div>
				<SpellSelectedDisplay
					selectedSpells={selectedSpells}
					removeSpell={removeSpell}/>
			</div>
		);
	}
}

SpellSelectorComponent.propTypes = {
	abilities: React.PropTypes.string.isRequired,
	addSpell: React.PropTypes.func.isRequired,
	removeSpell: React.PropTypes.func.isRequired,
	selectedSpells: React.PropTypes.arrayOf(
			React.PropTypes.object.isRequired
		).isRequired,
	spellMax: React.PropTypes.number.isRequired
};

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
