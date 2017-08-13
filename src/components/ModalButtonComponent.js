import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'styles/Modal.sass';
import { modalOpen } from '../actions';

class ModalButtonComponent extends React.PureComponent {
	constructor(props) {
		super(props);
		// TODO: can't seem to get openModal method on class to bind(this), might be bug investigate later
		this.openModal = () => {
			const { modalName, modalContent, openModalAction } = this.props;
			openModalAction({modalName, modalContent});
		};
	}

	render() {
		const { modalName } = this.props,
			{ openModal } = this;

		return (
			<div className="modal-component">
				<button
					type="button"
					className="btn btn-info modal-open-btn"
					onClick={openModal}
				>
					{modalName}
				</button>
			</div>
		);
	}
}

ModalButtonComponent.displayName = 'ModalButtonComponent';

// Uncomment properties you need
ModalButtonComponent.propTypes = {
	modalName: PropTypes.string.isRequired,
	modalContent: PropTypes.element.isRequired,
	openModalAction: PropTypes.func.isRequired,
};

export default connect(null, { openModalAction: modalOpen })(ModalButtonComponent);
