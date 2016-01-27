require('normalize.css');
require('styles/App.css');

import React from 'react';
import PriorityTableComponent from './PriorityTableComponent';

let yeomanImage = require('../images/yeoman.png');


class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <h1>Priority Table</h1>
        <PriorityTableComponent />

      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
