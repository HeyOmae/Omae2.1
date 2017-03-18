import React from 'react';
import Modal from '../ModalComponent';
import PropTypeChecking from '../../config/propTypeChecking';

import '../../styles/export/Reddit.sass';

const RedditComponent = ({priority, metatype, attributes, augmentedAtt, magres, skills, spellsAndPowers, qualities, karma, purchaseGear}) => {
	let activeSkills = '',
		learnedSpells = '',
		selectedQualities = '',
		gearBought = '';

	const totalKarma = karma > 7 ? 7 : karma;

	Object.keys(qualities).forEach((qualityKey) => {
		const qualityArray = qualities[qualityKey];

		if (Array.isArray(qualityArray)) {
			qualityArray.forEach((quality) => {
				selectedQualities += `${quality.name} | ${quality.category} | ${quality.source} p${quality.page}
`;
			});
		}
	});

	Object.keys(skills.active).forEach((name) => {
		const skill = skills.active[name];

		let rating = 0,
			dp = attributes[skill.attribute];

		Object.keys(skill).forEach((prop) => {
			const currRating = skill[prop];

			if (typeof currRating === 'number') {
				rating += currRating;
				dp += currRating;
			}
		});

		activeSkills += `${name} | ${rating} | ${attributes[skill.attribute]} | ${skill.spec || '–'} | ${dp} ${skill.spec ? `(${dp + 2})` : ''}
`;

	});

	const propsToIgnore = ['id', 'limit', 'adeptway'];

	function generateSpellHeader(spell) {
		let header = '',
			tableBreak = '';

		Object.keys(spell).forEach((detailName) => {
			if (propsToIgnore.indexOf(detailName) === -1 && typeof spell[detailName] !== 'object') {
				if (!header) {
					header += `\n${detailName}`;
					tableBreak += '\n---';
				} else {
					header += ` | ${detailName}`;
					tableBreak += '|---';
				}
			}
		});
		return `${header + tableBreak}\n`;
	}

	// TODO: This doesn't work very well, refactor
	Object.keys(spellsAndPowers).forEach((magicCat) => {
		const magicAbility = spellsAndPowers[magicCat],
			header = {};
		if (Array.isArray(magicAbility)) {
			magicAbility.forEach((spell) => {
				if (!header[magicCat]) {
					header[magicCat] = generateSpellHeader(spell);
					learnedSpells += header[magicCat];
				}

				Object.keys(spell).forEach((detailName, i) => {
					if (propsToIgnore.indexOf(detailName) < 0 && typeof spell[detailName] !== 'object') {
						const detail = spell[detailName];
						learnedSpells += i === 1 ? detail : ` | ${detail}`;
					}
				});
				learnedSpells += '\n';
			});
		}
	});

	Object.keys(purchaseGear).forEach((gearCategoryName) => {
		const category = purchaseGear[gearCategoryName];
		if (Array.isArray(category)) {
			gearBought += `

### ${gearCategoryName}

Name | Acc | Dam | AP | Reach/RC
----|------|-----|----|--`;
			category.forEach((gear) => {
				gearBought += `
${gear.name} | ${gear.accuracy} | ${gear.damage} | ${gear.ap} | ${gear.type === 'Melee' ? gear.reach : gear.rc}`;
			});
		}
	});

	const formate = `
# [Character Name] – [Player Name]

##Priority

Metatype | Attributes | Mag/Res | Skills | Resources
--------|----------|-------|------|---------
${priority.metatype} | ${priority.attribute} | ${priority.magres} | ${priority.skills} | ${priority.resources}

##Personal Details

**Name/Alias:** [Insert name]

**Metatype:** ${metatype}

Street Cred | Notoriety | Public Awareness
-----------|---------|----------------
0 | 0 | 0

Karma | Total Karma
-----------|---------
${totalKarma} | ${totalKarma}

##Attributes

Bod | Agi | Rea | Str | Wil | Log | Int | Cha | Edg | Mag
---|---|---|---|---|---|---|---|---|---
${
	attributes.bod +
	(augmentedAtt.bod ? `(${augmentedAtt.bod + attributes.bod})` : '')
} | ${
	attributes.agi +
	(augmentedAtt.agi ? `(${augmentedAtt.agi + attributes.agi})` : '')
} | ${
	attributes.rea +
	(augmentedAtt.rea ? `(${augmentedAtt.rea + attributes.rea})` : '')
} | ${
	attributes.str +
	(augmentedAtt.str ? `(${augmentedAtt.str + attributes.str})` : '')
} | ${
	attributes.wil +
	(augmentedAtt.wil ? `(${augmentedAtt.wil + attributes.wil})` : '')
} | ${
	attributes.log +
	(augmentedAtt.log ? `(${augmentedAtt.log + attributes.log})` : '')
} | ${
	attributes.int +
	(augmentedAtt.int ? `(${augmentedAtt.int + attributes.int})` : '')
} | ${
	attributes.cha +
	(augmentedAtt.cha ? `(${augmentedAtt.cha + attributes.cha})` : '')
} | ${
	attributes.edg +
	(augmentedAtt.cha ? `(${augmentedAtt.cha + attributes.cha})` : '')
} | ${
	(attributes.mag || '–') +
	(augmentedAtt.mag ? `(${augmentedAtt.mag + attributes.mag})` : '')
}

###Limits

Physical | Mental | Social
--------|------|------
${Math.ceil(((attributes.str * 2) + attributes.bod + attributes.rea) / 3)} | ${Math.ceil(((attributes.log * 2) + attributes.int + attributes.wil) / 3)} | ${Math.ceil(((attributes.cha * 2) + attributes.wil + (attributes.ess || 6)) / 3)}

##Qualities

Name | Category | Ref
----|------|---
${selectedQualities}

##Magic/Resonance

**Type:** ${magres}

###Spells/Powers

${learnedSpells}

##Skills

###Active

Name | Rating | Attribute | Spec | DP
----|------|---------|----|--
${activeSkills}

##Street Gear${gearBought}
`,
		exportField = (
			<textarea
				className="form-control export-modal"
				value={formate}
				readOnly/>
	);
	return (
		<div className="reddit-component">
			<Modal
				modalName="Export.reddit"
				modalContent={exportField}/>
		</div>
	);
};

RedditComponent.propTypes = {
	priority: PropTypeChecking.priorityTable,
	metatype: React.PropTypes.string.isRequired,
	attributes: React.PropTypes.objectOf(React.PropTypes.number),
	augmentedAtt: React.PropTypes.objectOf(React.PropTypes.number),
	magres: PropTypeChecking.selectMagRes,
	skills: PropTypeChecking.settingSkills,
	spellsAndPowers: PropTypeChecking.spellSelect,
	qualities: PropTypeChecking.quality,
	karma: PropTypeChecking.karma,
	purchaseGear: PropTypeChecking.purchaseGear
};

export default RedditComponent;
