import React from 'react';
import Modal from '../ModalComponent';
import Skillgroup from './SkillgroupsComponent';
import FilterTable from '../FilterableTable';
import skillsData from '../data/skills.json';
import metatypeData from '../data/metatype.json';
import priorityTableData from '../data/priority.json';

import '../../styles/skills/ActiveSkills.sass';

class SkillsComponent extends React.Component {
	componentWillMount() {
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
			skillPointsLeft = priorityTableData[priority.skills].skills.skillpoints
				- skills.skillPointsSpent,
			awakened = [
				'Mage',
				'Mystic',
				'Adept',
				'Aspected'
			],
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

		const listOfSkills = Object.keys(skillsData.active).map((skillKey) => {
			const skillinCategory = skillsData.active[skillKey],
				attributeAbriv = attAbriviation[skillKey],
				baseAttribute = metatypeData[metatype.typeName].min[attributeAbriv] || baseMagicAttribute,
				attributePool = baseAttribute + attributes[attributeAbriv];


			return (
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

		this.listOfSkills = listOfSkills;
		this.priorityDataFreeSkills = priorityDataFreeSkills;
		this.groupPointsLeft = groupPointsLeft;
	}

	render() {
		const {actions, skills} = this.props,
			{listOfSkills, priorityDataFreeSkills, groupPointsLeft} = this;

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
	const skillTableData = [];

	Object.keys(skillList).forEach((skillName) => {
		const skillData = skillList[skillName],
			specilizationOptions = skillData.specializations.map((spec, i) => {
				return <option key={spec + i} value={spec}>{spec}</option>;
			}),
			references = Object.keys(skillData.reference).map((book) => {
				return (
					<span key={skillName + book} className="reference">
						{book} p{skillData.reference[book].page}
					</span>
				);
			});

		function incrementSkill(name, attribute, rating) {
			if (skillPointsLeft > 0 && rating < 6) {
				actions.incrementSkill({ name, category: 'active', max: 6, attribute });
			}
		}

		function decrementSkill(name, att) {
			actions.decrementSkill({ name, category: 'active', max: 6, attribute: att });
		}

		function changeSpec(changeEvent) {
			if (skillPointsLeft > 0) {
				const spec = changeEvent.target.value;
				actions.setSpec({name: skillData.name, category: 'active', spec});
			}
		}

		const currSkill = skills[skillData.name],
			currentSpec = (skills[skillData.name] && skills[skillData.name].spec) || '';

		let rating = 0,
			dicePool = attributePool;

		if (currSkill) {
			Object.keys(currSkill).forEach((prop) => {
				const currRating = currSkill[prop];

				if (typeof currRating === 'number') {
					rating += currRating;
					dicePool += currRating;
				}
			});
		}

		skillTableData.push(
			<ActiveSkillTableRow
				key={`active-skill--${skillData.name}`}
				name={skillData.name}
				stat={skillData.stat}
				rating={rating}
				restrictedSkills={restrictedSkills}
				incrementSkill={incrementSkill}
				decrementSkill={decrementSkill}
				references={references}
				changeSpec={changeSpec}
				currentSpec={currentSpec}
				specilizationOptions={specilizationOptions}
				dicePool={dicePool} />
		);

	});

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

function ActiveSkillTableRow({
	name,
	stat,
	rating,
	restrictedSkills,
	incrementSkill,
	decrementSkill,
	references,
	changeSpec,
	currentSpec,
	specilizationOptions,
	dicePool
}) {
	// TODO: make this into a smart component to watch it's rating
	return (
		<tr className={rating > 6 || restrictedSkills ? 'table-danger ' : ''}>
			<td>
				<button
					className="btn btn-success"
					onClick={() => { incrementSkill(name, stat, rating); }}
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
					onClick={() => { decrementSkill(name, stat); }}
				>
					-
				</button>
			</td>
			<td>
				<strong>{name}</strong>
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
			<td>{dicePool}{currentSpec ? `(${dicePool + 2})` : null}</td>
		</tr>
	);
}

SkillsComponent.displayName = 'SkillsSkillsComponent';

// Uncomment properties you need
// SkillsComponent.propTypes = {};
// SkillsComponent.defaultProps = {};

export default SkillsComponent;
