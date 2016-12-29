import React from 'react';
import Modal from '../ModalComponent';
import Skillgroup from './SkillgroupsComponent';
import FilterTable from '../FilterableTable';
import skillsData from '../data/skills.json';
import metatypeData from '../data/metatype.json';
import priorityTableData from '../data/priority.json';

import '../../styles/skills/ActiveSkills.sass';

class SkillsComponent extends React.Component {
	render() {
		const {actions, priority, skills, attributes, metatype, magictype} = this.props,
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
			awakened = [
				'Mage',
				'Mystic',
				'Adept',
				'Aspected'
			],
			skillPointsLeft = priorityTableData[priority.skills].skills.skillpoints
				- skills.skillPointsSpent,
			groupPointsLeft = priorityTableData[priority.skills].skills.grouppoints
				- skills.groupPointSpent,
			priorityMagicData = priorityTableData[priority.magres].magic[magictype];

		let baseMagicAttribute = 0,
			priorityDataFreeSkills = null;

		if (priorityMagicData) {
			baseMagicAttribute = (priorityMagicData.attribute && priorityMagicData.attribute.points) || 0;
			priorityDataFreeSkills = priorityMagicData.skills;
		}

		function allowedSkill() {
			if (awakened.indexOf(magictype) > -1) {
				return 'Magic';
			} else if (magictype === 'Technomancer') {
				return 'Resonance';
			}
			return false;
		}

		const listOfSkills = [];

		Object.keys(skillsData.active).forEach((skillKey) => {
			const skillinCategory = skillsData.active[skillKey],
				attributeAbriv = attAbriviation[skillKey],
				baseAttribute = metatypeData[metatype.typeName].min[attributeAbriv] || baseMagicAttribute,
				attributePool = baseAttribute + attributes[attributeAbriv];


			listOfSkills.push(
				<Modal
					key={`skill-${skillKey}`}
					modalName={skillKey}
					modalContent={
						<ActiveSkill
							skillList={skillinCategory}
							actions={actions}
							skills={skills.active}
							skillPointsLeft={skillPointsLeft}
							showSkill={skills.showSkill === skillKey}
							attributePool={attributePool}
							restrictedSkills={attributeAbriv === 'special' ? skillKey !== allowedSkill() : false}
							/>
					}
				/>
			);
		});

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
					<div className="col-xs-12">
						<Skillgroup
							skillgroups={skills.groups}
							skillgroupsData={skillsData.groups}
							actions={actions}
							pointsLeft={groupPointsLeft}
							displaySkillgroups={skills.showSkill === 'Skillgroup'}/>
					</div>
				</div>

				<h3>Active Skills</h3>
				<div className="row">
					<div className="col-xs-12">
						{listOfSkills}
					</div>
				</div>
			</div>
		);
	}
}

const FreeSkills = ({priorityDataFreeSkills, magicSkills, setMagicSkills}) => {
	if (priorityDataFreeSkills) {
		const freeAttribute = priorityDataFreeSkills.attribute,
			freeSkills = skillsData.active[freeAttribute],
			freeSkillList = [];

		let activeSkillAttribute;

		if (freeAttribute) {
			Object.keys(freeSkills).forEach((freeSkillName) => {
				const freeSkill = freeSkills[freeSkillName].name;
				freeSkillList.push(
					<option key={`free-skill--${freeSkill}`}>{freeSkill}</option>
					);
			});
		} else {
			// TODO: I think I can remove listOfActiveSkills and
			// replace it with a loop of activeSkillAttribute's keys
			const listOfActiveSkills = [];
			activeSkillAttribute = {};

			Object.keys(skillsData.active).forEach((activeSkillCat) => {
				const objectOfActiveSkills = skillsData.active[activeSkillCat];

				Object.keys(objectOfActiveSkills).forEach((actSkillName) => {
					const activeSkill = objectOfActiveSkills[actSkillName];
					listOfActiveSkills.push(activeSkill.name);
					activeSkillAttribute[activeSkill.name] = activeSkill.stat;
				});
			});

			listOfActiveSkills.forEach((activeSkillName) => {
				freeSkillList.push(
					<option key={`free-skill--${activeSkillName}`}>{activeSkillName}</option>
					);
			});
		}

		const changeFreeSkill = (e) => {

			function genFreeSkillObj(skillName) {
				return {
					name: skillName,
					category: 'active',
					rating: priorityDataFreeSkills.rating,
					attribute: activeSkillAttribute ? activeSkillAttribute[skillName] : 'mag'
				};
			}

			const updatedIndex = e.target.id,
				freeSkillsArr = magicSkills.map((skillName) => {
					return genFreeSkillObj(skillName);
				});

			freeSkillsArr[updatedIndex] = genFreeSkillObj(e.target.value);

			setMagicSkills({
				magicSkills: freeSkillsArr});
		};

		return (
			<div className="row form-group">
				<div className="col-sm-6">
					<h4>Skill 1</h4>
					<select
						id="0"
						className="form-control"
						onChange={changeFreeSkill}
						value={magicSkills[0]}>

						<option value="" />
						{freeSkillList}

					</select>
				</div>
				<div className="col-sm-6">
					<h4>Skill 2</h4>
					<select
						id="1"
						className="form-control"
						onChange={changeFreeSkill}
						value={magicSkills[1]}>

						<option value="" />
						{freeSkillList}

					</select>
				</div>
			</div>);

	}
	return null;
};

