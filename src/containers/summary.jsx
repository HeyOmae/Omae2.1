import React, {
	Component,
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SummaryComponent from '../components/SummaryComponent';
import fixSummary from '../actions/app/fixSummary';
import PropTypeChecking from '../config/propTypeChecking';

function handleScroll(summaryElement) {
	const {actions} = this;
	const summaryLocation = summaryElement.getBoundingClientRect().top;
	if (summaryLocation < 0) {
		actions.fixSummary({ summaryFix: true });
	} else {
		actions.fixSummary({ summaryFix: false });
	}
}

class summary extends Component {
	componentDidMount() {
		// TODO: replace all this junk with Bootstrap sticky-top class
		const summaryElement = document.getElementById('summary');
		window.addEventListener('scroll', handleScroll.bind(this.props, summaryElement));
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', handleScroll);
	}

	render() {
		const {
				priorityTable,
				selectMetatype,
				attributes,
				selectMagRes,
				settingSkills,
				appControl,
				spellSelect,
				quality,
				karma,
				purchaseGear,
			} = this.props,

			karmaTotal = karma - spellSelect.powerPointsKarma;

		return (
			<SummaryComponent
				priority={priorityTable}
				metatype={selectMetatype}
				attributes={attributes}
				magres={selectMagRes}
				skills={settingSkills}
				spellsAndPowers={spellSelect}
				fixed={appControl.summaryFix}
				selectedQualities={quality}
				karma={karmaTotal}
				purchaseGear={purchaseGear}
			/>
		);
	}
}

summary.propTypes = {
	priorityTable: PropTypeChecking.priorityTable.isRequired,
	selectMetatype: PropTypeChecking.selectMetatype.isRequired,
	attributes: PropTypeChecking.attributes.isRequired,
	selectMagRes: PropTypeChecking.selectMagRes.isRequired,
	settingSkills: PropTypeChecking.settingSkills.isRequired,
	appControl: PropTypeChecking.appControl.isRequired,
	spellSelect: PropTypeChecking.spellSelect.isRequired,
	quality: PropTypeChecking.quality.isRequired,
	karma: PropTypeChecking.karma.isRequired,
	purchaseGear: PropTypeChecking.purchaseGear.isRequired,
};

function mapStateToProps(state) {
	const props = {
		priorityTable: state.priorityTable,
		selectMetatype: state.selectMetatype,
		attributes: state.attributes,
		selectMagRes: state.selectMagRes,
		settingSkills: state.settingSkills,
		appControl: state.appControl,
		spellSelect: state.spellSelect,
		quality: state.quality,
		karma: state.karma,
		purchaseGear: state.purchaseGear,
	};
	return props;
}

function mapDispatchToProps(dispatch) {
	const actions = {
		fixSummary,
	};
	const actionMap = { actions: bindActionCreators(actions, dispatch) };
	return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(summary);
