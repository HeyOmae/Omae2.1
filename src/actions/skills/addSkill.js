import { ADD_SKILL } from './../const';

function action(parameter) {
	return { type: ADD_SKILL, parameter };
}

module.exports = action;
