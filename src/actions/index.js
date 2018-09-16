/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from './'
*/
/* Populated by react-webpack-redux:action */
import demoddingCapacity from './gear/demoddingCapacity';
import moddingCapacity from './gear/moddingCapacity';
import demoddingMulti from './gear/demoddingMulti';
import moddingMulti from './gear/moddingMulti';
import weaponModding from './gear/weaponModding';
import style from './app/style';
import removeSkill from './skills/removeSkill';
import addSkill from './skills/addSkill';
import setFilter from './setFilter';
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
import moddingVehicle from './gear/moddingVehicle';
import demoddingVehicle from './gear/demoddingVehicle';
import moddingDrone from './gear/moddingDrone';
import demoddingDrone from './gear/demoddingDrone';

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
	modalClose,
	moddingVehicle,
	demoddingVehicle,
	moddingDrone,
	demoddingDrone,
};

module.exports = actions;
