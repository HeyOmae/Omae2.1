import { MODDING_MULTI } from './../const';

function action(parameter) {
	return { type: MODDING_MULTI, parameter };
}

module.exports = action;
