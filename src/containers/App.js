/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';
import PriorityTableComponent from '../components/PriorityTableComponent';
import MetatypeSelector from '../components/MetatypeSelectorComponent';
import AttributesComponent from '../components/AttributesComponent';
import MagicSelectionComponent from '../components/magic/MagicSelectionComponent';
import ActiveSkillsComponent from '../components/skills/ActiveSkillsComponent';
import SummaryComponent from '../components/SummaryComponent';
/* Populated by react-webpack-redux:reducer */
class App extends Component {
  handleScroll() {
    const {actions} = this;
    let summary = document.getElementById('summary'), sumLoc = summary.getBoundingClientRect();
    if (sumLoc.top < 0) {
      actions.fixSummary({ summaryFix: true });  // summary.children[0].classList.add('fixed'); // Native implimitation back up
    } else {
      actions.fixSummary({ summaryFix: false });  // summary.children[0].classList.remove('fixed'); // Native implimitation back up
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this.props));
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  render() {
    const {actions, priorityTable, selectMetatype, attributes, selectMagRes, settingSkills, appControl, spellSelect} = this.props;
    return (
      <div className='container'>
				<div className='row'>
					<div className='col-md-12'>
						<Main
              actions={actions}
              priorityTable={priorityTable}
              selectMetatype={selectMetatype}
              attributes={attributes}/>

						<PriorityTableComponent actions={actions.priorityTable} priorityTable={priorityTable}/>
					</div>
				</div>

				<div className='row'>
					<div className='col-md-12 col-lg-9'>
						<MetatypeSelector priorityRating={priorityTable.metatype} metatype={selectMetatype} action={actions.selectMetatype}/>

						<AttributesComponent
              metatypeRating={priorityTable.metatype}
              priorityRating={priorityTable.attribute}
              magicPriority={priorityTable.magres}
              magictype={selectMagRes}
              metatype={selectMetatype}
              actions={{
                incrementAttribute: actions.incrementAttribute,
                decrementAttribute: actions.decrementAttribute
              }}
              attributes={attributes}/>

						<MagicSelectionComponent
              magicPriority={priorityTable.magres}
              magictype={selectMagRes}
              selectedSpellsPowers={spellSelect}
              actions={actions} />

						<h2>Skills</h2>
						<ActiveSkillsComponent
              actions={actions}
              priority={priorityTable}
              skills={settingSkills}
              attributes={attributes}
              metatype={selectMetatype}
              magictype={selectMagRes}/>
					</div>
					<div id='summary' className='col-md-12 col-lg-3'>
						<SummaryComponent
              priority={priorityTable}
              metatype={selectMetatype}
              attributes={attributes}
              magres={selectMagRes}
              spellsAndPowers={spellSelect}
              skills={settingSkills}
              fixed={appControl.summaryFix}/>
					</div>
				</div>
			</div>
    );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  actions: PropTypes.object.isRequired,
  priorityTable: PropTypes.object.isRequired,
  selectMetatype: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired,
  selectMagRes: PropTypes.string.isRequired,
  settingSkills: PropTypes.object.isRequired,
  appControl: PropTypes.object.isRequired,
  spellSelect: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    priorityTable: state.priorityTable,
    selectMetatype: state.selectMetatype,
    attributes: state.attributes,
    selectMagRes: state.selectMagRes,
    settingSkills: state.settingSkills,
    appControl: state.appControl,
    spellSelect: state.spellSelect
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    priorityTable: require('../actions/priorityTable.js'),
    selectMetatype: require('../actions/selectMetatype.js'),
    incrementAttribute: require('../actions/attributes/incrementAttribute.js'),
    decrementAttribute: require('../actions/attributes/decrementAttribute.js'),
    selectMagictype: require('../actions/selectMagictype.js'),
    incrementSkill: require('../actions/skills/incrementSkill.js'),
    decrementSkill: require('../actions/skills/decrementSkill.js'),
    showSkill: require('../actions/showSkill.js'),
    fixSummary: require('../actions/app/fixSummary.js'),
    incrementSkillgroup: require('../actions/skills/incrementSkillgroup.js'),
    decrementSkillgroup: require('../actions/skills/decrementSkillgroup.js'),
    setSpec: require('../actions/skills/setSpec.js'),
    setMagicSkills: require('../actions/skills/setMagicSkills.js'),
    addSpell: require('../actions/magic/addSpell.js'),
    removeSpell: require('../actions/magic/removeSpell.js'),
    addComplexform: require('../actions/magic/addComplexform.js'),
    removeComplexform: require('../actions/magic/removeComplexform.js'),
    resetAbility: require('../actions/magic/resetAbility.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
