import { FILTER_TABLE } from './const';

function action(parameter) {
  return { type: FILTER_TABLE, parameter };
}

module.exports = action;
