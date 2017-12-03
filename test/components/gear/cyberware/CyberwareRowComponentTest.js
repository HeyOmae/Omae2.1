import React from 'react';
import { shallow } from 'enzyme';

import CyberwareRowComponent from 'components/gear/cyberware/CyberwareRowComponent';

describe('CyberwareRowComponent', () => {
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
	};

	const setup = (ware = datajack) => {
		const props = {
			ware
		},
			cyberwareRowComponent = shallow(<CyberwareRowComponent {...props} />);
		return {cyberwareRowComponent, props};
	}

	it('should display stats about cyberware', () => {
		const { cyberwareRowComponent } = setup();

		expect(cyberwareRowComponent.find('.cyberware--name').text()).to.equal(datajack.name);
		expect(cyberwareRowComponent.find('.cyberware--ess').text()).to.equal(datajack.ess);
		expect(cyberwareRowComponent.find('.cyberware--avail').text()).to.equal(datajack.avail);
		expect(cyberwareRowComponent.find('.cyberware--cost').text()).to.equal(`${datajack.cost}¥`);
		expect(cyberwareRowComponent.find('.cyberware--ref').text()).to.equal(`${datajack.source} p${datajack.page}`);
	});

	describe('rating', () => {
		it('should display N/A if there is no rating', () => {
			const { cyberwareRowComponent } = setup();

			expect(cyberwareRowComponent.find('.cyberware--rating').text()).to.equal('N/A');
		});

		it('should display a select box if there is a rating', () => {
			const { cyberwareRowComponent } = setup(dataLock);
			
			expect(cyberwareRowComponent.find('select')).lengthOf(1);

			expect(cyberwareRowComponent.find('option')).lengthOf(12);
		});

		it('should change state Rating on change event', () => {
			const {cyberwareRowComponent} = setup(dataLock);

			cyberwareRowComponent.find('select').simulate('change', {target: { value: '3'}});

			expect(cyberwareRowComponent.state('Rating')).to.equal(3);
		});

		it('should change the displayed stats based off the rating', () => {
			const {cyberwareRowComponent} = setup(dataLock);
			cyberwareRowComponent.setState({Rating: 4});

			expect(cyberwareRowComponent.find('.cyberware--avail').text()).to.equal('8');
			expect(cyberwareRowComponent.find('.cyberware--ess').text()).to.equal('0.1');
		});

		it('should handle restricted/forbidden gear avail', () => {
			const {cyberwareRowComponent} = setup(voiceMod);

			cyberwareRowComponent.setState({Rating: 3});

			expect(cyberwareRowComponent.find('.cyberware--avail').text()).to.equal('9F');
			expect(cyberwareRowComponent.find('.cyberware--ess').text()).to.equal('0.2');
		});

		it('should use Rating as avail without multiplier, multiple essence cost based off rating', () => {
			const {cyberwareRowComponent} = setup(knowWare);

			cyberwareRowComponent.setState({ Rating: 2 });

			expect(cyberwareRowComponent.find('.cyberware--avail').text()).to.equal('2');
			expect(cyberwareRowComponent.find('.cyberware--ess').text()).to.equal('0.1');
		});

		describe('change cost', () => {
			it('should scale off rating', () => {
				const {cyberwareRowComponent} = setup(dataLock);
				cyberwareRowComponent.setState({ Rating: 5});

				expect(cyberwareRowComponent.find('.cyberware--cost').text()).to.equal('5000¥');
			});

			it('should use fixed cost based off rating', () => {
				const {cyberwareRowComponent} = setup(controlRig);
				expect(cyberwareRowComponent.find('.cyberware--cost').text()).to.equal('43000¥');

				cyberwareRowComponent.setState({ Rating: 3 });


				expect(cyberwareRowComponent.find('.cyberware--cost').text()).to.equal('208000¥');
			});
		});
	});
});