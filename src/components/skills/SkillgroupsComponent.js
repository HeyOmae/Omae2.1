import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilterTable from '../FilterableTable';
import { groups as skillgroupsData } from '../../data/skills.json';
import { incrementSkillgroup, decrementSkillgroup } from '../../actions';

import '../../styles/skills/Skillgroups.sass';

class SkillgroupsComponent extends React.Component {
	render() {
		const {skillgroups, increment, decrement, skillGroupPoints, groupPointsSpent} = this.props,
			// TODO: refactor skill groups to work like skills so this setup stuff can be in componentWillMount
			listOfGroups = Object.keys(skillgroupsData).map((groupName) => {
				const group = skillgroupsData[groupName],
					enoughPoints = (skillGroupPoints - groupPointsSpent) > 0;

				return (
					<tr key={`skillgroup-${groupName}`}>
						<td>
							<ChangeSkillButton
								action={increment}
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
								action={decrement}
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
						body: listOfGroups,
					}} />
			</div>
		);
	}
}

SkillgroupsComponent.propTypes = {
	skillgroups: PropTypes.objectOf(
		PropTypes.object,
	).isRequired,
	increment: PropTypes.func.isRequired,
	decrement: PropTypes.func.isRequired,
	skillGroupPoints: PropTypes.number.isRequired,
	groupPointsSpent: PropTypes.number.isRequired,
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
		PropTypes.string,
	).isRequired,
	condition: PropTypes.bool,
	btnType: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
};
ChangeSkillButton.defaultProps = {
	condition: false,
};

const mapStateToProps = (state) => {
	return {
		skillgroups: state.settingSkills.groups,
		groupPointsSpent: state.settingSkills.groupPointSpent,
	};
};

export default connect(mapStateToProps, {increment: incrementSkillgroup, decrement: decrementSkillgroup})(SkillgroupsComponent);
