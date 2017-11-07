import React from 'react';
import * as AdeptPowersUtil from 'components/magic/adeptPowers/util/AdeptPowersUtil';

var sandbox = sinon.createSandbox();

describe('bonusDown', () => {
	it('Should call decrementAugmented for Improved Physical Attribute', () => {
		const decrementAugmented = sinon.spy();
		const name = 'Improved Physical Attribute(Fake)';
		const bonusToRemove = 'Fake';
		const decreaseBy = 5;

		AdeptPowersUtil.bonusDown(name, bonusToRemove, decreaseBy, decrementAugmented);

		expect(decrementAugmented).to.have.been.calledWith({attribute: bonusToRemove, decreaseBy});
	});

	it('Should not call decrementAugmented for anything else', () => {
		const decrementAugmented = sinon.spy();
		const name = 'anything else';
		const bonusToRemove = 'Fake';
		const decreaseBy = 5;

		AdeptPowersUtil.bonusDown(name, bonusToRemove, decreaseBy, decrementAugmented);

		expect(decrementAugmented).to.not.have.been.called;
	});
});

describe('bonusUp', () => {
	it('Should call incrementAugmented for Improved Physical Attribute', () => {
		const incrementAugmented = sinon.spy();
		const name = 'Improved Physical Attribute';
		const bonusToApply = 'Fake';

		AdeptPowersUtil.bonusUp(name, bonusToApply, incrementAugmented);

		expect(incrementAugmented).to.have.been.calledWith({attribute: bonusToApply});
	});

	it('Should not call incrementAugmented for anything else', () => {
		const incrementAugmented = sinon.spy();
		const name = 'anything else';
		const bonusToApply = 'Fake';

		AdeptPowersUtil.bonusDown(name, bonusToApply, incrementAugmented);

		expect(incrementAugmented).to.not.have.been.called;
	});
});

describe('generateAddActionDetails', () => {
	it('Should return an empty string when too many points would be spent', () => {
		const isMystic = false;
		const power = {
			points: 1.5,
			name: 'TestName'
		};
		const pointsSpent = 4;
		const maxPoints = 5;
		const selectedOption = '';
		const incrementAugmented = sinon.spy();

		expect(AdeptPowersUtil.generateAddActionDetails(isMystic, power, pointsSpent, maxPoints, selectedOption, incrementAugmented)).to.equal('');
		expect(incrementAugmented).to.not.be.called;
	});

	it('Should return an N/A for levels if it can be passed has no levels', () => {
		const isMystic = false;
		const power = {
			points: 1.5,
			name: 'TestName'
		};
		const pointsSpent = 3.5;
		const maxPoints = 5;
		const selectedOption = '';
		const incrementAugmented = sinon.spy();
		const adjustedSpell = Object.assign({}, power, {levels:'N/A'})

		const returnValue = AdeptPowersUtil.generateAddActionDetails(isMystic, power, pointsSpent, maxPoints, selectedOption, incrementAugmented);

		expect(returnValue).to.eql({newSpell: adjustedSpell, isMystic});
		expect(incrementAugmented).to.not.be.called;
	});

	it('Should return an 1 for levels if the power has levels', () => {
		const isMystic = false;
		const power = {
			points: 1.5,
			name: 'TestName',
			levels: 'yes'
		};
		const pointsSpent = 3.5;
		const maxPoints = 5;
		const selectedOption = '';
		const incrementAugmented = sinon.spy();
		const adjustedSpell = Object.assign({}, power, {levels:1})

		const returnValue = AdeptPowersUtil.generateAddActionDetails(isMystic, power, pointsSpent, maxPoints, selectedOption, incrementAugmented);

		expect(returnValue).to.eql({newSpell: adjustedSpell, isMystic});
		expect(incrementAugmented).to.not.be.called;
	});

	it('Should call incrementAugmented if there is enough points left to add', () => {
		const isMystic = false;
		const power = {
			points: 1.5,
			name: 'Improved Physical Attribute',
			levels: 'yes',
			bonus: {'selectattribute': {}}
		};
		const pointsSpent = 3.5;
		const maxPoints = 5;
		const selectedOption = '(Test)';
		const incrementAugmented = sinon.spy();
		const adjustedSpell = Object.assign({}, power, {levels: 1, name: power.name + selectedOption, bonus: selectedOption.replace(/[()]/g, '')})

		const returnValue = AdeptPowersUtil.generateAddActionDetails(isMystic, power, pointsSpent, maxPoints, selectedOption, incrementAugmented);

		expect(returnValue).to.eql({newSpell: adjustedSpell, isMystic});
		expect(incrementAugmented).to.be.calledWith({attribute:selectedOption.replace(/[()]/g, '')});
	});
});

describe('generateRemoveActionDetails', () => {
	beforeEach(function() {
		 sandbox.spy(AdeptPowersUtil, 'bonusDown');
	});

	afterEach(function() {
		 sandbox.restore();
	});

	it('Should return the power index and isMystic value', () => {
		const isMystic = false;
		const power = {
			bonus: 'N/A'
		};
		const index = 5;

		const returnValue = AdeptPowersUtil.generateRemoveActionDetails(isMystic, power, index, () => {});

		expect(returnValue).to.eql({powerIndex: index, isMystic});
		expect(AdeptPowersUtil.bonusDown).to.not.be.called;
	});

	it('Should call decrementAugmented if it is improved attribute', () => {
		const isMystic = true;
		const baseName = 'Improved Physical Attribute';
		const attribute = 'Test'
		const power = {
			name: baseName + '(' + attribute +')',
			bonus: 'Test',
			levels: 5
		};
		const index = 5;
		const decrementAugmented = sinon.spy();

		const returnValue = AdeptPowersUtil.generateRemoveActionDetails(isMystic, power, index, decrementAugmented);
		expect(returnValue).to.eql({powerIndex: index, isMystic});
		expect(decrementAugmented).to.be.calledWith({ attribute, decreaseBy: 5});
	});
});

// Going to skip: raiseLevelAction, lowerLevelAction, and generatePowerDetailTablesRows not sure best way to test for now
