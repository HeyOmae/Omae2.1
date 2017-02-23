import React from 'react';
import 'styles/PriorityTable.scss';
import priorityData from '../data/priority.json';
import propTypeChecking from '../../config/propTypeChecking';
import MetatypeDataCell from './MetatypeDataCell';
import MagicDataCell from './MagicDataCell';

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
				isActive={isActive(priorityTableData.magres === rating)}
				rating={rating}
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

AttributeDataCell.propTypes = {
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
