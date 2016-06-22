'use strict';

import React from 'react';
import Modal from '../ModalComponent';

require('styles/export/Reddit.sass');

const RedditComponent = ({priority, metatype, attributes, augmentedAtt, magres, skills, spellsAndPowers}) => {
	console.log(attributes);
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

	function generateSpellHeader(spell) {
		let header = '',
			tableBreak = '';
		for(let detailName in spell) {
			if(detailName === 'id' || typeof spell[detailName] === 'object') {
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

	for(let magicCat in spellsAndPowers) {
		let magicAbility = spellsAndPowers[magicCat],
			header = '';
		if (typeof magicAbility === 'array'){
			magicAbility.forEach((spell) => {
				if(magicCat === 'spells' && !spell.description) {
					spell.description = '';
				}

				if (!header) {
					header = generateSpellHeader(spell);
					learnedSpells += header;
				}

				const spellDetails = Object.keys(spell);

				for(let i = 0, len = spellDetails.length - 1; i <= len; ++i) {
					const detailName = spellDetails[i];
					if (detailName !== 'id' && typeof spell[detailName] !== 'object') {
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
# (Character Name) – (Player Name)

##Priority

Metatype | Attributes | Mag/Res | Skills | Resources
--------|----------|-------|------|---------
${priority.metatype} | ${priority.attribute} | ${priority.magres} | ${priority.skills} | ${priority.resources}

##Personal Details

**Name/Alias:** (Insert name)

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
	attributes.bod
}${
	augmentedAtt.bod?`(${augmentedAtt.bod+attributes.bod})`:''
} | ${attributes.agi} | ${attributes.rea} | ${attributes.str} | ${attributes.wil} | ${attributes.log} | ${attributes.int} | ${attributes.cha} | ${attributes.edg} | ${attributes.mag||'–'}

###Limits

Physical | Mental | Social
--------|------|------
${Math.ceil((attributes.str*2 + attributes.bod + attributes.rea)/3)} | ${Math.ceil((attributes.log*2 + attributes.int + attributes.wil)/3)} | ${Math.ceil((attributes.cha*2 + attributes.wil + (attributes.ess||6))/3)}

##Magic/Resonance

**Type:** ${magres}

###Spells

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
