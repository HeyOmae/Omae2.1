import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { purchaseGear } from '../../../actions';
import WareGradeComponent from './WareGradeComponent';
import AugmentationRowComponent from './AugmentationRowComponent';
import FilterableTable from '../../FilterableTable';
import CyberwareHeader from './CyberwareHeader';

class WareComponent extends React.PureComponent {
	render() {
		const {wares, purchaseWare, currentGrade} = this.props;
		return (
			<div>
				<div className="row">
					<div className="col-12">
						<WareGradeComponent />
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<FilterableTable
							header={<CyberwareHeader />}
						>
							{wares.reduce((memo, ware) => {
								return (
									/Cyberlimb/.test(ware.name) || ware.minrating ? memo :
									[
										...memo,
										<AugmentationRowComponent
											key={ware.name}
											ware={ware}
											purchase={purchaseWare}
											currentGrade={currentGrade}
										/>,
									]
								);
							}, [])}
						</FilterableTable>
					</div>
				</div>
			</div>
		);
	}
}

WareComponent.propTypes = {
	wares: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			ess: PropTypes.string.isRequired,
			avail: PropTypes.string.isRequired,
			cost: PropTypes.string.isRequired,
			source: PropTypes.string.isRequired,
			page: PropTypes.string.isRequired,
			rating: PropTypes.string,
		}).isRequired,
	).isRequired,
	purchaseWare: PropTypes.func.isRequired,
	currentGrade: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
	return {
		currentGrade: state.augmentation.grade,
	};
};

export { WareComponent };

export default connect(mapStateToProps, { purchaseWare: purchaseGear })(WareComponent);
