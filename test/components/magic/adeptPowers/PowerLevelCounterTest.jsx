import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PowerLevelCounter from 'components/magic/adeptPowers/PowerLevelCounter';

describe('PowerLevelCounter', () => {
	const setup = ({
		power = {},
		pointsSpent = 1,
		maxPoints = 6,
		index = 3,
		isMystic = true,
	} = {}) => {
		const props = {
			power: {
				name: 'TestName',
				levels: 1,
				points: '0.5',
				bonus: 'N/A',
				source: 'Omae',
				page: 'v2',
				...power,
			},
			index,
			pointsSpent,
			maxPoints,
			isMystic,
			actions: {
				decrementAugmented: sinon.spy(),
				incrementAugmented: sinon.spy(),
				lowerPower: sinon.spy(),
				raisePower: sinon.spy(),
			},
		};

		const { container } = render(<PowerLevelCounter {...props} />);

		return {
			props,
			container,
			raise: screen.getByRole('button', { name: '+' }),
			lower: screen.getByRole('button', { name: '-' }),
		};
	};

	const isDisabled = (button) => button.classList.contains('disabled');

	describe('When the power can be increased but not decreased', () => {
		it('should show the current level', () => {
			const { container } = setup({ power: { levels: 1 } });

			expect(container.querySelector('span').textContent).to.equal('1');
		});

		it('should raise the power when + is clicked', async () => {
			const { raise, props } = setup({ power: { levels: 1 } });

			expect(isDisabled(raise)).to.be.false;
			await userEvent.click(raise);

			expect(props.actions.raisePower).to.have.been.calledOnceWith({ powerIndex: 3, isMystic: true });
		});

		it('should not lower the power when - is clicked', async () => {
			const { lower, props } = setup({ power: { levels: 1 } });

			expect(isDisabled(lower)).to.be.true;
			await userEvent.click(lower);

			expect(props.actions.lowerPower).to.not.have.been.called;
		});
	});

	describe('When the power can be increased and decreased', () => {
		it('should show the current level', () => {
			const { container } = setup({ power: { levels: 2 } });

			expect(container.querySelector('span').textContent).to.equal('2');
		});

		it('should raise the power when + is clicked', async () => {
			const { raise, props } = setup({ power: { levels: 2 } });

			expect(isDisabled(raise)).to.be.false;
			await userEvent.click(raise);

			expect(props.actions.raisePower).to.have.been.calledOnceWith({ powerIndex: 3, isMystic: true });
		});

		it('should lower the power when - is clicked', async () => {
			const { lower, props } = setup({ power: { levels: 2 } });

			expect(isDisabled(lower)).to.be.false;
			await userEvent.click(lower);

			expect(props.actions.lowerPower).to.have.been.calledOnceWith({ powerIndex: 3, isMystic: true });
		});
	});

	describe('When the power is Improved Physical Attribute', () => {
		const power = { levels: 2, name: 'Improved Physical Attribute(agi)', bonus: 'agi' };

		it('should augment the attribute when raised', async () => {
			const { raise, props } = setup({ power });

			await userEvent.click(raise);

			expect(props.actions.incrementAugmented).to.have.been.calledOnceWith({ attribute: 'agi' });
		});

		it('should reduce the augmented attribute when lowered', async () => {
			const { lower, props } = setup({ power });

			await userEvent.click(lower);

			expect(props.actions.decrementAugmented).to.have.been.calledOnceWith({ attribute: 'agi', decreaseBy: 1 });
		});
	});

	describe('When the power can be decreased but not increased because it is at max', () => {
		const power = { levels: 4, name: 'Improved Physical Attribute(test)' };

		it('should show the current level', () => {
			const { container } = setup({ power });

			expect(container.querySelector('span').textContent).to.equal('4');
		});

		it('should not raise the power when + is clicked', async () => {
			const { raise, props } = setup({ power });

			expect(isDisabled(raise)).to.be.true;
			await userEvent.click(raise);

			expect(props.actions.raisePower).to.not.have.been.called;
		});

		it('should lower the power when - is clicked', async () => {
			const { lower, props } = setup({ power });

			expect(isDisabled(lower)).to.be.false;
			await userEvent.click(lower);

			expect(props.actions.lowerPower).to.have.been.calledOnce;
		});
	});

	describe('When the power can be decreased but not increased because all points are spent', () => {
		const power = { levels: 3 };

		it('should not raise the power when + is clicked', async () => {
			const { raise, props } = setup({ power, pointsSpent: 4.75, maxPoints: 5 });

			expect(isDisabled(raise)).to.be.true;
			await userEvent.click(raise);

			expect(props.actions.raisePower).to.not.have.been.called;
		});

		it('should lower the power when - is clicked', async () => {
			const { lower, props } = setup({ power, pointsSpent: 4.75, maxPoints: 5 });

			expect(isDisabled(lower)).to.be.false;
			await userEvent.click(lower);

			expect(props.actions.lowerPower).to.have.been.calledOnce;
		});
	});
});
