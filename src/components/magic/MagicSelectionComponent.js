import React from 'react';
import PropTypes from 'prop-types';
import 'styles/magic/MagicSelection.sass';
import SpellSelector from './SpellSelectorComponent';
import PowerSelector from './PowerSelectorComponent';
import priorityData from '../../data/priority.json';
import PropTypeChecking from '../../config/propTypeChecking';


class MagicSelectionComponent extends React.PureComponent {
	render() {
		const {magicPriority, magictype, magicAttribute, selectedSpellsPowers, actions} = this.props,
			awakenTypes = ['Mage', 'Mystic', 'Technomancer', 'Adept', 'Aspected', 'mundane'],
			priorityMagic = priorityData[magicPriority].magic[magictype],
			magicAtt = (priorityMagic && priorityMagic.attribute && priorityMagic.attribute.points) + magicAttribute,
			magicPriorityStats = priorityData[magicPriority].magic,
			toggleAbilities = {
				Mage() {
					const mageAbilities = toggleAbilities.default();
					mageAbilities.spells = true;
					return mageAbilities;
				},
				Mystic() {
					const mysticAbilities = toggleAbilities.default();
					mysticAbilities.spells = true;
					mysticAbilities.powers = true;
					return mysticAbilities;
				},
				Technomancer() {
					const technoAbilities = toggleAbilities.default();
					technoAbilities.complexforms = true;
					return technoAbilities;
				},
				Adept() {
					const adeptAbilities = toggleAbilities.default();
					adeptAbilities.powers = true;
					return adeptAbilities;
				},
				Aspected() { return toggleAbilities.Mage(); },
				default() {
					return {
						spells: false,
						powers: false,
						complexforms: false
					};
				}
			},
			displayAbilities = (toggleAbilities[magictype] || toggleAbilities.default)();
		const awakenButtons = [];
		let spellMax = 0;

		if (magicPriorityStats[magictype] && magicPriorityStats[magictype].spells) {
			spellMax = magicPriorityStats[magictype].spells.points;
		}

		function changeMagicType(magicTypeName) {
			actions.selectMagictype(magicTypeName);
			const reset = {
				Mage() {
					actions.resetAbility({ability: 'complexforms'});
					actions.resetAbility({ability: 'powers'});
				},
				Mystic() {
					actions.resetAbility({ability: 'complexforms'});
					actions.resetAbility({ability: 'powers'});
				},
				Technomancer() {
					actions.resetAbility({ability: 'powers'});
					actions.resetAbility({ability: 'spells'});
				},
				Aspected() { return reset.Mage(); },
				default() {
					actions.resetAbility({ability: 'powers'});
					actions.resetAbility({ability: 'spells'});
					actions.resetAbility({ability: 'complexforms'});
				}
			};
			(reset[magicTypeName] || reset.default)();
		}

		awakenTypes.forEach((typeName) => {
			const selectedMagictype = magictype === typeName;
			awakenButtons.push(
				<AwakenButton
					typeName={typeName}
					anOption={typeName in magicPriorityStats}
					checked={selectedMagictype}
					selectMagicTypeAction={changeMagicType}
					resetFreeMagicSkills={actions.setMagicSkills}
					key={`awaken-selection-${typeName}`}
				/>
			);
		});

		return (
			<div className="magicselection-component">
				<h2>Magic/Resonance</h2>
				<div className="scroll-overflow">
					<div className="btn-group">
						{awakenButtons}
					</div>
				</div>
				{
					displayAbilities.spells ?
						<div>
							<h3>Spells</h3>
							<SpellSelector
								abilities="Spells"
								addSpell={actions.addSpell}
								removeSpell={actions.removeSpell}
								selectedSpells={selectedSpellsPowers.spells}
								spellMax={spellMax}
							/>
						</div>
					:
					null
				}
				{
					displayAbilities.powers ?
						<div>
							<h3>Adept Powers</h3>
							<PowerSelector
								actions={actions}
								selectedPowers={selectedSpellsPowers.powers}
								pointSpent={selectedSpellsPowers.powerPointsSpent}
								maxPointPoints={magicAtt}
								isMystic={magictype === 'Mystic'}
								karmaSpent={selectedSpellsPowers.powerPointsKarma}
							/>
						</div>
					:
					null
				}
				{
					displayAbilities.complexforms ?
						<div>
							<h3>Complex Forms</h3>
							<SpellSelector
								abilities="Complex Forms"
								addSpell={actions.addComplexform}
								removeSpell={actions.removeComplexform}
								selectedSpells={selectedSpellsPowers.complexforms}
								spellMax={spellMax}
							/>
						</div>
					:
					null
				}
			</div>
		);
	}
}


const AwakenButton = ({typeName, anOption, checked, selectMagicTypeAction, resetFreeMagicSkills}) => {
	return (
		<label
			className={`btn
			${(!anOption && checked ? 'btn-danger' : 'btn-primary')}
			${(anOption ? '' : 'disabled')}
			${(checked ? 'active' : '')}`
			}
			htmlFor={`awakentype-${typeName}`}
		>
			<input
				type="radio"
				name="magres-selector"
				id={`awakentype-${typeName}`}
				autoComplete="off"
				checked={checked}
				onChange={() => {
					if (anOption) {
						selectMagicTypeAction(typeName);
						resetFreeMagicSkills({magicSkills: [null, null]});
					}
				}}
			/>
			{typeName}
		</label>
	);
};

AwakenButton.propTypes = {
	typeName: PropTypes.string.isRequired,
	anOption: PropTypes.bool.isRequired,
	checked: PropTypes.bool.isRequired,
	selectMagicTypeAction: PropTypes.func.isRequired,
	resetFreeMagicSkills: PropTypes.func.isRequired
};

MagicSelectionComponent.displayName = 'MagicMagicSelectionComponent';

// Uncomment properties you need
MagicSelectionComponent.propTypes = {
	magicPriority: PropTypes.string.isRequired,
	magictype: PropTypeChecking.selectMagRes.isRequired,
	magicAttribute: PropTypes.number.isRequired,
	selectedSpellsPowers: PropTypeChecking.spellSelect.isRequired,
	actions: PropTypeChecking.actions.isRequired
};
// MagicSelectionComponent.defaultProps = {};

export default MagicSelectionComponent;
