import React from 'react';
import Modal from './ModalComponent';
import priorityData from './data/priority.json';
import 'styles/PriorityTable.sass';

class PriorityTableComponent extends React.Component {
	render() {
		const {actions, priorityTable} = this.props;
		return (
			<PriorityTable className="prioritytable-component" actions={actions} priorityTableData={priorityTable} />
		);
	}
}

const coreMetatypes = ['human', 'elf', 'dwarf', 'ork', 'troll'];

//helper function
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

const MetatypeDataCell = ({rating, active, changePriority}) => {
	let displayMetatypes = [],
		metaInModal = [];

	for(let race in priorityData[rating].metatype) {
		let special = priorityData[rating].metatype[race].special,
			karma = priorityData[rating].metatype[race].karma,
			metatypeElement = <p key={race+rating}>{race} ({special}) {karma ? 'K: ' + karma : ''}</p>;

		if(coreMetatypes.indexOf(race) > -1) {
			displayMetatypes.push(metatypeElement);
		} else {
			metaInModal.push(metatypeElement);
		}
	}
	return (
		<td
			className={isActive(active)}
			onClick={()=> {
				changePriority({
					type: 'SET_PRIORITY',
					category: 'metatype',
					rating
				});
			}}
		>
			{displayMetatypes}
			<Modal modalName={'Extra Options ' + rating} modalContent={metaInModal} />
		</td>
	);
};


const AttributeDataCell = ({rating, active, changePriority}) => {
	return (
		<td
			className={isActive(active)}
			onClick={()=> {
				changePriority({
					type: 'SET_PRIORITY',
					category: 'attribute',
					rating
				});
			}}
		>
			{priorityData[rating].attributes}
		</td>
	);
};

const MagicDataCell = ({rating, active, changePriority}) => {
	let magicStatBlock = [];

	for(let magicType in priorityData[rating].magic) {
		const magicStats = priorityData[rating].magic[magicType];

		let skills = <span />,
			spells = <span />,
			magicDetails = <span />;

		if (magicType === 'mundane') {
			magicDetails = <span>Jack and Squat at the Rating of zilch.</span>;
		} else {
			if(magicStats.skills) {
				skills = <span>, {magicStats.skills.ammount} Rating {magicStats.skills.rating} {magicStats.skills.attribute} skills</span>;
			} else if (magicStats.skillsgroup) {
				skills = <span>, {magicStats.skillsgroup.ammount} Rating {magicStats.skillsgroup.rating} {magicStats.skills.attribute} skillgroup</span>;
			}

			if(magicStats.spells) {
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

	return(
		<td
			className={isActive(active)}
			onClick={()=> {
				changePriority({
					type: 'SET_PRIORITY',
					category: 'magres',
					rating
				});
			}}
		>
			{magicStatBlock}
		</td>
	);
};

const SkillsDataCell = ({rating, active, changePriority}) => {
	let skillsgroupBlock = <span></span>,
		skillgroups = priorityData[rating].skills.grouppoints;

	if(skillgroups) {
		skillsgroupBlock = <span>/{skillgroups}</span>;
	}

	return(
		<td
			className={isActive(active)}
			onClick={()=> {
				changePriority({
					type: 'SET_PRIORITY',
					category: 'skills',
					rating
				});
			}}
		>
			{priorityData[rating].skills.skillpoints}{skillsgroupBlock}
		</td>
	);
};

const ResourcesDataCell = ({rating, active, changePriority}) => {
	return (
		<td
			className={isActive(active)}
			onClick={()=> {
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

const PriorityRow = ({rating, priorityTableData, actions}) => {
	return (
		<tr>
			<th>{rating}</th>
			<MetatypeDataCell
				rating={rating}
				active={priorityTableData.metatype === rating}
				changePriority={actions}
			/>
			<AttributeDataCell
				rating={rating}
				active={priorityTableData.attribute === rating}
				changePriority={actions}
			/>
			<MagicDataCell
				rating={rating}
				active={priorityTableData.magres === rating}
				changePriority={actions}
			/>
			<SkillsDataCell
				rating={rating}
				active={priorityTableData.skills === rating}
				changePriority={actions}
			/>
			<ResourcesDataCell
				rating={rating}
				active={priorityTableData.resources === rating}
				changePriority={actions}
			/>
		</tr>
	);
};

const PriorityTable = ({priorityTableData, actions}) => {
	return (
		<div className="table-responsive">
			<h2>Priority Table</h2>
			<table className="table table-bordered priority-table">
				<PriorityLabel />
				<tbody>
					<PriorityRow
						rating="A"
						priorityTableData={priorityTableData}
						actions={actions}
					/>
					<PriorityRow
						rating="B"
						priorityTableData={priorityTableData}
						actions={actions}
					/>
					<PriorityRow
						rating="C"
						priorityTableData={priorityTableData}
						actions={actions}
					/>
					<PriorityRow
						rating="D"
						priorityTableData={priorityTableData}
						actions={actions}
					/>
					<PriorityRow
						rating="E"
						priorityTableData={priorityTableData}
						actions={actions}
					/>
				</tbody>
			</table>
		</div>
	);
};

PriorityTableComponent.displayName = 'PriorityTableComponent';

// Uncomment properties you need
// PriorityTableComponent.propTypes = {};
// PriorityTableComponent.defaultProps = {};

export default PriorityTableComponent;
