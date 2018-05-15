import React from 'react';
import reducer from '../../src/reducers/modalToggle';

describe('modalToggle', () => {
	const state = {
			modalName: '',
			modalContent: null,
		},
		testModal = {
			modalName: 'test',
			modalContent: (<div>I'm a Modal</div>),
		};

	it('should not change the passed state', (done) => {
		const state = Object.freeze({});
		reducer(state, { type: 'INVALID' });

		done();
	});

	describe('MODAL_OPEN', () => {
		it('should set a <Modal/> to state', () => {
			const newState = reducer(state, { type: 'MODAL_OPEN', parameter: testModal });

			expect(newState).to.equal(testModal);
			expect(state).to.equal(state);
		});
	});

	describe('MODAL_CLOSE', () => {
		it('should set the modal state to null', () => {
			const testState = testModal;
			const newState = reducer(testState, { type: 'MODAL_CLOSE' });

			expect(newState).to.deep.equal(state);
			expect(testState).to.equal(testModal);
		});
	});
});
