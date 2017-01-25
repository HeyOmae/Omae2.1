import { STYLE } from './../const';

function action(parameter) {
	return { type: STYLE, parameter };
}

module.exports = action;
