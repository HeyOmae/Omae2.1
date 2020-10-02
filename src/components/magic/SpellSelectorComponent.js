import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../ModalButtonComponent';
import DisplayTable from '../DisplayTableComponent';
import FilterTable from '../FilterableTable';

import spellData from '../../data/spells.json';
import complexformData from '../../data/complexforms.json';

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
			},
		};

	return (buildHeader[category] || buildHeader.default)();
}

function createSpellNameWithOptions(spellName) {
	const partsOfName = {
			start: '',
			end: '',
			placeholderText: '',
		},
		nameWithNoOptions = spellName.replace(
			/\[[\s\S]*\]/g,
			(match, offset, string) => {
				partsOfName.placeholderText = match;
				partsOfName.start = offset === 0 ? '' : string.slice(0, offset);
				partsOfName.end = string.slice(string.indexOf(']') + 1);
				return '';
			},
		);
	if (!partsOfName.start && !partsOfName.end) {
		partsOfName.start = nameWithNoOptions;
	}

	return partsOfName;
}

function spellNameTableData({ start, end, placeholderText }, name) {
	return (
		<td>
			{start}
			{placeholderText && (
				<input
					className="form-control spell-option"
					type="text"
					ref={`spellOption${name}`}
					placeholder={placeholderText}
				/>
			)}
			{end}
		</td>
	);
}

spellNameTableData.propTypes = {
	start: PropTypes.string.isRequired,
	end: PropTypes.string.isRequired,
	placeholderText: PropTypes.string.isRequired,
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
		</tr>
	) : (
		<tr key={`spell-${spellID}${spellName.start}${spellName.end}`}>
			{button}
			{spellNameTableData(spellName, spellDetails.name)}
			<td>{spellDetails.descriptor}</td>
			<td>{spellDetails.type}</td>
			<td>{spellDetails.range}</td>
			{spellDetails.damage === '0' ? null : (
				<td>{spellDetails.damage}</td>
			)}
			<td>{spellDetails.duration}</td>
			<td>{spellDetails.dv}</td>
			<td>{`${spellDetails.source} p${spellDetails.page}`}</td>
		</tr>
	);
}

function generateSpellDetailTablesRows(
	arrayOfSpells,
	generateBtnFn,
	abilityType,
) {
	const spellTables = {};
	let spellID = 0;

	arrayOfSpells.forEach((spell, spellIndex) => {
		const { category = abilityType } = spell;
		let spellTableData = spellTables[category];

		if (!spellTableData) {
			spellTables[category] = {
				header: createSpellCategoryLabel(spell.damage, category),
				body: [],
			};
			spellTableData = spellTables[category];
		}

		const spellName = createSpellNameWithOptions(spell.name),
			addSpellButton = (
				<td>{generateBtnFn(spell, spellName, spellIndex)}</td>
			);

		spellTableData.body.push(
			createSpellIndividualRow(
				spellName,
				spell,
				addSpellButton,
				spellID++,
			),
		);
	});

	return spellTables;
}

class SpellSelectorComponent extends React.Component {
	render() {
		const {
				abilities,
				addSpell,
				removeSpell,
				selectedSpells,
				spellMax,
			} = this.props,
			activeAbility = {
				Spells: () => {
					return spellData;
				},
				'Complex Forms': () => {
					return complexformData;
				},
			},
			abilityData = activeAbility[abilities](),
			generateAddSpellButton = (spell, spellName) => {
				const addSpellClick = () => {
					if (spellMax > selectedSpells.length) {
						// eslint-disable-next-line react/no-string-refs
						const spellNameOptions = this.refs[
								`spellOption${spell.name}`
							]
								? this.refs[`spellOption${spell.name}`].value
								: '',
							newName =
								spellName.start +
								spellNameOptions +
								spellName.end,
							spellToAdd = Object.assign({}, spell, {
								name: newName,
							});
						if (spellToAdd.bonus) {
							spellToAdd.bonus = spellNameOptions.replace(
								/[()]/g,
								'',
							);
						}
						addSpell({ newSpell: spellToAdd });
					}
				};

				return (
					<button className="btn btn-success" onClick={addSpellClick}>
						+
					</button>
				);
			},
			spellsToSeletTables = generateSpellDetailTablesRows(
				abilityData,
				generateAddSpellButton,
				abilities,
			),
			addSpellModals = Object.keys(spellsToSeletTables).map(
				(spellCat) => {
					return (
						<Modal
							key={`spells-${spellCat}`}
							modalName={spellCat}
							modalContent={
								<SpellsTables
									spellRowData={spellsToSeletTables[spellCat]}
								/>
							}
						/>
					);
				},
			);

		return (
			<div className="spells">
				<div className="spell-selector row">
					<div className="col">{addSpellModals}</div>
				</div>
				<SpellSelectedDisplay
					selectedSpells={selectedSpells}
					removeSpell={removeSpell}
				/>
			</div>
		);
	}
}

SpellSelectorComponent.propTypes = {
	abilities: PropTypes.string.isRequired,
	addSpell: PropTypes.func.isRequired,
	removeSpell: PropTypes.func.isRequired,
	selectedSpells: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
	spellMax: PropTypes.number.isRequired,
};

const SpellSelectedDisplay = ({ selectedSpells, removeSpell }) => {
	const generateRemoveSpellButton = (spell, spellName, index) => {
			const removeSpellClick = () => {
				removeSpell({ spellIndex: index });
			};
			return (
				<button className="btn btn-warning" onClick={removeSpellClick}>
					-
				</button>
			);
		},
		spellTableData = generateSpellDetailTablesRows(
			selectedSpells,
			generateRemoveSpellButton,
		),
		spellDisplayTables = Object.keys(spellTableData).map((spellCat) => {
			const spellCatagoryData = spellTableData[spellCat];
			return (
				<div
					key={`selected-${spellCat}`}
					className={`selected-spell-in-${spellCat} col`}
				>
					<h4>{spellCat}</h4>
					<DisplayTable
						header={spellCatagoryData.header}
						body={spellCatagoryData.body}
					/>
				</div>
			);
		});

	return (
		<div className="selected-spells row">
			<div className="col">{spellDisplayTables}</div>
		</div>
	);
};

SpellSelectedDisplay.propTypes = {
	selectedSpells: PropTypes.arrayOf(PropTypes.object).isRequired,
	removeSpell: PropTypes.func.isRequired,
};

const SpellsTables = ({ spellRowData }) => {
	return (
		<div className="col">
			<FilterTable tableData={spellRowData} />
		</div>
	);
};

SpellsTables.propTypes = {
	spellRowData: PropTypes.shape({
		header: PropTypes.element.isRequired,
		body: PropTypes.arrayOf(PropTypes.element.isRequired),
	}).isRequired,
};

export default SpellSelectorComponent;
