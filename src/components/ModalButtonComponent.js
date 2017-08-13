import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'styles/Modal.sass';
import actionToggleModal from '../actions/toggleModal';

class ModalButtonComponent extends React.Component {
	componentWillMount() {
		const {modalName, modalID} = this.props;
		this.modalID = modalID || `${modalName.replace(/\s/g, '')}-modal`;
	}

	shouldComponentUpdate(nextProps) {
		return (nextProps.modalToggle === this.modalID) || (nextProps.modalToggle === '' && this.props.modalToggle === this.modalID);
	}

	render() {
		const {modalName, modalContent, modalToggle, toggleModalAction} = this.props,
			{modalID} = this,
			toggleModal = () => {
				toggleModalAction(modalID);
			};

		function closeModal(e) {
			if (e.target.className.search(/modal-close/) > 0) {
				toggleModal();
			}
		}

		return (
			<div className="modal-component">
				<button
					type="button"
					className="btn btn-info modal-open-btn"
					onClick={() => {
						toggleModal();
					}}
				>
					{modalName}
				</button>

				{modalToggle === modalID ?
					<div
						id={modalID}
						className="modal"
						onMouseUp={(e) => {
							if (e.target.id === modalID) {
								toggleModal();
							}
						}}
					>
						<div className="modal-dialog modal-lg">
							<div className="modal-content">
								<div className="modal-header">
									<button
										type="button"
										className="close modal-close"
										onClick={closeModal}
									>
										&times;
									</button>
									<h4 className="modal-title">{modalName}</h4>
								</div>
								<div className="modal-body">
									{modalContent}
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
					:
					null
				}
			</div>
		);
	}
}

ModalButtonComponent.displayName = 'ModalButtonComponent';

// Uncomment properties you need
ModalButtonComponent.propTypes = {
	modalName: PropTypes.string.isRequired,
	modalContent: PropTypes.element.isRequired,
	modalToggle: PropTypes.string.isRequired,
	toggleModalAction: PropTypes.func.isRequired,
	modalID: PropTypes.string
};
// TODO: think about refactoring, unexpected behavior when set to empty string or null
ModalButtonComponent.defaultProps = {
	modalID: undefined
};

function mapStateToProps(state) {
	return { modalToggle: state.modalToggle };
}


export default connect(mapStateToProps, { toggleModalAction: actionToggleModal })(ModalButtonComponent);
