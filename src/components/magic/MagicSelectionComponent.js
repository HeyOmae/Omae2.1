'use strict';

import React from 'react';
// import Modal from '../ModalComponent';
import SpellSelector from './SpellSelectorComponent';

require('styles//magic/MagicSelection.sass');
const priorityData = require('json!../data/priority.json');


const MagicSelectionComponent = ({magicPriority, magictype, selectedSpellsPowers, actions}) => {
	const awakenTypes = ['Mage', 'Mystic', 'Technomancer','Adept', 'Aspected', 'mundane'],
		magicPriorityStats = priorityData[magicPriority].magic,
		toggleAbilities = {
			Mage: () => {
				let mageAbilities = toggleAbilities.default();
				mageAbilities.spells = true;
				return mageAbilities;
			},
			Mystic: () => {
				let mysticAbilities = toggleAbilities.default();
				mysticAbilities.spells = true;
				mysticAbilities.powers = true;
				return mysticAbilities;
			},
			Technomancer: () => {
				let technoAbilities = toggleAbilities.default();
				technoAbilities.complexForms = true;
				return technoAbilities;
			},
			Adept: () => {
				let adeptAbilities = toggleAbilities.default();
				adeptAbilities.powers = true;
				return adeptAbilities;
			},
			Aspected: () => { return toggleAbilities.Mage(); },
			default: () => {
				return {
					spells: false,
					powers: false,
					complexForms: false
				};
			}
		},
		displayAbilities = (toggleAbilities[magictype] || toggleAbilities['default'])();
	let awakenButtons = [];

	awakenTypes.forEach((typeName) => {
		let selectedMagictype = magictype === typeName;
		awakenButtons.push(
			<AwakenButton
				typeName={typeName}
				anOption={typeName in magicPriorityStats}
				checked={selectedMagictype}
				selectMagicTypeAction={actions.selectMagictype}
				resetFreeMagicSkills={actions.setMagicSkills}
				key={'awaken-selection-' + typeName}
			/>
		);
	});

	return (
		<div className="magicselection-component">
			<h2>Magic/Resonance</h2>
			<div className="btn-group">
				{awakenButtons}
			</div>
			{
				displayAbilities.spells ?
				<div>
					<h3>Spells</h3>
					<SpellSelector
						abilities="spells"
						addSpell = {actions.addSpell}
						removeSpell = {actions.removeSpell}
						selectedSpells = {selectedSpellsPowers.spells}
						spellMax={magicPriorityStats[magictype].spells.points}
						/>
				</div>
				:
				null
			}
			{
				displayAbilities.complexForms ?
				<div>
					<h3>Complex Forms</h3>
					<SpellSelector
						abilities="complexForms"
						addSpell = {actions.addComplexForm}
						removeSpell = {actions.removeComplexForm}
						selectedSpells = {selectedSpellsPowers.complexForms}
						spellMax={magicPriorityStats[magictype].spells.points}
						/>
				</div>
				:
				null
			}
		</div>
	);
};

const AwakenButton = ({typeName, anOption, checked, selectMagicTypeAction, resetFreeMagicSkills}) => {
	return (
		<label className={`btn
			${(!anOption && checked ? 'btn-danger' : 'btn-primary')}
			${(anOption ? '' : 'disabled')}
			${(checked ? 'active' : '')}`
		}>
			<input
				type="radio"
				name="magres-selector"
				id={'awakentype-' + typeName}
				autoComplete="off"
				checked={checked}
				onChange={()=>{
					if(anOption){
						selectMagicTypeAction(typeName);
						resetFreeMagicSkills({magicSkills: [null, null]});
					}
				}}
			/>
				{typeName}
		</label>
	);
};

MagicSelectionComponent.displayName = 'MagicMagicSelectionComponent';

// Uncomment properties you need
// MagicSelectionComponent.propTypes = {};
// MagicSelectionComponent.defaultProps = {};

export default MagicSelectionComponent;
