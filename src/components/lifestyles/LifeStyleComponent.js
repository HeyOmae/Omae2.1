import React from 'react';
import PropTypes from 'prop-types';

import ModalButton from '../ModalButtonComponent';
import DisplayTable from '../DisplayTableComponent';
import LifeStyleModal from './LifeStyleModalContent';
import { LifeStyleTableHead } from './LifeStyleModalContent';

class LifeStyleComponent extends React.Component {
	render() {
		return (
			<div className="lifestyle">
				<h2>Lifestyles</h2>
				<ModalButton modalName="Lifestyles" modalContent={<LifeStyleModal />} />
				<DisplayTable header={<LifeStyleTableHead />} >
					{
						this.props.purchasedLifestyles.map((lifestyle) => {
							return (
								<tr key={lifestyle.id}><td>{lifestyle.name}</td></tr>
							);
						})
					}
				</DisplayTable>
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
};

LifeStyleComponent.defaultProps = {
	purchasedLifestyles: [],
};

export default LifeStyleComponent;
