import React from 'react';
import Modal from '../ModalComponent';
import FilterTable from '../FilterableTable';

import PropTypeChecking from '../../config/propTypeChecking';

import '../../styles/skills/Skillgroups.sass';

class SkillgroupsComponent extends React.Component {
	render() {
		const {skillgroups, skillgroupsData, actions, pointsLeft} = this.props,
		// TODO: refactor skill groups to work like skills so this setup stuff can be in componentWillMount
			listOfGroups = Object.keys(skillgroupsData).map((groupName) => {
				const group = skillgroupsData[groupName],
					enoughPoints = pointsLeft > 0;

				return (
					<tr key={`skillgroup-${groupName}`}>
						<td>
							<ChangeSkillButton
								action={actions.incrementSkillgroup}
								groupName={groupName}
								skillsInGroup={group.skillsingroup}
								condition={skillgroups[groupName] ?
									skillgroups[groupName].rating < 6 &&
									enoughPoints :
									enoughPoints
								}
								btnType="btn-success">
								+
							</ChangeSkillButton>
						</td>
						<td>{(skillgroups[groupName] && skillgroups[groupName].rating) || 0}</td>
						<td>
							<ChangeSkillButton
								action={actions.decrementSkillgroup}
								groupName={groupName}
								skillsInGroup={group.skillsingroup}
								condition={skillgroups[groupName] && skillgroups[groupName].rating > 0}
								btnType="btn-warning">
								-
							</ChangeSkillButton>
						</td>
						<td><strong>{group.name}</strong></td>
						<td>{Object.keys(group.skillsingroup).join(', ')}</td>
					</tr>
				);
			});

		return (
			<Modal
				modalName="Skill Groups"
				modalContent={
					<div className="skillgroups-component">
						<FilterTable
							tableData={{
								header: (
									<tr>
										<th>Raise</th>
										<th>Rating</th>
										<th>Lower</th>
										<th>Skill Group</th>
										<th>Skills</th>
									</tr>
								),
								body: listOfGroups
							}} />
					</div>
			} />
		);
	}
}

SkillgroupsComponent.propTypes = {
	skillgroups: React.PropTypes.objectOf(
		React.PropTypes.object
	).isRequired,
	skillgroupsData: React.PropTypes.shape({
		acting: React.PropTypes.object.isRequired,
		athletics: React.PropTypes.object.isRequired,
		biotech: React.PropTypes.object.isRequired,
		closecombat: React.PropTypes.object.isRequired,
		conjuring: React.PropTypes.object.isRequired,
		cracking: React.PropTypes.object.isRequired,
		electronics: React.PropTypes.object.isRequired,
		enchanting: React.PropTypes.object.isRequired,
		firearms: React.PropTypes.object.isRequired,
		influence: React.PropTypes.object.isRequired,
		engineering: React.PropTypes.object.isRequired,
		outdoors: React.PropTypes.object.isRequired,
		sorcery: React.PropTypes.object.isRequired,
		stealth: React.PropTypes.object.isRequired,
		tasking: React.PropTypes.object.isRequired
	}).isRequired,
	actions: PropTypeChecking.actions.isRequired,
	pointsLeft: React.PropTypes.number.isRequired
};

SkillgroupsComponent.displayName = 'SkillgroupsComponent';

const ChangeSkillButton = ({action, groupName, skillsInGroup, condition, btnType, children}) => {
	function changeSkillGroup() {
		if (condition) {
			action({name: groupName, category: 'groups', max: 6, skillsInGroup});
		}
	}

	return (
		<button
			className={`btn ${btnType}`}
			onClick={changeSkillGroup}
			>
			{children}
		</button>
	);
};

ChangeSkillButton.propTypes = {
	action: React.PropTypes.func.isRequired,
	groupName: React.PropTypes.string.isRequired,
	skillsInGroup: React.PropTypes.objectOf(
		React.PropTypes.string
	).isRequired,
	condition: React.PropTypes.bool,
	btnType: React.PropTypes.string.isRequired,
	children: React.PropTypes.string.isRequired
};
ChangeSkillButton.defaultProps = {
	condition: false
};

export default SkillgroupsComponent;
