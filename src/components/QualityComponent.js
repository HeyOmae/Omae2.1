'use strict';

import React from 'react';

require('styles//Quality.sass');

class QualityComponent extends React.Component {
  render() {
    return (
      <div className="quality-component">
        <h2>Qualities</h2>
        <h3>Positive</h3>
        <h3>Negative</h3>
      </div>
    );
  }
}

QualityComponent.displayName = 'QualityComponent';

// Uncomment properties you need
// QualityComponent.propTypes = {};
// QualityComponent.defaultProps = {};

export default QualityComponent;
