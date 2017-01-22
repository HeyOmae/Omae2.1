import { REMOVE_SKILL } from './../const';

function action(parameter) {
	return { type: REMOVE_SKILL, parameter };
}

module.exports = action;