const ActiveSkill = ({skillList, actions, skills, skillPointsLeft, attributePool, restrictedSkills}) => {
	let skillTableData = [];

	for(let skillName in skillList) {
		let skillData = skillList[skillName],
		specilizationOptions = skillData.specializations.map((spec, i) => {
			return <option key={spec+i} value={spec}>{spec}</option>;
		}),
		references = [];
		for(let book in skillData.reference) {
			references.push(<span key={skillName + book} className="reference">
					{book} p{skillData.reference[book].page}
				</span>);
		}

		function incrementSkill(name, att, rating) {
			if(skillPointsLeft > 0 && rating < 6){
				actions.incrementSkill({ name, category: 'active', max: 6, attribute: att });
			}
		}

		function decrementSkill(name, att) {
			actions.decrementSkill({ name, category: 'active', max: 6, attribute: att });
		}

		function changeSpec(changeEvent) {
			if(skillPointsLeft > 0){
				let newSpec = changeEvent.target.value;
				actions.setSpec({name: skillData.name, category: 'active', spec: newSpec});
			}
		}

		const currSkill = skills[skillData.name],
			currentSpec = skills[skillData.name] && skills[skillData.name].spec || '';
			
		let rating = 0,
			dicePool = attributePool;

		for(let prop in currSkill) {
			let currRating = currSkill[prop];

			if(typeof currRating === 'number') {
				rating += currRating;
				dicePool += currRating;
			}
		}

		skillTableData.push(
			<tr key={skillData.name} className={rating > 6 || restrictedSkills?'table-danger ':''}>
				<td>
					<button
						className="btn btn-success"
						onClick={incrementSkill.bind(this, skillData.name, skillData.stat, rating)}
					>
						+
					</button>
				</td>
				<td>
					{rating}
				</td>
				<td>
					<button
						className="btn btn-warning"
						onClick={decrementSkill.bind(this, skillData.name, skillData.stat)}
					>
						-
					</button>
				</td>
				<td>
					<strong>{skillData.name}</strong>
				</td>
				<td>
					{references}
				</td>
				<td>
					<input
						type="text"
						className="form-control input-specialization"
						placeholder="Custom Spec"
						onChange={changeSpec}
						value={currentSpec}/>
					<select
						className="form-control"
						onChange={changeSpec}
						value={currentSpec}>
						<option value="">–</option>
						{specilizationOptions}
					</select>
				</td>
				<td>{currentSpec ? 2 : 0}</td>
				<td>{dicePool}{currentSpec ? `(${dicePool+2})` : null}</td>
			</tr>
		);
	}

	return (
		<FilterTable
			tableData={{
				header: (
					<tr>
						<th>Raise</th>
						<th>Rating</th>
						<th>Lower</th>
						<th>Skill Name</th>
						<th>Ref</th>
						<th>Spec</th>
						<th>Mods</th>
						<th>Dice Pool</th>
					</tr>
				),
				body: skillTableData
			}}/>
	);
};

SkillsComponent.displayName = 'SkillsSkillsComponent';

// Uncomment properties you need
// SkillsComponent.propTypes = {};
// SkillsComponent.defaultProps = {};

export default SkillsComponent;
