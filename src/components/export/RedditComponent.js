'use strict';

import React from 'react';
import Modal from '../ModalComponent';

require('styles/export/Reddit.sass');

const RedditComponent = ({priority, metatype, attributes, magres, skills}) => {
	let activeSkills = '';

	for(let name in skills.active) {
		let skill = skills.active[name],
			dp = attributes[skill.attribute] + skill.rating;
		activeSkills += `${name} | ${skill.rating} | ${attributes[skill.attribute]} | ${skill.spec || '–'} | ${dp} ${skill.spec?`(${dp+2})`:''}
`;
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
${attributes.bod} | ${attributes.agi} | ${attributes.rea} | ${attributes.str} | ${attributes.wil} | ${attributes.log} | ${attributes.int} | ${attributes.cha} | ${attributes.edg} | ${attributes.mag}

###Limits

Physical | Mental | Social
--------|------|------
${Math.ceil((attributes.str*2 + attributes.bod + attributes.rea)/3)} | ${Math.ceil((attributes.log*2 + attributes.int + attributes.wil)/3)} | ${Math.ceil((attributes.cha*2 + attributes.wil + (attributes.ess||6))/3)}

##Magic/Resonance

**Type:** ${magres}

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
	)
	return (
		<div className="reddit-component">
			<Modal
				modalName="Export.reddit"
				modalContent={exportField}/>
		</div>
	);
}

export default RedditComponent;
