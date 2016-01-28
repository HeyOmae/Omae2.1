require('normalize.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
require('styles/App.css');

import React from 'react';
import PriorityTableComponent from './PriorityTableComponent';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index container">
        <h1>Omae v2</h1>
        <h2>Priority Table</h2>
        <PriorityTableComponent />

      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
