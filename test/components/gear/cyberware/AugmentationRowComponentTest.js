import React from 'react';
import { shallow } from 'enzyme';

import AugmentationRowComponent from 'components/gear/cyberware/AugmentationRowComponent';

describe('AugmentationRowComponent', () => {
	const datajack = {
		id: "47c48542-48c3-417e-91f0-b5a456183f05",
		name: "Datajack",
		category: "Headware",
		ess: "0.1",
		capacity: "0",
		avail: "2",
		cost: "1000",
		source: "SR5",
		page: "452"
	},	dataLock = {
		id: "eb9e691a-8002-4138-ac8d-d9714d398b1e",
		name: "Data Lock",
		category: "Headware",
		ess: "0.1",
		capacity: "[1]",
		avail: "Rating * 2",
		cost: "Rating * 1000",
		source: "SR5",
		page: "452",
		rating: "12"
	}, voiceMod = {
		id: "ebc25387-655f-4a24-8ae7-81548c097dac",
		name: "Voice Modulator",
		category: "Headware",
		ess: "0.2",
		capacity: "0",
		avail: "Rating * 3F",
		cost: "Rating * 5000",
		source: "SR5",
		page: "452",
		bonus: {
			specificskill: {
				name: "Impersonation",
				bonus: "Rating",
				applytorating: "no"
			}
		},
		rating: "6"
	}, knowWare = {
		id: "56a5fcc1-5da7-4728-aae9-073c92f67c2b",
		name: "Knowledge Hardwires",
		category: "Headware",
		ess: "Rating * 0.05",
		capacity: "0",
		avail: "Rating",
		cost: "Rating * 2000",
		source: "CF",
		page: "80",
		rating: "6"
	}, controlRig = {
		id: "16b45886-2916-48eb-aea5-ecb74da835bd",
		name: "Control Rig",
		category: "Headware",
		ess: "Rating * 1",
		capacity: "0",
		avail: "Rating * 5",
		cost: "FixedValues(43000,97000,208000)",
		source: "SR5",
		page: "452",
		rating: "3"
	}, trollReduction = {
		id: "aa347008-38f1-4cb4-a919-bc705a8efe71",
		name: "Troll Reduction",
		category: "Biosculpting",
		ess: "FixedValues(0.2,0.5)",
		capacity: "0",
		avail: "FixedValues(8,12)",
		cost: "FixedValues(15000,25000)",
		bonus: {
			armor: "-1",
			specificattribute: {
				name: "CHA",
				max: "Rating"
			}
		},
		rating: "2",
		required: {
			oneof: {
				metatype: "Troll"
			}
		},
		source: "CF",
		page: "108"
	}, strikingCallus = {
		id: "8832f6ac-0082-4b9b-9e1c-7f90874a23a1",
		name: "Striking Callus",
		category: "Bio-Weapons",
		ess: "0.05*Rating",
		capacity: "0",
		avail: "2",
		cost: "Rating*250",
		bonus: {
			unarmeddv: "Rating*0.5"
		},
		notes: "Rating is used to represent hands and feet. Every 2 Rating will grant +1 Unarmed damage.",
		rating: "4",
		source: "CF",
		page: "121"
	}, consmenticMod = {
		id: "df427266-60ea-4289-94ee-a30bb46ceb89",
		name: "Cosmetic Modifcations (2050)",
		category: "Bodyware",
		ess: "0",
		capacity: "0",
		avail: "2",
		cost: "Variable(2000-10000)",
		source: "2050",
		page: "203"
	};

	const setup = (ware = datajack, currentGrade = 0) => {
		const props = {
			ware,
			currentGrade,
			purchase: sinon.spy()
		},
			augmentationRowComponent = shallow(<AugmentationRowComponent {...props} />);
		return {augmentationRowComponent, props};
	}

	it('should display stats about cyberware', () => {
		const { augmentationRowComponent } = setup();

		expect(augmentationRowComponent.find('.cyberware--name').text()).to.equal(datajack.name);
		expect(augmentationRowComponent.find('.cyberware--ess').text()).to.equal(datajack.ess);
		expect(augmentationRowComponent.find('.cyberware--avail').text()).to.equal(datajack.avail);
		expect(augmentationRowComponent.find('.cyberware--cost').text()).to.equal(`${datajack.cost}¥`);
		expect(augmentationRowComponent.find('.cyberware--ref').text()).to.equal(`${datajack.source} p${datajack.page}`);
	});

	describe('variable cost', () => {
		it('should display an input field', () => {
			const {augmentationRowComponent} = setup(consmenticMod);

			const costInput = augmentationRowComponent.find('.cyberware--cost__input');

			expect(costInput).lengthOf(1);
			expect(costInput.props().placeholder).to.equal('2000-10000¥')
		});

		it('should update state cost on change', () => {
			const {augmentationRowComponent} = setup(consmenticMod);

			const costInput = augmentationRowComponent.find('.cyberware--cost__input');

			costInput.simulate('change', {target: {value: '5000'}});

			expect(augmentationRowComponent.state().cost).to.equal(5000);
			expect(augmentationRowComponent.find('.cyberware--cost__input').props().value).to.equal(5000);
		});

		it('should not set the cost higher then the max', () => {
			const {augmentationRowComponent} = setup(consmenticMod);

			const costInput = augmentationRowComponent.find('.cyberware--cost__input');

			costInput.simulate('change', {target: {value: '10001'}});

			expect(augmentationRowComponent.state().cost).to.equal(10000);
			expect(augmentationRowComponent.find('.cyberware--cost__input').props().value).to.equal(10000);
		});

		it('should puchase gear at the state.cost', () => {
			const {augmentationRowComponent, props} = setup(consmenticMod);

			augmentationRowComponent.setState({
				cost: 5000,
			});

			augmentationRowComponent.find('button').simulate('click');

			expect(props.purchase).to.have.been.calledWith({
				gear: {
					...consmenticMod,
					ess: 0,
					cost: 5000
				},
				category: 'augmentations'
			});
		});

		it('should puchase gear at the cost.min if state.cost is below that', () => {
			const {augmentationRowComponent, props} = setup(consmenticMod);

			augmentationRowComponent.setState({
				cost: 1,
			});

			augmentationRowComponent.find('button').simulate('click');

			expect(props.purchase).to.have.been.calledWith({
				gear: {
					...consmenticMod,
					ess: 0,
					cost: 2000
				},
				category: 'augmentations'
			});
		});
	});

	describe('rating', () => {
		it('should display N/A if there is no rating', () => {
			const { augmentationRowComponent } = setup();

			expect(augmentationRowComponent.find('.cyberware--rating').text()).to.equal('N/A');
		});

		it('should display a select box if there is a rating', () => {
			const { augmentationRowComponent } = setup(dataLock);
			
			expect(augmentationRowComponent.find('select')).lengthOf(1);

			expect(augmentationRowComponent.find('option')).lengthOf(12);
		});

		it('should change state Rating on change event', () => {
			const {augmentationRowComponent} = setup(dataLock);

			augmentationRowComponent.find('select').simulate('change', {target: { value: '3'}});

			expect(augmentationRowComponent.state('Rating')).to.equal(3);
		});

		it('should change the displayed stats based off the rating', () => {
			const {augmentationRowComponent} = setup(dataLock);
			augmentationRowComponent.setState({Rating: 4});

			expect(augmentationRowComponent.find('.cyberware--avail').text()).to.equal('8');
			expect(augmentationRowComponent.find('.cyberware--ess').text()).to.equal('0.1');
		});

		it('should handle restricted/forbidden gear avail', () => {
			const {augmentationRowComponent} = setup(voiceMod);

			augmentationRowComponent.setState({Rating: 3});

			expect(augmentationRowComponent.find('.cyberware--avail').text()).to.equal('9F');
			expect(augmentationRowComponent.find('.cyberware--ess').text()).to.equal('0.2');
		});

		describe('change essence', () => {
			it('should use Rating as avail without multiplier, multiple essence cost based off rating', () => {
				const {augmentationRowComponent} = setup(knowWare);

				augmentationRowComponent.setState({ Rating: 2 });

				expect(augmentationRowComponent.find('.cyberware--avail').text()).to.equal('2');
				expect(augmentationRowComponent.find('.cyberware--ess').text()).to.equal('0.1');
			});

			it('should display fixed values for essence', () => {
				const {augmentationRowComponent} = setup(trollReduction);

				expect(augmentationRowComponent.find('.cyberware--avail').text()).to.equal('8');
				expect(augmentationRowComponent.find('.cyberware--ess').text()).to.equal('0.2');
				expect(augmentationRowComponent.find('.cyberware--cost').text()).to.equal('15000¥');
			});

			it('should calculate the essence when the formula is  formated weird', () => {
				const {augmentationRowComponent} = setup(strikingCallus);

				expect(augmentationRowComponent.find('.cyberware--avail').text()).to.equal('2');
				expect(augmentationRowComponent.find('.cyberware--ess').text()).to.equal('0.05');
				expect(augmentationRowComponent.find('.cyberware--cost').text()).to.equal('250¥');
			});
		});


		describe('change cost', () => {
			it('should scale off rating', () => {
				const {augmentationRowComponent} = setup(dataLock);
				augmentationRowComponent.setState({ Rating: 5});

				expect(augmentationRowComponent.find('.cyberware--cost').text()).to.equal('5000¥');
			});

			it('should use fixed cost based off rating', () => {
				const {augmentationRowComponent} = setup(controlRig);
				expect(augmentationRowComponent.find('.cyberware--cost').text()).to.equal('43000¥');

				augmentationRowComponent.setState({ Rating: 3 });


				expect(augmentationRowComponent.find('.cyberware--cost').text()).to.equal('208000¥');
			});
		});
	});

	describe('cyberware grade', () => {
		it('should change the avail, cost, and essence code of cyberware', () => {
			const {augmentationRowComponent} = setup(datajack, 1);

			expect(augmentationRowComponent.find('.cyberware--avail').text()).to.equal('0');
			expect(augmentationRowComponent.find('.cyberware--cost').text()).to.equal('750¥');
			expect(augmentationRowComponent.find('.cyberware--ess').text()).to.equal('0.125');
		});
	});

	describe('purchase button', () => {
		it('should invoke the purchase prop on click', () => {
			const {augmentationRowComponent, props} = setup();

			augmentationRowComponent.find('button').simulate('click');

			expect(props.purchase).to.have.been.calledWith({
				gear: {
					...props.ware,
					ess: 0.1,
					cost: 1000
				},
				category: 'augmentations'
			});
		});

		it('should alter the stats of the ware based off grade', () => {
			const {augmentationRowComponent, props} = setup(controlRig);
			augmentationRowComponent.setState({Rating: 3});

			augmentationRowComponent.find('button').simulate('click');

			expect(props.purchase).to.have.been.calledWith({
				gear: {
					...props.ware,
					ess: 3,
					avail: '15',
					cost: 208000,
				},
				category: 'augmentations'
			});
		});
	});
});