import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { purchaseGear } from '../../../actions';
import WareGradeComponent from './WareGradeComponent';
import CyberwareRowComponent from './CyberwareRowComponent';
import DisplayTable from '../../DisplayTableComponent';
import CyberwareHeader from './CyberwareHeader';

class CyberwareComponent extends React.PureComponent {
	render() {
		const {cyberwares, purchaseWare} = this.props;
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
								return (
									<CyberwareRowComponent
										key={ware.name}
										ware={ware}
										purchase={purchaseWare}
									/>
								);
							})}
						</DisplayTable>
					</div>
				</div>
			</div>
		);
	}
}

CyberwareComponent.propTypes = {
	cyberwares: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			ess: PropTypes.string.isRequired,
			avail: PropTypes.string.isRequired,
			cost: PropTypes.string.isRequired,
			source: PropTypes.string.isRequired,
			page: PropTypes.string.isRequired,
			rating: PropTypes.string,
		}).isRequired
	).isRequired,
	purchaseWare: PropTypes.func.isRequired,
	currentGrade: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
	return {
		currentGrade: state.augmentation.grade
	};
};

export { CyberwareComponent };

export default connect(mapStateToProps, { purchaseWare: purchaseGear })(CyberwareComponent);
