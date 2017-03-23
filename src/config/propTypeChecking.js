import {
	PropTypes
} from 'react';

const propTypePriorityCheck = PropTypes.oneOf(['A', 'B', 'C', 'D', 'E']);

export default {
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
			addSkill: PropTypes.func.isRequired
		}),
	appControl: PropTypes.shape(
		{
			summaryFix: PropTypes.bool.isRequired,
		}),
	priorityTable: PropTypes.shape(
		{
			metatype: propTypePriorityCheck.isRequired,
			attribute: propTypePriorityCheck.isRequired,
			magres: propTypePriorityCheck.isRequired,
			skills: propTypePriorityCheck.isRequired,
			resources: propTypePriorityCheck.isRequired
		}),
	propTypePriorityCheck,
	selectMetatype: PropTypes.shape(
		{
			typeName: PropTypes.string,
			priority: propTypePriorityCheck
		}),
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
			augmented: PropTypes.objectOf(PropTypes.number),
			special: PropTypes.number.isRequired,
			baseSpent: PropTypes.number.isRequired,
			specialSpent: PropTypes.number.isRequired
		}),
	selectMagRes: PropTypes.string,
	settingSkills: PropTypes.shape(
		{
			active: PropTypes.object.isRequired,
			knowledge: PropTypes.object.isRequired,
			groups: PropTypes.object.isRequired,
			magicSkills: PropTypes.array.isRequired,
			skillPointsSpent: PropTypes.number.isRequired,
			groupPointSpent: PropTypes.number.isRequired
		}),
	spellSelect: PropTypes.shape(
		{
			spells: PropTypes.array.isRequired,
			powers: PropTypes.array.isRequired,
			powerPointsSpent: PropTypes.number.isRequired,
			powerPointsKarma: PropTypes.number.isRequired,
			complexforms: PropTypes.array.isRequired
		}),
	quality: PropTypes.shape(
		{
			Positive: PropTypes.array.isRequired,
			Negative: PropTypes.array.isRequired,
			karma: PropTypes.shape({
				Positive: PropTypes.number.isRequired,
				Negative: PropTypes.number.isRequired
			}).isRequired
		}),
	karma: PropTypes.number,
	purchaseGear: PropTypes.shape(
		{
			nuyen: PropTypes.number.isRequired
		})
};
