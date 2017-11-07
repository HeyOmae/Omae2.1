import React from 'react';
import PropTypes from 'prop-types';
import DisplayTable from '../../DisplayTableComponent';
import PowerCategoryHeader from './PowerCategoryHeader';
import { generatePowerDetailTablesRows } from './util/AdeptPowersUtil';
import PropTypeChecking from '../../../config/propTypeChecking';

class PowerSelectedDisplay extends React.Component {
	render() {
		const {actions, selectedPowers, pointsSpent, maxPoints, isMystic} = this.props;

		const powerRows = generatePowerDetailTablesRows(selectedPowers, pointsSpent, maxPoints, actions, isMystic);

		return (
			<div className="selected-powers">
				<h4>Powers</h4>
				<DisplayTable
					header={<PowerCategoryHeader />}
					body={powerRows} />
			</div>
		);
	}
}

PowerSelectedDisplay.propTypes = {
	actions: PropTypeChecking.actions.isRequired,
	selectedPowers: PropTypes.arrayOf(PropTypes.object).isRequired,
	pointsSpent: PropTypes.number.isRequired,
	maxPoints: PropTypes.number.isRequired,
	isMystic: PropTypes.bool.isRequired
};

export default PowerSelectedDisplay;
