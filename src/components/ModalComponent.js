'use strict';

import React from 'react';

require('styles//Modal.sass');

class ModalComponent extends React.Component {
	render() {
		const {modalName, modalContent} = this.props;
		let modalID = modalName.replace(/\s/g, '')
		function toggleModal() {
			document.getElementById(modalID).classList.toggle('hide');
		}

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

				<div
					id={modalID}
					className='modal fade in hide'
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
			</div>
		);
	}
}

ModalComponent.displayName = 'ModalComponent';

// Uncomment properties you need
// ModalComponent.propTypes = {};
// ModalComponent.defaultProps = {};

export default ModalComponent;
