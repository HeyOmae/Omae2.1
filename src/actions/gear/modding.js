import { MODDING } from './../const';

function action(parameter) {
	return { type: MODDING, parameter };
}

module.exports = action;
