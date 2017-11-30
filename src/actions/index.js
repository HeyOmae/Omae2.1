/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from '../actions/'
*/
/* Populated by react-webpack-redux:action */
import demoddingCapacity from '../actions/gear/demoddingCapacity';
import moddingCapacity from '../actions/gear/moddingCapacity';
import demoddingMulti from '../actions/gear/demoddingMulti';
import moddingMulti from '../actions/gear/moddingMulti';
import weaponModding from '../actions/gear/weaponModding';
import style from '../actions/app/style';
import removeSkill from '../actions/skills/removeSkill';
import addSkill from '../actions/skills/addSkill';
import setFilter from '../actions/setFilter';
import priorityTable from './priorityTable';
import selectMetatype from './selectMetatype';
import incrementAttribute from './attributes/incrementAttribute';
import decrementAttribute from './attributes/decrementAttribute';
import incrementAugmented from './attributes/incrementAugmented';
import decrementAugmented from './attributes/decrementAugmented';
import selectMagictype from './selectMagictype';
import incrementSkill from './skills/incrementSkill';
import decrementSkill from './skills/decrementSkill';
import incrementSkillgroup from './skills/incrementSkillgroup';
import decrementSkillgroup from './skills/decrementSkillgroup';
import setSpec from './skills/setSpec';
import setMagicSkills from './skills/setMagicSkills';
import addSpell from './magic/addSpell';
import removeSpell from './magic/removeSpell';
import addComplexform from './magic/addComplexform';
import removeComplexform from './magic/removeComplexform';
import addPower from './magic/addPower';
import removePower from './magic/removePower';
import raisePower from './magic/raisePower';
import lowerPower from './magic/lowerPower';
import resetAbility from './magic/resetAbility';
import selectQuality from './quality/selectQuality';
import removeQuality from './quality/removeQuality';
import karma from './karma';
import purchaseGear from './gear/purchaseGear';
import sellGear from './gear/sellGear';
import selectGrade from './gear/selectGrade';
import modalClose from './modalClose';

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
	setFilter,
	addSkill,
	removeSkill,
	style,
	weaponModding,
	moddingMulti,
	demoddingMulti,
	moddingCapacity,
	demoddingCapacity,
	selectGrade,
	modalClose
};

module.exports = actions;
