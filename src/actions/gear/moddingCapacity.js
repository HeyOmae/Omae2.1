import { MODDING_CAPACITY } from './../const';

function action(parameter) {
	return { type: MODDING_CAPACITY, parameter };
}

module.exports = action;
