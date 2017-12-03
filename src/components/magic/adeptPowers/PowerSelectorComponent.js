import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'styles/magic/SpellSelector.sass';
import FilterTable from '../../FilterableTable';
import powerData from '../../../data/powers.json';
import PropTypeChecking from '../../../config/propTypeChecking';
import PowerSelectedDisplay from './PowerSelectedDisplayComponent';
import PowerCategoryHeader from './PowerCategoryHeader';
import PowerDetailRow from './PowerDetailRow';
import Modal from '../../ModalButtonComponent';

class PowerSelectorComponent extends React.Component {
	render() {
		const {selectedPowers, pointsSpent, maxPoints, isMystic, karmaSpent, actions} = this.props;

		// generated power details to populate addPowerModals
		const powerRows = powerData.map((power, index) => {
			const props = {isMystic, power, pointsSpent, index, add: true, maxPoints, actions};
			return <PowerDetailRow {...props} key={`${power.name}-${power.source}:${power.page}`} />;
		});

		const table = <FilterTable header={<PowerCategoryHeader />} >{powerRows}</FilterTable>;

		return (
			<div className="powers">
				<p>
					Power Points: <strong>{pointsSpent}</strong>
					{isMystic ?
						<span> Karma Spent: <strong>{karmaSpent}</strong></span>
						: null}
				</p>
				<div className="power-selector">
					<div className="btn-group">
						<Modal
							key={'powers'}
							modalName="Powers"
							modalContent={table}
						/>
					</div>
				</div>
				{selectedPowers.length > 0 ?
					<PowerSelectedDisplay
						selectedPowers={selectedPowers}
						maxPoints={maxPoints}
						pointsSpent={pointsSpent}
						actions={actions}
						isMystic={isMystic} />
					: null
				}
			</div>
		);
	}
}

PowerSelectorComponent.propTypes = {
	selectedPowers: PropTypes.arrayOf(PropTypes.object).isRequired,
	pointsSpent: PropTypes.number.isRequired,
	maxPoints: PropTypes.number.isRequired,
	isMystic: PropTypes.bool.isRequired,
	karmaSpent: PropTypes.number.isRequired,
	actions: PropTypeChecking.actions.isRequired,
};

export {PowerSelectorComponent};

function mapStateToProps(state) {
	return { pointsSpent: state.spellSelect.powerPointsSpent};
}

export default connect(mapStateToProps)(PowerSelectorComponent);
