'use strict';

import React from 'react';
import RedditExport from './export/RedditComponent';
const metatypeData = require('json!./data/metatype.json'),
	priorityTableData = require('json!./data/priority.json');

require('styles//Summary.sass');

const TableRowHeader = () => {
	return <tr><th>Name</th><th>Ref</th></tr>;
};

const SummaryComponent = ({priority, metatype, attributes, magres, skills, fixed, spellsAndPowers, selectedQualities, karma}) => {
	let priorityHead = [],
		priorityData = [],
		attributesHead = [],
		attributesData = [],
		skillData = [],
		points = {
			skills: priorityTableData[priority.skills].skills.skillpoints - skills.skillPointsSpent,
			skillGroups: (priorityTableData[priority.skills].skills.grouppoints || 0) - skills.groupPointSpent
		},
		calculatedStats = {
			attributes: {}
		},
		displaySpellsPowers = [
			<TableRowHeader key="summary-spell-header"/>
		],
		displayQualities = {
			Positive: [<TableRowHeader key="summary-quality--positive--header"></TableRowHeader>],
			Negative: [<TableRowHeader key="summary-quality--negative--header"></TableRowHeader>]
		};
	for(let pariorityCategory in priority) {
		priorityHead.push(<th key={'summary-priority-head-' + pariorityCategory}>{pariorityCategory}</th>);
		priorityData.push(<td key={'summary-priority-data-' + pariorityCategory}>{priority[pariorityCategory]}</td>);
	}

	const generateQualityTableRow = (quality) => {
		return(<tr><td>{quality.name}</td><td>{quality.source} p{quality.page}</td></tr>);
	};

	displayQualities.Positive = selectedQualities.Positive.map(generateQualityTableRow);
	displayQualities.Negative = selectedQualities.Negative.map(generateQualityTableRow);

	for(let att in metatypeData[metatype.typeName].min) {
		let baseAtt = metatypeData[metatype.typeName].min[att],
			currentAtt = baseAtt + attributes[att];
		calculatedStats.attributes[att] = currentAtt;
		attributesHead.push(<th key={'summary-attribute-head-' + att}>{att}</th>);
		attributesData.push(<td key={'summary-attribute-data-' + att}>{currentAtt}{attributes.augmented[att]?`(${attributes.augmented[att]+currentAtt})`:null}</td>);
	}

	const magicPriorityData = priorityTableData[priority.magres].magic[magres];

	if(magicPriorityData && magres !== 'mundane') {
		let baseMagic = magicPriorityData.attribute.points;
		calculatedStats.attributes.mag = baseMagic + (attributes.special || 0);
		attributesHead.push(<th key={'summary-attribute-head-mag'}>mag</th>);
		attributesData.push(<td key={'summary-attribute-data-mag'}>{calculatedStats.attributes.mag}</td>);
		for(let magicCat in spellsAndPowers) {
			let spellPowerArray = spellsAndPowers[magicCat];
			if (Array.isArray(spellPowerArray)){
				spellPowerArray.forEach((spell, index)=>{
					displaySpellsPowers.push(
						<tr key={'summary-' + (magicCat||'complex-form') + spell.name + index}><td>{spell.name}</td><td>{spell.source} p{spell.page}</td></tr>
					);
				});
			}
		}
	}

	for(let skillName in skills.active) {
		let currSkill = skills.active[skillName],
			att = calculatedStats.attributes[currSkill.attribute],
			currDP = att;

		for(let prop in currSkill) {
			let currRating = currSkill[prop];

			if(typeof currRating === 'number') {
				currDP += currRating;
			}
		}

		skillData.push(
			<tr key={'skill-'+skillName}>
				<td>{skillName}</td>
				<td>{currDP}{currSkill.spec?`(${currDP + 2})`: null}</td>
			</tr>
		);
	}

	return (
		<div className={'summary-component ' + (fixed ? 'fixed':'')}>
			<h1>Summary Character</h1>

			<div className="table-responsive">
				<h2>Priority</h2>
				<table className="table">
					<thead>
						<tr>
							{priorityHead}
						</tr>
					</thead>
					<tbody>
						<tr>
							{priorityData}
						</tr>
					</tbody>
				</table>
			</div>

			<div>
				<h2>Metatype</h2>
				<div className="col-xs-12">{metatype.typeName}</div>
			</div>

			<div className="table-responsive">
				<h2>Attributes</h2>
				<table className="table">
					<thead>
						<tr>
							{attributesHead}
						</tr>
					</thead>
					<tbody>
						<tr>
							{attributesData}
						</tr>
					</tbody>
				</table>
			</div>

			<div>
				<h2>Karma</h2>
				<p><strong>{karma}</strong></p>
			</div>

			<div className="summary-qualities">
				<h2>Qualities</h2>
				{ selectedQualities.Positive.length > 0 ?
					<div className="table-responsive">
						<h3>Positive</h3>
						<table className="table">
							<tbody>
								{displayQualities.Positive}
							</tbody>
						</table>
					</div>
					: null
				}
				{ selectedQualities.Negative.length > 0 ?
					<div className="table-responsive">
						<h3>Negative</h3>
						<table className="table">
							<tbody>
								{displayQualities.Negative}
							</tbody>
						</table>
					</div>
					: null
				}
			</div>

			<div>
				<h2>Magic/Resonacne</h2>
				{magres}
				{displaySpellsPowers.length > 1 ?
					<div className="table-responsive">
						<h3>Spells/Powers</h3>
						<table className="table">
							<tbody>
								{displaySpellsPowers}
							</tbody>
						</table>
					</div>
				:
					null
				}
				
			</div>

			<div>
				<h2>Skills</h2>
				<table className="table">
					<thead>
						<tr>
							<th>SP</th>
							<th>SGP</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>{points.skills}</strong></td>
							<td><strong>{points.skillGroups}</strong></td>
						</tr>
					</tbody>
				</table>
				<h3>Active Skills</h3>
				<table className="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>DicePool</th>
						</tr>
					</thead>

					<tbody>
						{skillData}
					</tbody>
				</table>
			</div>

			<div>
				<h2>Export</h2>
				<RedditExport
					priority={priority}
					metatype={metatype.typeName}
					attributes={calculatedStats.attributes}
					augmentedAtt={attributes.augmented}
					magres={magres}
					skills={skills}
					spellsAndPowers={spellsAndPowers}
					qualities={selectedQualities}
					karma={karma}/>
			</div>
		</div>
	);
};

export default SummaryComponent;
