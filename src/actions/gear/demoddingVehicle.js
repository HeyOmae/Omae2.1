import { DEMODDING_VEHICLE } from './../const';

function action(parameter) {
	return { type: DEMODDING_VEHICLE, parameter };
}

module.exports = action;
