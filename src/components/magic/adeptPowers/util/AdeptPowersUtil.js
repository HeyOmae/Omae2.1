const bonusDown = (name, bonusToRemove, decreaseBy, decrementAugmented) => {
	const trimmedName = name.match(/^([^(]*)(\s{0,1}\(.*\)){0,1}$/)[1];
	const bonusAction = {
		'Improved Physical Attribute': () => {
			decrementAugmented({attribute: bonusToRemove, decreaseBy});
		},
		default: () => {
			return null;
		},
	};

	(bonusAction[trimmedName] || bonusAction.default)();
};

const bonusUp = (name, bonusToApply, incrementAugmented) => {
	const bonusAction = {
		'Improved Physical Attribute': () => {
			incrementAugmented({attribute: bonusToApply});
		},
		default: () => {
			return null;
		},
	};

	return (bonusAction[name] || bonusAction.default)();
};

const generateAddActionDetails = (isMystic, power, pointsSpent, maxPoints, selectedOption, incrementAugmented) => {
	if (pointsSpent + Number(power.points) <= maxPoints) {
		const name = power.name + selectedOption;
		const powerToAdd = Object.assign({}, power, {name});

		if (powerToAdd.bonus) {
			powerToAdd.bonus = selectedOption.replace(/[()]/g, '');
			bonusUp(power.name, powerToAdd.bonus, incrementAugmented);
		}

		if (powerToAdd.levels === 'yes') {
			powerToAdd.levels = 1;
		} else {
			powerToAdd.levels = 'N/A';
		}

		return {newSpell: powerToAdd, isMystic};
	}
	return '';
};

const generateRemoveActionDetails = (isMystic, power, index, decrementAugmented) => {
	if (power.bonus !== 'N/A') {
		bonusDown(power.name.match(/^([^(]*)(\s{0,1}\(.*\)){0,1}$/)[0], power.bonus, power.levels, decrementAugmented);
	}
	return {powerIndex: index, isMystic};
};

const raiseLevelAction = (isMystic, powerName, bonusOfPower, index, raisePower, incrementAugmented) => {
	return () => {
		bonusUp(powerName, bonusOfPower, incrementAugmented);
		raisePower({powerIndex: index, isMystic});
	};
};

const lowerLevelAction = (isMystic, powerName, bonusOfPower, index, lowerPower, decrementAugmented) => {
	return () => {
		bonusDown(powerName, bonusOfPower, 1, decrementAugmented);
		lowerPower({powerIndex: index, isMystic});
	};
};

export {bonusDown, bonusUp, generateAddActionDetails, generateRemoveActionDetails, lowerLevelAction, raiseLevelAction};
