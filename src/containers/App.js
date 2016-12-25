/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
// require('normalize.css');
import 'styles/bootstrap-overwrite.scss';
import 'styles/App.css';
import React, {
	Component,
	PropTypes
} from 'react';
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
	sellGear
} from '../actions/';
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
		const {actions,
			priorityTableState,
			selectMetatypeState,
			attributes,
			selectMagRes,
			settingSkills,
			spellSelect,
			quality,
			karmaState,
			purchaseGearState
		} = this.props,
			karmaTotal = karmaState - spellSelect.powerPointsKarma;
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<Main
							actions={actions}
							priorityTable={priorityTableState}
							selectMetatype={selectMetatypeState}
							attributes={attributes}/>

						<PriorityTableComponent
							actions={actions.priorityTable}
							priorityTable={priorityTableState}/>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12 col-lg-9">
						<MetatypeSelector
							priorityRating={priorityTableState.metatype}
							metatype={selectMetatypeState}
							action={actions.selectMetatype}
							karma={actions.karma}/>

						<AttributesComponent
							metatypeRating={priorityTableState.metatype}
							priorityRating={priorityTableState.attribute}
							magicPriority={priorityTableState.magres}
							magictype={selectMagRes}
							metatype={selectMetatypeState}
							actions={{
								incrementAttribute: actions.incrementAttribute,
								decrementAttribute: actions.decrementAttribute
							}}
							attributes={attributes}/>

						<QualityComponent
							karma={karmaTotal}
							actions={actions}
							selectedQualities={quality}/>

						<MagicSelectionComponent
							magicPriority={priorityTableState.magres}
							magictype={selectMagRes}
							magicAttribute={attributes.special}
							selectedSpellsPowers={spellSelect}
							actions={actions}/>

						<h2>Skills</h2>
						<ActiveSkillsComponent
							actions={actions}
							priority={priorityTableState}
							skills={settingSkills}
							attributes={attributes}
							metatype={selectMetatypeState}
							magictype={selectMagRes}/>
						<h2>Street Gear</h2>
						<StreetGearComponent
							actions={actions}
							purchaseGear={purchaseGearState}
							resourcesPriority={priorityTableState.resources}/>
					</div>
					<div id="summary" className="col-md-12 col-lg-3">
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
const propTypePriorityCheck = PropTypes.string.isRequired;
App.propTypes = {
	actions: PropTypes.shape(
		{
			priorityTable: PropTypes.func.isRequired,
			selectMetatype: PropTypes.func.isRequired,
			incrementAttribute: PropTypes.func.isRequired,
			decrementAttribute: PropTypes.func.isRequired,
			incrementAugmented: PropTypes.func.isRequired,
			decrementAugmented: PropTypes.func.isRequired,
			selectMagictype: PropTypes.func.isRequired,
			incrementSkill: PropTypes.func.isRequired,
			decrementSkill: PropTypes.func.isRequired,
			incrementSkillgroup: PropTypes.func.isRequired,
			decrementSkillgroup: PropTypes.func.isRequired,
			setSpec: PropTypes.func.isRequired,
			setMagicSkills: PropTypes.func.isRequired,
			addSpell: PropTypes.func.isRequired,
			removeSpell: PropTypes.func.isRequired,
			addComplexform: PropTypes.func.isRequired,
			removeComplexform: PropTypes.func.isRequired,
			addPower: PropTypes.func.isRequired,
			removePower: PropTypes.func.isRequired,
			raisePower: PropTypes.func.isRequired,
			lowerPower: PropTypes.func.isRequired,
			resetAbility: PropTypes.func.isRequired,
			selectQuality: PropTypes.func.isRequired,
			removeQuality: PropTypes.func.isRequired,
			karma: PropTypes.func.isRequired,
			purchaseGear: PropTypes.func.isRequired,
			sellGear: PropTypes.func.isRequired,
		}).isRequired,
	priorityTableState: PropTypes.shape(
		{
			metatype: propTypePriorityCheck,
			attribute: propTypePriorityCheck,
			magres: propTypePriorityCheck,
			skills: propTypePriorityCheck,
			resources: propTypePriorityCheck
		}).isRequired,
	selectMetatypeState: PropTypes.shape(
		{
			typeName: PropTypes.string,
			priority: propTypePriorityCheck
		}).isRequired,
	attributes: PropTypes.shape(
		{
			bod: PropTypes.number.isRequired,
			agi: PropTypes.number.isRequired,
			rea: PropTypes.number.isRequired,
			str: PropTypes.number.isRequired,
			wil: PropTypes.number.isRequired,
			log: PropTypes.number.isRequired,
			int: PropTypes.number.isRequired,
			cha: PropTypes.number.isRequired,
			edg: PropTypes.number.isRequired,
			ess: PropTypes.number.isRequired,
			augmented: PropTypes.object.isRequired,
			special: PropTypes.number.isRequired,
			baseSpent: PropTypes.number.isRequired,
			specialSpent: PropTypes.number.isRequired
		}).isRequired,
	selectMagRes: PropTypes.string.isRequired,
	settingSkills: PropTypes.shape(
		{
			active: PropTypes.object.isRequired,
			knowledge: PropTypes.object.isRequired,
			groups: PropTypes.object.isRequired,
			magicSkills: PropTypes.array.isRequired,
			skillPointsSpent: PropTypes.number.isRequired,
			groupPointSpent: PropTypes.number.isRequired
		}).isRequired,
	spellSelect: PropTypes.shape(
		{
			spells: PropTypes.array.isRequired,
			powers: PropTypes.array.isRequired,
			powerPointsSpent: PropTypes.number.isRequired,
			powerPointsKarma: PropTypes.number.isRequired,
			complexforms: PropTypes.array.isRequired
		}).isRequired,
	quality: PropTypes.shape(
		{
			Positive: PropTypes.array.isRequired,
			Negative: PropTypes.array.isRequired,
			karma: PropTypes.shape({
				Positive: PropTypes.number.isRequired,
				Negative: PropTypes.number.isRequired
			}).isRequired
		}).isRequired,
	karmaState: PropTypes.number.isRequired,
	purchaseGearState: PropTypes.shape(
		{
			nuyen: PropTypes.number.isRequired
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
		purchaseGearState: state.purchaseGear
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
