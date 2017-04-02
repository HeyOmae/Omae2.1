import { WEAPON_MODDING } from './../const';

function action(parameter) {
	return { type: WEAPON_MODDING, parameter };
}

module.exports = action;
