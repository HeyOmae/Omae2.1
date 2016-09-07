import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SummaryComponent from '../components/SummaryComponent';

class summary extends Component {
  componentDidMount() {
    summary = document.getElementById('summary');
    window.addEventListener('scroll', this.handleScroll.bind(this.props, summary));
  }
  handleScroll(summary) {
    const {actions} = this;
    const summaryLocation = summary.getBoundingClientRect().top;
    if (summaryLocation < 0) {
      actions.fixSummary({ summaryFix: true });
    } else {
      actions.fixSummary({ summaryFix: false });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  render() {
    const { priorityTable, selectMetatype, attributes, selectMagRes, settingSkills, appControl, spellSelect, quality, karma, purchaseGear } = this.props;

    const karmaTotal = karma - spellSelect.powerPointsKarma;

    return <SummaryComponent
              priority={priorityTable}
              metatype={selectMetatype}
              attributes={attributes}
              magres={selectMagRes}
              spellsAndPowers={spellSelect}
              skills={settingSkills}
              fixed={appControl.summaryFix}
              selectedQualities={quality}
              karma={karmaTotal}
              purchaseGear={purchaseGear}/>;
  }
}

summary.propTypes = {
  actions: PropTypes.object.isRequired,
  priorityTable: PropTypes.object.isRequired,
  selectMetatype: PropTypes.object.isRequired,
  attributes: PropTypes.object.isRequired,
  selectMagRes: PropTypes.string.isRequired,
  settingSkills: PropTypes.object.isRequired,
  appControl: PropTypes.object.isRequired,
  spellSelect: PropTypes.object.isRequired,
  quality: PropTypes.object.isRequired,
  karma: PropTypes.number.isRequired,
  purchaseGear: PropTypes.object.isRequired
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
    fixSummary: require('../actions/app/fixSummary.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(summary);
