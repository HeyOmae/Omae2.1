import React from 'react';
import PropTypes from 'prop-types';
import waregrades from '../../../data/waregrade.json';

const CyberlimbRows = ({purchase, cyberlimb, currentGrade, availModifier, agi, str}) => {
	const {name, ess, capacity, avail, cost, source, page} = cyberlimb,
		grade = waregrades[currentGrade],
		currentAvail = Number(avail) + Number(grade.avail) + availModifier,
		customLimb = {
			...cyberlimb,
			agi,
			str,
			ess: ess * Number(grade.ess),
			avail: currentAvail > 0 ? currentAvail : 0,
			cost: (cost * Number(grade.cost)) + (availModifier * 5000),
		};
	return (
		<tr>
			<td>
				<button
					className="btn btn-success"
					onClick={
						() => {
							purchase({
								gear: customLimb,
								category: 'cyberlimbs',
							});
						}
					}
				>
					+
				</button>
			</td>
			<td>{name}</td>
			<td>{customLimb.ess}</td>
			<td>{capacity}</td>
			<td>{customLimb.avail}</td>
			<td>{customLimb.cost}&yen;</td>
			<td>{source} p{page}</td>
		</tr>
	);
};

CyberlimbRows.propTypes = {
	cyberlimb: PropTypes.shape({
		name: PropTypes.string.isRequired,
		ess: PropTypes.string.isRequired,
		capacity: PropTypes.string.isRequired,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired,
	}).isRequired,
	purchase: PropTypes.func.isRequired,
	currentGrade: PropTypes.number.isRequired,
	agi: PropTypes.number.isRequired,
	str: PropTypes.number.isRequired,
	availModifier: PropTypes.number.isRequired,
};

export default CyberlimbRows;
