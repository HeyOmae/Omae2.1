import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SpellSelectorComponent from 'components/magic/SpellSelectorComponent';
import spellData from 'data/spells.json';
import { renderWithStore } from '../../helpers/render';

describe('<SpellSelectorComponent />', () => {
	const setup = ({ selectedSpells = [], spellMax = 10 } = {}) => {
		const props = {
			abilities: 'Spells',
			addSpell: sinon.spy(),
			removeSpell: sinon.spy(),
			selectedSpells,
			spellMax,
		};

		renderWithStore(<SpellSelectorComponent {...props} />);

		return { props };
	};

	const openCategory = async (category) => {
		await userEvent.click(screen.getByRole('button', { name: category }));
		return screen.getAllByRole('heading', { name: category, level: 4 })
			.map((heading) => heading.closest('.modal'))
			.find(Boolean);
	};

	const spellRow = (modal, text) => within(modal).getAllByRole('row')
		.find((row) => row.textContent.includes(text));

	it('should have a modal button for each spell category', () => {
		setup();

		const categories = [...new Set(spellData.map((spell) => spell.category))];

		expect(screen.getAllByRole('button').map((button) => button.textContent)).to.eql(categories);
	});

	it('should add a spell', async () => {
		const { props } = setup();
		const modal = await openCategory('Combat');

		await userEvent.click(within(spellRow(modal, 'Manabolt')).getByRole('button', { name: '+' }));

		expect(props.addSpell).to.have.been.calledOnce;
		expect(props.addSpell.firstCall.args[0].newSpell.name).to.equal('Manabolt');
	});

	it('should fill in the option of a spell from its input', async () => {
		const { props } = setup();
		const modal = await openCategory('Health');
		const increaseRow = spellRow(modal, 'Increase');

		await userEvent.type(within(increaseRow).getByPlaceholderText('[Attribute]'), 'AGI');
		await userEvent.click(within(increaseRow).getByRole('button', { name: '+' }));

		const { newSpell } = props.addSpell.firstCall.args[0];
		expect(newSpell.name).to.equal('Increase AGI');
		expect(newSpell.bonus).to.equal('AGI');
	});

	it('should not add a spell when the spell max is reached', async () => {
		const manabolt = spellData.find((spell) => spell.name === 'Manabolt');
		const { props } = setup({ selectedSpells: [manabolt], spellMax: 1 });
		const modal = await openCategory('Combat');

		await userEvent.click(within(spellRow(modal, 'Stunbolt')).getByRole('button', { name: '+' }));

		expect(props.addSpell).to.not.have.been.called;
	});

	it('should list selected spells and remove them', async () => {
		const manabolt = spellData.find((spell) => spell.name === 'Manabolt'),
			stunbolt = spellData.find((spell) => spell.name === 'Stunbolt');
		const { props } = setup({ selectedSpells: [manabolt, stunbolt] });

		const selected = screen.getByRole('heading', { name: 'Combat', level: 4 }).closest('div');
		await userEvent.click(within(spellRow(selected, 'Stunbolt')).getByRole('button', { name: '-' }));

		expect(props.removeSpell).to.have.been.calledOnceWith({ spellIndex: 1 });
	});
});
