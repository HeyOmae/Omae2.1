/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
// require('normalize.css');
import 'styles/bootstrap-overwrite.scss';
import 'styles/App.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
  sellGear,
  addSkill,
  removeSkill,
  style,
  weaponModding,
  moddingMulti,
  demoddingMulti,
  moddingCapacity,
  demoddingCapacity,
  modalClose
} from '../actions/';
import Main from '../components/Main';
import PriorityTableComponent from '../components/priorityTable/PriorityTableComponent';
import MetatypeSelector from '../components/MetatypeSelectorComponent';
import AttributesComponent from '../components/attributes/AttributesComponent';
import QualityComponent from '../components/QualityComponent';
import MagicSelectionComponent from '../components/magic/MagicSelectionComponent';
import SkillsComponent from '../components/skills/SkillsComponent';
import StreetGearComponent from '../components/gear/StreetGearComponent';
import Modal from '../components/Modal';
import Summary from './summary';
import PropTypeChecking from '../config/propTypeChecking';
/* Populated by react-webpack-redux:reducer */
class App extends Component {
	componentWillUpdate(newProps) {
		if (this.props.styleTheme !== newProps.styleTheme) {
			document.body.className = newProps.styleTheme;
		}
	}
	render() {
		const {actions, priorityTableState, selectMetatypeState, attributes, selectMagRes, settingSkills, spellSelect, quality, karmaState, purchaseGearState, modalState} = this.props,
			karmaTotal = karmaState - spellSelect.powerPointsKarma;
		return (
			<div className="container">
				<Modal
					modalName={modalState.modalName}
					modalContent={modalState.modalContent}
					closeModal={actions.modalClose}
				/>
				<div className="row">
					<div className="col-md-12">
						<Main style={actions.style} />

						<PriorityTableComponent changePriority={actions.priorityTable} priorityTable={priorityTableState} />
					</div>
				</div>

				<div className="row">
					<div className="col-md-12 col-lg-9">
						<MetatypeSelector priorityRating={priorityTableState.metatype} metatype={selectMetatypeState} action={actions.selectMetatype} />

						<AttributesComponent
							metatypeRating={priorityTableState.metatype}
							priorityRating={priorityTableState.attribute}
							magicPriority={priorityTableState.magres}
							magictype={selectMagRes}
							metatype={selectMetatypeState}
							actions={actions}
							attributes={attributes} />

						<QualityComponent karma={karmaTotal} actions={actions} selectedQualities={quality} />

						<MagicSelectionComponent
							magicPriority={priorityTableState.magres}
							magictype={selectMagRes}
							magicAttribute={attributes.special}
							selectedSpellsPowers={spellSelect}
							actions={actions} />

						<h2>Skills</h2>
						<SkillsComponent
							actions={actions}
							priority={priorityTableState}
							skills={settingSkills}
							attributes={attributes}
							metatype={selectMetatypeState}
							magictype={selectMagRes} />
						<h2>Street Gear</h2>
						<StreetGearComponent actions={actions} purchaseGear={purchaseGearState} />
					</div>
					<div id="summary" className="col-md-12 col-lg-3">
						<Summary />
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
	actions: PropTypeChecking.actions.isRequired,
	priorityTableState: PropTypeChecking.priorityTable.isRequired,
	selectMetatypeState: PropTypeChecking.selectMetatype.isRequired,
	attributes: PropTypeChecking.attributes.isRequired,
	selectMagRes: PropTypeChecking.selectMagRes.isRequired,
	settingSkills: PropTypeChecking.settingSkills.isRequired,
	spellSelect: PropTypeChecking.spellSelect.isRequired,
	quality: PropTypeChecking.quality.isRequired,
	karmaState: PropTypeChecking.karma.isRequired,
	purchaseGearState: PropTypeChecking.purchaseGear.isRequired,
	styleTheme: PropTypes.string.isRequired,
	modalState: PropTypes.shape({
		modalName: PropTypes.string.isRequired,
		modalContent: PropTypes.node
	}).isRequired
};

function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
	const props = {
		priorityTableState: state.priorityTable,
		selectMetatypeState: state.selectMetatype,
		attributes: state.attributes,
		selectMagRes: state.selectMagRes,
		settingSkills: state.settingSkills,
		spellSelect: state.spellSelect,
		quality: state.quality,
		karmaState: state.karma,
		purchaseGearState: state.purchaseGear,
		styleTheme: state.appControl.styleTheme,
		modalState: state.modalToggle
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
		sellGear,
		addSkill,
		removeSkill,
		style,
		weaponModding,
		moddingMulti,
		demoddingMulti,
		moddingCapacity,
		demoddingCapacity,
		modalClose
	};
	const actionMap = { actions: bindActionCreators(actions, dispatch) };
	return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
