import React from 'react';
import Modal from '../ModalButtonComponent';
import Skillgroup from './SkillgroupsComponent';
import skillsData from '../../data/skills.json';
import priorityTableData from '../../data/priority.json';
import FreeSkills from './FreeSkills';
import ActiveSkill from './ActiveSkill';
import DisplaySkills from './DisplaySkills';
import PropTypeChecking from '../../config/propTypeChecking';

import '../../styles/skills/ActiveSkills.sass';

// helper functions
function calculateGroupPointsLeft(prioritySkill, groupPointSpent) {
	return priorityTableData[prioritySkill].skills.grouppoints
				- groupPointSpent;
}

class SkillsComponent extends React.PureComponent {
	componentWillMount() {
		const {actions, priority, skills, magictype} = this.props,
			attAbriviation = {
				Agility: 'agi',
				Body: 'bod',
				Reaction: 'rea',
				Strength: 'str',
				Charisma: 'cha',
				Intuition: 'int',
				Logic: 'log',
				Will: 'wil',
				Magic: 'special',
				Resonance: 'special'
			},
			skillPointsLeft = priorityTableData[priority.skills].skills.skillpoints
				- skills.skillPointsSpent,
			awakened = [
				'Mage',
				'Mystic',
				'Adept',
				'Aspected'
			],
			groupPointsLeft = calculateGroupPointsLeft(priority.skills, skills.groupPointSpent),
			priorityMagicData = priorityTableData[priority.magres].magic[magictype];

		function allowedSkill() {
			if (awakened.indexOf(magictype) > -1) {
				return 'Magic';
			} else if (magictype === 'Technomancer') {
				return 'Resonance';
			}
			return false;
		}

		const listOfSkills = Object.keys(skillsData.active).map((skillAttribute) => {
			const skillinCategory = skillsData.active[skillAttribute],
				attributeAbriv = attAbriviation[skillAttribute];


			return (
				<Modal
					key={`skill-${skillAttribute}`}
					modalName={skillAttribute}
					modalContent={
						<ActiveSkill
							skillList={skillinCategory}
							actions={actions}
							skills={skills.active}
							skillPointsLeft={skillPointsLeft}
							restrictedSkills={attributeAbriv === 'special' ? skillAttribute !== allowedSkill() : false}
							/>
					}
				/>
			);
		});

		this.listOfSkills = listOfSkills;
		this.priorityDataFreeSkills = priorityMagicData ? priorityMagicData.skills : null;
		this.groupPointsLeft = groupPointsLeft;
	}

	componentWillUpdate(nextProps) {
		const prevProps = this.props,
			nextPriorityMagicData = priorityTableData[nextProps.priority.magres].magic[nextProps.magictype];

		if (nextProps.priority.skills !== prevProps.priority.skills || nextProps.skills.groupPointSpent !== prevProps.skills.grouppoints) {
			this.groupPointsLeft = calculateGroupPointsLeft(nextProps.priority.skills, nextProps.skills.groupPointSpent);
		}

		if (nextPriorityMagicData) {
			this.priorityDataFreeSkills = nextPriorityMagicData.skills;
		} else if (nextPriorityMagicData === undefined) {
			this.priorityDataFreeSkills = null;
		}
	}

	render() {
		const {actions, skills, attributes, metatype, priority} = this.props,
			{listOfSkills, priorityDataFreeSkills, groupPointsLeft} = this,
			skillPointsLeft = priorityTableData[priority.skills].skills.skillpoints
				- skills.skillPointsSpent;

		return (
			<div className="activeskills-component">
				{priorityDataFreeSkills ? <h3>Free Skills</h3> : null}
				<FreeSkills
					priorityDataFreeSkills={priorityDataFreeSkills}
					magicSkills={skills.magicSkills}
					setMagicSkills={actions.setMagicSkills}
					/>
				<h3>Skill Groups</h3>
				<div className="row">
					<div className="col">
						<Skillgroup
							skillgroups={skills.groups}
							skillgroupsData={skillsData.groups}
							actions={actions}
							pointsLeft={groupPointsLeft} />
					</div>
				</div>

				<h3>Active Skills</h3>
				<div className="row">
					<div className="col">
						{listOfSkills}
					</div>
				</div>
				{Object.keys(skills.active).length > 0 ?
					(<div className="table-responsive">
						<h3>Skill List</h3>
						<DisplaySkills
							activeSkills={skills.active}
							actions={actions}
							attributes={attributes}
							metatype={metatype}
							skillPointsLeft={skillPointsLeft} />
					</div>)
					: null
				}
			</div>
		);
	}
}

SkillsComponent.displayName = 'SkillsSkillsComponent';

// Uncomment properties you need
SkillsComponent.propTypes = {
	actions: PropTypeChecking.actions.isRequired,
	priority: PropTypeChecking.priorityTable.isRequired,
	skills: PropTypeChecking.settingSkills.isRequired,
	attributes: PropTypeChecking.attributes.isRequired,
	metatype: PropTypeChecking.selectMetatype.isRequired,
	magictype: PropTypeChecking.selectMagRes.isRequired
};
// SkillsComponent.defaultProps = {};

export default SkillsComponent;
