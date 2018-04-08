import React from 'react';
import PropTypes from 'prop-types';
import priorityData from '../../data/priority.json';

class MagicDataCell extends React.Component {
	componentWillMount() {
		const {rating} = this.props;
		this.magicStatBlock = Object
			.keys(priorityData[rating].magic)
			.map((magicType) => {
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


				return (
					<p key={magicType}>
						<strong>{magicType}: </strong>
						{magicDetails}
					</p>
				);
			});
	}

	render() {
		const {rating, isActive, changePriority} = this.props;
		return (
			<td
				className={isActive}>
				<button
					className="prioritytable--btn-select btn btn-link"
					onClick={() => {
						changePriority({
							type: 'SET_PRIORITY',
							category: 'magres',
							rating,
						});
					}}>
					{this.magicStatBlock}
				</button>
			</td>
		);
	}
}

MagicDataCell.propTypes = {
	changePriority: PropTypes.func.isRequired,
	isActive: PropTypes.string.isRequired,
	rating: PropTypes.string.isRequired,
};

export default MagicDataCell;
