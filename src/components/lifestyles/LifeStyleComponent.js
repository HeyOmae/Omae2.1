import React from 'react';
import PropTypes from 'prop-types';

import ModalButton from '../ModalButtonComponent';
import DisplayTable from '../DisplayTableComponent';
import LifeStyleModal, { LifeStyleTableHead } from './LifeStyleModalContent';
import LifeStylePurchasedRow from './LifeStylePurchasedRowComponent';

class LifeStyleComponent extends React.Component {
	render() {
		return (
			<div className="lifestyle">
				<h2>Lifestyles</h2>
				<ModalButton modalName="Lifestyles" modalContent={<LifeStyleModal />} />
				{
					this.props.purchasedLifestyles.length > 0 &&
					<DisplayTable header={<LifeStyleTableHead />} >
						{
							this.props.purchasedLifestyles.map((lifestyle, index) => (
								<LifeStylePurchasedRow
									key={`lifestyle--purchased--${lifestyle.id}`}
									lifestyle={lifestyle}
									index={index}
									sellLifestyle={this.props.sellGear}
								/>
							))
						}
					</DisplayTable>
				}
			</div>
		);
	}
}

LifeStyleComponent.propTypes = {
	purchasedLifestyles: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			cost: PropTypes.string.isRequired,
			dice: PropTypes.string.isRequired,
			freegrids: PropTypes.object.isRequired,
			lp: PropTypes.string.isRequired,
			multiplier: PropTypes.string.isRequired,
			source: PropTypes.string.isRequired,
			page: PropTypes.string.isRequired,
		}),
	),
	sellGear: PropTypes.func.isRequired,
};

LifeStyleComponent.defaultProps = {
	purchasedLifestyles: [],
};

export default LifeStyleComponent;
