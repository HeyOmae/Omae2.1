'use strict';

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

require('styles//Modal.sass');

class ModalComponent extends React.Component {
	render() {
		const {modalName, modalContent, modalToggle, toggleModalAction} = this.props;
		let modalID = modalName.replace(/\s/g, '') + '-modal';
		const toggleModal = () => {
			toggleModalAction(modalID);
		};

		function closeModal(e) {
			if(e.target.className.search(/modal-close/) > 0){
				toggleModal();
			}
		}

		return (
			<div className="modal-component">
				<button
					type="button"
					className="btn btn-info"
					onClick={()=> {
						toggleModal();
					}}
				>
					{modalName}
				</button>

				{modalToggle === modalID ?
					<div
						id={modalID}
						className='modal fade in'
						onClick={(e)=> {
							if(e.target.id === modalID){
								toggleModal();
							}
						}}
					>
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<button
										type="button"
										className="close modal-close"
										onClick={ closeModal }
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
										onClick={ closeModal }>
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

ModalComponent.displayName = 'ModalComponent';

// Uncomment properties you need
ModalComponent.propTypes = {
	modalToggle: PropTypes.string.isRequired
};

function mapStateToProps(state) {
	return { modalToggle: state.modalToggle };
}

// ModalComponent.defaultProps = {};

export default connect(mapStateToProps, { toggleModalAction: require('../actions/toggleModal.js')})(ModalComponent);
