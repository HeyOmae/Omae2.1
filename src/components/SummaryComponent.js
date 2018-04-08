import React from 'react';
import PropTypes from 'prop-types';
import RedditExport from './export/RedditComponent';
import metatypeData from '../data/metatype.json';
import priorityTableData from '../data/priority.json';
import PropTypeChecking from '../config/propTypeChecking';

import '../styles/Summary.sass';

const TableHeader = () => {
	return <thead><tr><th>Name</th><th>Ref</th></tr></thead>;
};

const SummaryComponent = (
	{
		priority,
		metatype,
		attributes,
		magres,
		skills,
		fixed,
		spellsAndPowers,
		selectedQualities,
		karma,
		purchaseGear,
	}) => {
	const priorityHead = [],
		priorityData = [],
		attributesHead = [],
		attributesData = [],
		skillData = [],
		points = {
			skills: priorityTableData[priority.skills].skills.skillpoints - skills.skillPointsSpent,
			skillGroups: (
				priorityTableData[priority.skills].skills.grouppoints || 0
			) - skills.groupPointSpent,
		},
		calculatedStats = {
			attributes: {},
		},
		displaySpellsPowers = [],
		displayQualities = {
			Positive: [],
			Negative: [],
		};

	Object.keys(priority).forEach((pariorityCategory) => {
		priorityHead.push(<th key={`summary-priority-head-${pariorityCategory}`}>{pariorityCategory}</th>);
		priorityData.push(<td key={`summary-priority-data-${pariorityCategory}`}>{priority[pariorityCategory]}</td>);
	});

	const generateQualityTableRow = (quality) => {
		return (
			<tr key={`summary--${quality.name}`}>
				<td>{quality.name}</td><td>{quality.source} p{quality.page}</td>
			</tr>
		);
	};

	displayQualities.Positive = selectedQualities.Positive.map(generateQualityTableRow);
	displayQualities.Negative = selectedQualities.Negative.map(generateQualityTableRow);

	Object.keys(metatypeData[metatype.typeName].min).forEach((att) => {
		const baseAtt = metatypeData[metatype.typeName].min[att],
			currentAtt = baseAtt + attributes[att];
		calculatedStats.attributes[att] = currentAtt;
		attributesHead.push(<th key={`summary-attribute-head-${att}`}>{att}</th>);
		attributesData.push(<td key={`summary-attribute-data-${att}`}>{currentAtt}{attributes.augmented[att] ? `(${attributes.augmented[att] + currentAtt})` : null}</td>);
	});

	const magicPriorityData = priorityTableData[priority.magres].magic[magres];

	if (magicPriorityData && magres !== 'mundane') {
		const baseMagic = magicPriorityData.attribute.points,
			specialType = magres === 'Technomancer' ? 'res' : 'mag',
			essencePenalty = Math.ceil(attributes.ess);

		calculatedStats.attributes[specialType] = baseMagic + (attributes.special || 0) - essencePenalty;
		attributesHead.push(<th key={'summary-attribute-head-mag'}>{specialType}</th>);
		attributesData.push(<td key={'summary-attribute-data-mag'}>{calculatedStats.attributes[specialType]}</td>);
		Object.keys(spellsAndPowers).forEach((magicCat) => {
			const spellPowerArray = spellsAndPowers[magicCat];
			if (Array.isArray(spellPowerArray)) {
				spellPowerArray.forEach((spell) => {
					displaySpellsPowers.push(
						<tr key={`summary-${(magicCat || 'complex-form')}${spell.name}`}><td>{spell.name}</td><td>{spell.source} p{spell.page}</td></tr>,
					);
				});
			}
		});
	}

	// Display essence
	const essenceLeft = 6 - attributes.ess;
	calculatedStats.attributes.ess = attributes.ess;
	attributesHead.push(<th key={'summary-attribute-head-ess'}>ess</th>);
	attributesData.push(<td key={'summary-attribute-data-ess'}>{essenceLeft}</td>);

	Object.keys(skills.active).forEach((skillName) => {
		const currSkill = skills.active[skillName],
			att = calculatedStats.attributes[currSkill.attribute];
		let currDP = att;

		Object.keys(currSkill).forEach((prop) => {
			const currRating = currSkill[prop];

			if (typeof currRating === 'number') {
				currDP += currRating;
			}
		});


		skillData.push(
			<tr key={`skill-${skillName}`}>
				<td>{skillName}</td>
				<td>{currDP}{currSkill.spec ? `(${currDP + 2})` : null}</td>
			</tr>,
		);
	});

	const PurchasedGearRows = Object.keys(purchaseGear).reduce((rows, gearCategory) => {
		const gearArray = purchaseGear[gearCategory];
		if (Array.isArray(gearArray)) {
			return [
				...rows,
				gearArray.map((gear, index) => {
					return (
						<tr key={`${gear.name + index}-summary-purchase`}>
							<td>{gear.name}</td>
							<td>{gear.source} p{gear.page}</td>
						</tr>
					);
				}),
			];
		}

		return rows;
	}, []);

	return (
		<div className={`summary-component sticky-top ${(fixed ? 'fixed' : '')}`}>
			<h1>Character Summary</h1>

			<div className="scroll-overflow">
				<h2>Priority</h2>
				<table className="table table-responsive">
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
				<div className="col-12">{metatype.typeName}</div>
			</div>

			<div className="scroll-overflow">
				<h2>Attributes</h2>
				<table className="table table-responsive">
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
				{ selectedQualities.Positive.length > 0 &&
					<div className="scroll-overflow">
						<h3>Positive</h3>
						<table className="table table-responsive">
							<TableHeader />
							<tbody>
								{displayQualities.Positive}
							</tbody>
						</table>
					</div>
				}
				{ selectedQualities.Negative.length > 0 &&
					<div className="scroll-overflow">
						<h3>Negative</h3>
						<table className="table table-responsive">
							<TableHeader />
							<tbody>
								{displayQualities.Negative}
							</tbody>
						</table>
					</div>
				}
			</div>

			<div className="scroll-overflow">
				<h2>Magic/Resonacne</h2>
				{magres}
				{displaySpellsPowers.length > 1 &&
					<div className="col scroll-overflow">
						<h3>Spells/Powers</h3>
						<table className="table table-responsive">
							<TableHeader />
							<tbody>
								{displaySpellsPowers}
							</tbody>
						</table>
					</div>
				}
			</div>

			<div className="scroll-overflow">
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

			<div className="scroll-overflow">
				<h2>Gear</h2>
				<p>Nuyen Left: <strong>{priorityTableData[priority.resources].resources - (purchaseGear.nuyen)}&yen;</strong></p>
				<p className={essenceLeft <= 0 ? 'text-danger' : ''}>Essense: <strong>{essenceLeft}</strong></p>
				{PurchasedGearRows.length > 0 &&
					<table className="table table-responsive">
						<TableHeader />
						<tbody>{PurchasedGearRows}</tbody>
					</table>
				}
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
					karma={karma}
					purchaseGear={purchaseGear} />
			</div>
		</div>
	);
};

SummaryComponent.propTypes = {
	priority: PropTypeChecking.priorityTable.isRequired,
	metatype: PropTypeChecking.selectMetatype.isRequired,
	attributes: PropTypeChecking.attributes.isRequired,
	magres: PropTypeChecking.selectMagRes.isRequired,
	skills: PropTypeChecking.settingSkills.isRequired,
	fixed: PropTypes.bool.isRequired,
	spellsAndPowers: PropTypeChecking.spellSelect.isRequired,
	selectedQualities: PropTypeChecking.quality.isRequired,
	karma: PropTypeChecking.karma.isRequired,
	purchaseGear: PropTypeChecking.purchaseGear.isRequired,
};

export default SummaryComponent;
