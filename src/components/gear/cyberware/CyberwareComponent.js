import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import WareGradeComponent from './WareGradeComponent';
import CyberwareRowComponent from './CyberwareRowComponent';
import DisplayTable from '../../DisplayTableComponent';
import CyberwareHeader from './CyberwareHeader';

class CyberwareComponent extends React.PureComponent {
	render() {
		const {cyberwares} = this.props;
		return (
			<div>
				<div className="row">
					<div className="col-12">
						<WareGradeComponent />
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<DisplayTable
							header={<CyberwareHeader />}
						>
							{cyberwares.map((ware) => {
								return (<CyberwareRowComponent ware={ware} />);
							})}
						</DisplayTable>
					</div>
				</div>
			</div>
		);
	}
}

CyberwareComponent.propTypes = {
	cyberwares: Proptypes.arrayOf(
		Proptypes.shape({
			name: Proptypes.string.isRequired,
			ess: Proptypes.string.isRequired,
			avail: Proptypes.string.isRequired,
			cost: Proptypes.string.isRequired,
			source: Proptypes.string.isRequired,
			page: Proptypes.string.isRequired,
			rating: Proptypes.string,
		}).isRequired
	).isRequired
};

export { CyberwareComponent };

export default connect(null, null)(CyberwareComponent);
