import { SELECT_GRADE } from "../const";

function action(parameter) {
	return { type: SELECT_GRADE, parameter };
}

export default action;
