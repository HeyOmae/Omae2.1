'use strict';

import React from 'react';
import Modal from '../ModalComponent';

require('styles/export/Reddit.sass');

const RedditComponent = ({priority, metatype, attributes, augmentedAtt, magres, skills, spellsAndPowers}) => {
	let activeSkills = '',
		learnedSpells = '';

	for(let name in skills.active) {
		let skill = skills.active[name],
			rating = 0,
			dp = attributes[skill.attribute];

		for(let prop in skill) {
			let currRating = skill[prop];

			if(typeof currRating === 'number') {
				rating = currRating;
				dp += currRating;
			}
		}

		activeSkills += `${name} | ${rating} | ${attributes[skill.attribute]} | ${skill.spec || '–'} | ${dp} ${skill.spec?`(${dp+2})`:''}
`;
	}

	function generateSpellHeader(spell, detailsToIgnore) {
		let header = '',
			tableBreak = '';
		for(let detailName in spell) {
			if(detailsToIgnore.indexOf(detailName) > -1 || typeof spell[detailName] === 'object') {
				continue;
			} else if (!header) {
				header += `\n${detailName}`;
				tableBreak += `\n---`;
			} else {
				header += ' | ' + detailName;
				tableBreak += '|---';
			}
		}

		return header + tableBreak + '\n';
	}

	const detailsToIgnore = ['id', 'limit', 'adeptway'];

	for(let magicCat in spellsAndPowers) {
		let magicAbility = spellsAndPowers[magicCat],
			header = {};
		if (Array.isArray(magicAbility)){
			magicAbility.forEach((spell) => {
				if(magicCat === 'spells' && !spell.description) {
					spell.description = '';
				}

				if (!header[magicCat]) {
					header[magicCat] = generateSpellHeader(spell, detailsToIgnore);
					learnedSpells += header[magicCat];
				}

				const spellDetails = Object.keys(spell);

				for(let i = 0, len = spellDetails.length - 1; i <= len; ++i) {
					const detailName = spellDetails[i];
					if (detailsToIgnore.indexOf(detailName) < 0 && typeof spell[detailName] !== 'object') {
						const detail = spell[detailName];
						if(i !== len) {
							learnedSpells += detail + ' | ';
						} else {
							learnedSpells += `${detail}\n`;
						}
						
					} else {
						continue;
					}
				}
			});
		}
	}

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
0 | 0

##Attributes

Bod | Agi | Rea | Str | Wil | Log | Int | Cha | Edg | Mag
---|---|---|---|---|---|---|---|---|---
${
	attributes.bod +
	(augmentedAtt.bod?`(${augmentedAtt.bod+attributes.bod})`:'')
} | ${
	attributes.agi +
	(augmentedAtt.agi?`(${augmentedAtt.agi+attributes.agi})`:'')
} | ${
	attributes.rea +
	(augmentedAtt.rea?`(${augmentedAtt.rea+attributes.rea})`:'')
} | ${
	attributes.str +
	(augmentedAtt.str?`(${augmentedAtt.str+attributes.str})`:'')
} | ${
	attributes.wil +
	(augmentedAtt.wil?`(${augmentedAtt.wil+attributes.wil})`:'')
} | ${
	attributes.log +
	(augmentedAtt.log?`(${augmentedAtt.log+attributes.log})`:'')
} | ${
	attributes.int +
	(augmentedAtt.int?`(${augmentedAtt.int+attributes.int})`:'')
} | ${
	attributes.cha +
	(augmentedAtt.cha?`(${augmentedAtt.cha+attributes.cha})`:'')
} | ${
	attributes.edg +
	(augmentedAtt.cha?`(${augmentedAtt.cha+attributes.cha})`:'')
} | ${
	(attributes.mag||'–') +
	(augmentedAtt.mag?`(${augmentedAtt.mag+attributes.mag})`:'')
}

###Limits

Physical | Mental | Social
--------|------|------
${Math.ceil((attributes.str*2 + attributes.bod + attributes.rea)/3)} | ${Math.ceil((attributes.log*2 + attributes.int + attributes.wil)/3)} | ${Math.ceil((attributes.cha*2 + attributes.wil + (attributes.ess||6))/3)}

##Magic/Resonance

**Type:** ${magres}

###Spells/Powers

${learnedSpells}

##Skills

###Active

Name | Rating | Attribute | Spec | DP
----|------|---------|----|--
${activeSkills}
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

export default RedditComponent;
