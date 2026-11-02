import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import * as allActions from 'actions';
import configureStore from 'stores';
import SkillsComponent from 'components/skills/SkillsComponent';
import priorityData from 'data/priority.json';
import { renderWithStore } from '../../helpers/render';

describe('<SkillsComponent />', () => {
	const setup = () => {
		const store = configureStore(),
			state = store.getState(),
			actions = Object.fromEntries(Object.keys(allActions.default).map((name) => [name, sinon.spy()])),
			props = {
				actions,
				priority: state.priorityTable,
				skills: state.settingSkills,
				attributes: state.attributes,
				metatype: state.selectMetatype,
				magictype: state.selectMagRes,
			};

		const { rerender } = renderWithStore(<SkillsComponent {...props} />, store);

		const update = (newProps) => rerender(
			<Provider store={store}>
				<SkillsComponent {...props} {...newProps} />
			</Provider>,
		);

		return { props, actions, update };
	};

	const addFirstAgilitySkill = async () => {
		await userEvent.click(screen.getByRole('button', { name: 'Agility' }));
		const modal = screen.getByRole('heading', { name: 'Agility', level: 4 }).closest('.modal');
		await userEvent.click(within(modal).getAllByRole('button', { name: '+' })[0]);
	};

	it('should add a skill when there are skill points left', async () => {
		const { actions } = setup();

		await addFirstAgilitySkill();

		expect(actions.addSkill).to.have.been.calledOnce;
		expect(actions.addSkill.firstCall.args[0]).to.include({ category: 'active', max: 6 });
	});

	it('should use the current skill points, not the ones from when it was first rendered', async () => {
		const { props, actions, update } = setup(),
			{ skillpoints } = priorityData[props.priority.skills].skills;

		update({ skills: { ...props.skills, skillPointsSpent: skillpoints } });
		await addFirstAgilitySkill();

		expect(actions.addSkill).to.not.have.been.called;
	});
});
