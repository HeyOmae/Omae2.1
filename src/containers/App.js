/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
require('normalize.css');
require('styles/bootstrap-overwrite.scss');
require('styles/App.css');
import React, {
  Component,
  PropTypes
} from 'react';
import {
  priorityTable,
  selectMetatype,
  incrementAttribute,
  decrementAttribute,
  incrementAugmented,
  decrementAugmented,
  selectMagictype,
  incrementSkill,
  decrementSkill,
  incrementSkillgroup,
  decrementSkillgroup,
  setSpec,
  setMagicSkills,
  addSpell,
  removeSpell,
  addComplexform,
  removeComplexform,
  addPower,
  removePower,
  raisePower,
  lowerPower,
  resetAbility,
  selectQuality,
  removeQuality,
  karma,
  purchaseGear,
  sellGear
} from '../actions/';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';
import PriorityTableComponent from '../components/PriorityTableComponent';
import MetatypeSelector from '../components/MetatypeSelectorComponent';
import AttributesComponent from '../components/AttributesComponent';
import QualityComponent from '../components/QualityComponent';
import MagicSelectionComponent from '../components/magic/MagicSelectionComponent';
import ActiveSkillsComponent from '../components/skills/ActiveSkillsComponent';
import StreetGearComponent from '../components/gear/StreetGearComponent';
import Summary from './summary';
/* Populated by react-webpack-redux:reducer */
class App extends Component {
  render() {
    const {actions, priorityTable, selectMetatype, attributes, selectMagRes, settingSkills, spellSelect, quality, karma, purchaseGear, filterTable} = this.props, karmaTotal = karma - spellSelect.powerPointsKarma;
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
						<MetatypeSelector
              priorityRating={priorityTable.metatype}
              metatype={selectMetatype}
              action={actions.selectMetatype}
              karma={actions.karma}/>

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

            <QualityComponent karma={karmaTotal} actions={actions} selectedQualities={quality}/>

						<MagicSelectionComponent
              magicPriority={priorityTable.magres}
              magictype={selectMagRes}
              magicAttribute={attributes.special}
              selectedSpellsPowers={spellSelect}
              actions={actions}/>

						<h2>Skills</h2>
						<ActiveSkillsComponent
              actions={actions}
              priority={priorityTable}
              skills={settingSkills}
              attributes={attributes}
              metatype={selectMetatype}
              magictype={selectMagRes}/>
            <h2>Street Gear</h2>
            <StreetGearComponent actions={actions} purchaseGear={purchaseGear} resourcesPriority={priorityTable.resources}/>
					</div>
					<div id='summary' className='col-md-12 col-lg-3'>
						<Summary/>
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
  selectMetatype: PropTypes.object.isRequired,
  attributes: PropTypes.object.isRequired,
  selectMagRes: PropTypes.string.isRequired,
  settingSkills: PropTypes.object.isRequired,
  appControl: PropTypes.object.isRequired,
  spellSelect: PropTypes.object.isRequired,
  quality: PropTypes.object.isRequired,
  karma: PropTypes.number.isRequired,
  purchaseGear: PropTypes.object.isRequired,
  filterTable: PropTypes.object.isRequired
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
    spellSelect: state.spellSelect,
    quality: state.quality,
    karma: state.karma,
    purchaseGear: state.purchaseGear
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    priorityTable,
    selectMetatype,
    incrementAttribute,
    decrementAttribute,
    incrementAugmented,
    decrementAugmented,
    selectMagictype,
    incrementSkill,
    decrementSkill,
    incrementSkillgroup,
    decrementSkillgroup,
    setSpec,
    setMagicSkills,
    addSpell,
    removeSpell,
    addComplexform,
    removeComplexform,
    addPower,
    removePower,
    raisePower,
    lowerPower,
    resetAbility,
    selectQuality,
    removeQuality,
    karma,
    purchaseGear,
    sellGear
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
