import React from 'react';
import PropTypes from 'prop-types';

import 'styles/Modal.sass';
import Modal from './Modal';

class ModalButtonComponent extends React.PureComponent {
	constructor(props) {
		super(props);
		this.openModal = this.openModal.bind(this);
		this.state = {
			showModal: false,
		};
	}

	openModal() {
		this.setState({showModal: true});
		document.querySelector('body').classList.add('modal-open');
	}

	render() {
		const { modalName, modalContent } = this.props,
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
				{
					this.state.showModal &&
					<Modal
						modalName={modalName}
						modalContent={modalContent}
						closeModal={
							() => {
								this.setState({showModal: false});
								document.querySelector('body').classList.remove('modal-open');
							}
						}
					/>
				}
			</div>
		);
	}
}

ModalButtonComponent.propTypes = {
	modalName: PropTypes.string.isRequired,
	modalContent: PropTypes.node.isRequired,
};

export default ModalButtonComponent;
