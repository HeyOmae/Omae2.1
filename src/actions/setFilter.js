import { SET_FILTER } from './const';

function action(parameter) {
  return { type: SET_FILTER, parameter };
}

module.exports = action;
