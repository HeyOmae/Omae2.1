import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../ModalButtonComponent';
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
	skillgroups: PropTypes.objectOf(
		PropTypes.object
	).isRequired,
	skillgroupsData: PropTypes.shape({
		acting: PropTypes.object.isRequired,
		athletics: PropTypes.object.isRequired,
		biotech: PropTypes.object.isRequired,
		closecombat: PropTypes.object.isRequired,
		conjuring: PropTypes.object.isRequired,
		cracking: PropTypes.object.isRequired,
		electronics: PropTypes.object.isRequired,
		enchanting: PropTypes.object.isRequired,
		firearms: PropTypes.object.isRequired,
		influence: PropTypes.object.isRequired,
		engineering: PropTypes.object.isRequired,
		outdoors: PropTypes.object.isRequired,
		sorcery: PropTypes.object.isRequired,
		stealth: PropTypes.object.isRequired,
		tasking: PropTypes.object.isRequired
	}).isRequired,
	actions: PropTypeChecking.actions.isRequired,
	pointsLeft: PropTypes.number.isRequired
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
	action: PropTypes.func.isRequired,
	groupName: PropTypes.string.isRequired,
	skillsInGroup: PropTypes.objectOf(
		PropTypes.string
	).isRequired,
	condition: PropTypes.bool,
	btnType: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired
};
ChangeSkillButton.defaultProps = {
	condition: false
};

export default SkillgroupsComponent;
