import { DEMODDING_CAPACITY } from './../const';

function action(parameter) {
	return { type: DEMODDING_CAPACITY, parameter };
}

module.exports = action;
