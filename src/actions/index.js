/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from '../actions/'
*/
/* Populated by react-webpack-redux:action */
import addSkill from '../actions/skills/addSkill.js';
import setFilter from '../actions/setFilter.js';
import priorityTable from './priorityTable.js';
import selectMetatype from './selectMetatype.js';
import incrementAttribute from './attributes/incrementAttribute.js';
import decrementAttribute from './attributes/decrementAttribute.js';
import incrementAugmented from './attributes/incrementAugmented.js';
import decrementAugmented from './attributes/decrementAugmented.js';
import selectMagictype from './selectMagictype.js';
import incrementSkill from './skills/incrementSkill.js';
import decrementSkill from './skills/decrementSkill.js';
import incrementSkillgroup from './skills/incrementSkillgroup.js';
import decrementSkillgroup from './skills/decrementSkillgroup.js';
import setSpec from './skills/setSpec.js';
import setMagicSkills from './skills/setMagicSkills.js';
import addSpell from './magic/addSpell.js';
import removeSpell from './magic/removeSpell.js';
import addComplexform from './magic/addComplexform.js';
import removeComplexform from './magic/removeComplexform.js';
import addPower from './magic/addPower.js';
import removePower from './magic/removePower.js';
import raisePower from './magic/raisePower.js';
import lowerPower from './magic/lowerPower.js';
import resetAbility from './magic/resetAbility.js';
import selectQuality from './quality/selectQuality.js';
import removeQuality from './quality/removeQuality.js';
import karma from './karma.js';
import purchaseGear from './gear/purchaseGear.js';
import sellGear from './gear/sellGear.js';
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
  addSkill
};
module.exports = actions;
