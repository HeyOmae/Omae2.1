import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import WareGradeComponent from './WareGradeComponent';

class CyberwareComponent extends React.PureComponent {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-12">
						<WareGradeComponent />
					</div>
				</div>
			</div>
		);
	}
}

export { CyberwareComponent };

export default connect(null, null)(CyberwareComponent);
