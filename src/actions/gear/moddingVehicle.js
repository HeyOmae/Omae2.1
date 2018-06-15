import { MODDING_VEHICLE } from './../const';

function action(parameter) {
	return { type: MODDING_VEHICLE, parameter };
}

module.exports = action;
