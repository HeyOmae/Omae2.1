/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import ModificationButton from 'components/attributes/ModificationButton';

describe('ModificationButton', () => {
  let component;

  it('should have a button with the default class', () => {
    component = shallow(<ModificationButton/>);
    expect(component.find('button.btn').length)
      .to.equal(1);
  });

  it('should have a button with the passed class', () => {
    component = shallow(<ModificationButton/>);
    component.setProps({buttonClass: 'buttonTest'});
    expect(component.find('button.btn.buttonTest').length)
      .to.equal(1);
  });

  it('should have a button with the passed in symbol', () => {
    const symbol = '&';
    component = shallow(<ModificationButton/>);
    component.setProps({ symbol });
    expect(component.find('button.btn').text())
      .to.equal(symbol);
  });

  it('should call modificationFunction when clicked and pointsLeft isn\'t passed', () => {
    const modificationFunction = sinon.spy();
    component = shallow(<ModificationButton/>);
    component.setProps({ modificationFunction });
    component.find('button.btn').simulate('click')
    expect(modificationFunction.calledOnce).to.be.true;
  });

  it('should call modificationFunction when clicked and pointsLeft is 1', () => {
    const modificationFunction = sinon.spy();
    component = shallow(<ModificationButton/>);
    component.setProps({ modificationFunction, pointsLeft: 1 });
    component.find('button.btn').simulate('click')
    expect(modificationFunction.calledOnce).to.be.true;
  });

  it('should not call modificationFunction when clicked and pointsLeft is 0', () => {
    const modificationFunction = sinon.spy();
    component = shallow(<ModificationButton/>);
    component.setProps({ modificationFunction, pointsLeft: 0 });
    component.find('button.btn').simulate('click')
    expect(modificationFunction.calledOnce).to.be.false;
  });

  sinon.spy()
});
