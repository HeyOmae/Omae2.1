import React from 'react';
import PropTypes from 'prop-types';
import {lowerLevelAction, raiseLevelAction} from './util/AdeptPowersUtil';
import ModificationButton from '../../ModificationButton';

class PowerLevelCounter extends React.Component {
	render() {
		const {actions, power, index, pointsSpent, maxPoints, isMystic} = this.props;

		const capOf = {
			'Improved Physical Attribute': 4,
			default: maxPoints,
		};

		const powerName = power.name.replace(/\((.*?)\)/g, '');
		const canRaise = pointsSpent + Number(power.points) <= maxPoints && power.levels < (capOf[powerName] || capOf.default);
		const canLower = pointsSpent - Number(power.points) >= 0 && power.levels > 1;

		return (
			<div>
				<ModificationButton
					symbol={'+'}
					buttonClass={canRaise ? 'btn btn-success' : 'btn disabled btn-danger'}
					modificationFunction={canRaise ? raiseLevelAction(isMystic, powerName, power.bonus, index, actions.raisePower, actions.incrementAugmented) : () => {}}
					pointsLeft={maxPoints - pointsSpent} />
				<span className="col-12 col-sm-4">{power.levels}</span>
				<ModificationButton
					symbol={'-'}
					buttonClass={canLower ? 'btn btn-warning' : 'btn disabled btn-danger'}
					modificationFunction={lowerLevelAction(isMystic, powerName, power.bonus, index, actions.lowerPower, actions.decrementAugmented)}
					pointsLeft={Number(canLower)} />
			</div>);
	}
}

PowerLevelCounter.propTypes = {
	actions: PropTypes.shape(
		{
			decrementAugmented: PropTypes.func.isRequired,
			incrementAugmented: PropTypes.func.isRequired,
			lowerPower: PropTypes.func.isRequired,
			raisePower: PropTypes.func.isRequired,
		},
	).isRequired,
	power: PropTypes.shape({
		name: PropTypes.string.isRequired,
		points: PropTypes.string.isRequired,
		bonus: PropTypes.object.isRequired,
	}).isRequired,
	index: PropTypes.number.isRequired,
	pointsSpent: PropTypes.number.isRequired,
	maxPoints: PropTypes.number.isRequired,
	isMystic: PropTypes.bool.isRequired,
};

export default PowerLevelCounter;
