import React, {
	Component,
	PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SummaryComponent from '../components/SummaryComponent';
import fixSummary from '../actions/app/fixSummary';

class summary extends Component {
	componentDidMount() {
		const summaryElement = document.getElementById('summary');
		window.addEventListener('scroll', this.handleScroll.bind(this.props, summaryElement));
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(summaryElement) {
		const {actions} = this;
		const summaryLocation = summaryElement.getBoundingClientRect().top;
		if (summaryLocation < 0) {
			actions.fixSummary({ summaryFix: true });
		} else {
			actions.fixSummary({ summaryFix: false });
		}
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
			purchaseGear
		} = this.props,

			karmaTotal = karma - spellSelect.powerPointsKarma;

		return (
			<SummaryComponent
				priority={priorityTable}
				metatype={selectMetatype}
				attributes={attributes}
				magres={selectMagRes}
				spellsAndPowers={spellSelect}
				skills={settingSkills}
				fixed={appControl.summaryFix}
				selectedQualities={quality}
				karma={karmaTotal}
				purchaseGear={purchaseGear}
				/>
		);
	}
}

summary.propTypes = {
	priorityTable: PropTypes.shape.isRequired,
	selectMetatype: PropTypes.shape.isRequired,
	attributes: PropTypes.shape.isRequired,
	selectMagRes: PropTypes.string.isRequired,
	settingSkills: PropTypes.shape.isRequired,
	appControl: PropTypes.shape.isRequired,
	spellSelect: PropTypes.shape.isRequired,
	quality: PropTypes.shape.isRequired,
	karma: PropTypes.number.isRequired,
	purchaseGear: PropTypes.shape.isRequired
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
		purchaseGear: state.purchaseGear
	};
	return props;
}

function mapDispatchToProps(dispatch) {
	const actions = {
		fixSummary
	};
	const actionMap = { actions: bindActionCreators(actions, dispatch) };
	return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(summary);
