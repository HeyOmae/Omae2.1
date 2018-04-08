/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import { combineReducers } from 'redux'; /* Populated by react-webpack-redux:reducer */
import priorityTable from './priorityTable';
import selectMetatype from './selectMetatype';
import attributes from './attributes';
import selectMagRes from './selectMagRes';
import settingSkills from './settingSkills';
import appControl from './appControl';
import spellSelect from './spellSelect';
import quality from './quality';
import karma from './karma';
import modalToggle from './modalToggle';
import purchaseGear from './gear/purchaseGear';
import filterTable from './filterTable';
import augmentation from './gear/augmentation';

const reducers = {
	priorityTable,
	selectMetatype,
	attributes,
	selectMagRes,
	settingSkills,
	appControl,
	spellSelect,
	quality,
	karma,
	modalToggle,
	purchaseGear,
	filterTable,
	augmentation,
};
module.exports = combineReducers(reducers);
