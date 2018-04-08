import React from 'react';
import PropTypes from 'prop-types';
import DisplayTable from '../../DisplayTableComponent';
import PowerCategoryHeader from './PowerCategoryHeader';
import PowerDetailRow from './PowerDetailRow';
import PropTypeChecking from '../../../config/propTypeChecking';

class PowerSelectedDisplay extends React.Component {
	render() {
		const {actions, selectedPowers, pointsSpent, maxPoints, isMystic} = this.props;

		return (
			<div className="selected-powers">
				<h4>Powers</h4>
				<DisplayTable
					pointsSpent={pointsSpent}
					header={<PowerCategoryHeader />} >
					{
						selectedPowers.reduce((currentChildren, power) => {
							const index = currentChildren.length;
							return [
								...currentChildren,
								<PowerDetailRow key={power.name + index} power={power} index={index} {...{pointsSpent, maxPoints, actions, isMystic}} add={false} />,
							];
						}, [],
					)}
				</DisplayTable>
			</div>
		);
	}
}

PowerSelectedDisplay.propTypes = {
	actions: PropTypeChecking.actions.isRequired,
	selectedPowers: PropTypes.arrayOf(PropTypes.object).isRequired,
	pointsSpent: PropTypes.number.isRequired,
	maxPoints: PropTypes.number.isRequired,
	isMystic: PropTypes.bool.isRequired,
};

export default PowerSelectedDisplay;
