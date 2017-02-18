import React from 'react';
import 'styles/PriorityTable.scss';
import priorityData from '../data/priority.json';
import propTypeChecking from '../../config/propTypeChecking';
import MetatypeDataCell from './MetatypeDataCell';

class PriorityTableComponent extends React.Component {
	render() {
		const {changePriority, priorityTable} = this.props;
		return (
			<div className="table-responsive">
				<h2>Priority Table</h2>
				<table className="table table-bordered priority-table">
					<PriorityLabel />
					<tbody>
						<PriorityRow
							rating="A"
							priorityTableData={priorityTable}
							changePriority={changePriority}
						/>
						<PriorityRow
							rating="B"
							priorityTableData={priorityTable}
							changePriority={changePriority}
						/>
						<PriorityRow
							rating="C"
							priorityTableData={priorityTable}
							changePriority={changePriority}
						/>
						<PriorityRow
							rating="D"
							priorityTableData={priorityTable}
							changePriority={changePriority}
						/>
						<PriorityRow
							rating="E"
							priorityTableData={priorityTable}
							changePriority={changePriority}
						/>
					</tbody>
				</table>
			</div>
		);
	}
}

// helper function
function isActive(active) {
	return active ? 'table-success' : '';
}

const PriorityLabel = () => {
	return (
		<thead className="thead-inverse">
			<tr>
				<th>Priority</th>
				<th>Metatype</th>
				<th>Attributes</th>
				<th>Magic/Resonance</th>
				<th>Skills</th>
				<th>Resources</th>
			</tr>
		</thead>
	);
};


const AttributeDataCell = ({rating, active, changePriority}) => {
	return (
		<td
			className={isActive(active)}>
			<button
				className="prioritytable--btn-select btn-link"
				onClick={() => {
					changePriority({
						type: 'SET_PRIORITY',
						category: 'attribute',
						rating
					});
				}}>
				{priorityData[rating].attributes}
			</button>
		</td>
	);
};

const MagicDataCell = ({rating, active, changePriority}) => {
	const magicStatBlock = [];

	for (const magicType in priorityData[rating].magic) {
		const magicStats = priorityData[rating].magic[magicType];

		let skills = null,
			spells = null,
			magicDetails = null;

		if (magicType === 'mundane') {
			magicDetails = <span>Jack and Squat at the Rating of zilch.</span>;
		} else {
			if (magicStats.skills) {
				skills = <span>, {magicStats.skills.ammount} Rating {magicStats.skills.rating} {magicStats.skills.attribute} skills</span>;
			} else if (magicStats.skillsgroup) {
				skills = <span>, {magicStats.skillsgroup.ammount} Rating {magicStats.skillsgroup.rating} {magicStats.skills.attribute} skillgroup</span>;
			}

			if (magicStats.spells) {
				spells = <span>, {magicStats.spells.points} {magicStats.spells.type}</span>;
			}

			magicDetails = <span>{magicStats.attribute.name} {magicStats.attribute.points}{skills}{spells}</span>;
		}


		magicStatBlock.push(
			<p key={magicType}>
				<strong>{magicType}: </strong>
				{magicDetails}
			</p>
		);
	}

	return (
		<td
			className={isActive(active)}>
			<button
				className="prioritytable--btn-select btn-link"
				onClick={() => {
					changePriority({
						type: 'SET_PRIORITY',
						category: 'magres',
						rating
					});
				}}>
				{magicStatBlock}
			</button>
		</td>
	);
};

const SkillsDataCell = ({rating, active, changePriority}) => {
	let skillsgroupBlock = <span />,
		skillgroups = priorityData[rating].skills.grouppoints;

	if (skillgroups) {
		skillsgroupBlock = <span>/{skillgroups}</span>;
	}

	return (
		<td
			className={isActive(active)}>
			<button
				className="prioritytable--btn-select btn-link"
				onClick={() => {
					changePriority({
						type: 'SET_PRIORITY',
						category: 'skills',
						rating
					});
				}}>
			{priorityData[rating].skills.skillpoints}{skillsgroupBlock}
			</button>
		</td>
	);
};

const ResourcesDataCell = ({rating, active, changePriority}) => {
	return (
		<td
			className={isActive(active)}
			onClick={() => {
				changePriority({
					type: 'SET_PRIORITY',
					category: 'resources',
					rating
				});
			}}
		>
			{priorityData[rating].resources}&yen;
		</td>);
};

const PriorityRow = ({rating, priorityTableData, changePriority}) => {
	return (
		<tr>
			<th>{rating}</th>
			<MetatypeDataCell
				rating={rating}
				active={priorityTableData.metatype === rating}
				changePriority={changePriority}
			/>
			<AttributeDataCell
				rating={rating}
				active={priorityTableData.attribute === rating}
				changePriority={changePriority}
			/>
			<MagicDataCell
				rating={rating}
				active={priorityTableData.magres === rating}
				changePriority={changePriority}
			/>
			<SkillsDataCell
				rating={rating}
				active={priorityTableData.skills === rating}
				changePriority={changePriority}
			/>
			<ResourcesDataCell
				rating={rating}
				active={priorityTableData.resources === rating}
				changePriority={changePriority}
			/>
		</tr>
	);
};


MagicDataCell.propTypes = AttributeDataCell.propTypes = {
	changePriority: React.PropTypes.func.isRequired,
	active: React.PropTypes.bool.isRequired,
	rating: React.PropTypes.string.isRequired
};

PriorityTableComponent.displayName = 'PriorityTableComponent';

// Uncomment properties you need
PriorityTableComponent.propTypes = {
	changePriority: propTypeChecking.changePriority,
	priorityTable: propTypeChecking.priorityTable
};
// PriorityTableComponent.defaultProps = {};

export default PriorityTableComponent;
