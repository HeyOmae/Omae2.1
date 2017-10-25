import { SELECT_GRADE } from './../const';

function action(parameter) {
	return { type: SELECT_GRADE, parameter };
}

module.exports = action;
