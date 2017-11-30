import React from 'react';
import PropTypes from 'prop-types';

import 'styles/Modal.sass';

class ModalComponent extends React.PureComponent {
	constructor(props) {
		super(props);
		this.dismissModal = this.dismissModal.bind(this);
	}

	dismissModal(e) {
		// TODO: this seems really hacker, figure out a better solution
		if (e.target.className === 'modal') {
			this.props.closeModal();
		}
	}
	render() {
		const {modalName, modalContent, children, closeModal} = this.props;
		return modalContent && (
			<div
				className="modal"
				onClick={this.dismissModal}
				role="button"
				tabIndex="0"
				>
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">{modalName}</h4>
							<button
								type="button"
								className="close modal-close"
								onClick={closeModal}
							>
								&times;
							</button>
						</div>
						<div className="modal-body">
							{modalContent || children}
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary modal-close"
								onClick={closeModal}>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ModalComponent.propTypes = {
	modalName: PropTypes.string.isRequired,
	modalContent: PropTypes.node,
	children: PropTypes.node,
	closeModal: PropTypes.func.isRequired
};

ModalComponent.defaultProps = {
	modalContent: null,
	children: null
};

export default ModalComponent;
