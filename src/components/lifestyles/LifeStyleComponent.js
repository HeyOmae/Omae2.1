import React from 'react';

import ModalButton from '../ModalButtonComponent';
import LifeStyleModal from './LifeStyleModalContent';

class LifeStyleComponent extends React.Component {
	render() {
		return (
			<div className="lifestyle">
				<h2>Lifestyles</h2>
				<ModalButton modalName="Lifestyles" modalContent={<LifeStyleModal />} />
			</div>
		);
	}
}

export default LifeStyleComponent;
