import { SET_FILTER } from './const';

function action(parameter) {
	return { type: SET_FILTER, parameter };
}

export default action;
