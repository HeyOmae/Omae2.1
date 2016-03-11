'use strict';

import React from 'react';
import Modal from '../ModalComponent';

require('styles/export/Reddit.sass');

const RedditComponent = () => {
	const exportField = (
		<input
			type="text-area"
			className="form-control"
			defaultValue={`testing`}
			readOnly/>
	)
	return (
		<div className="reddit-component">
			<Modal
				modalName="Export.reddit"
				modalContent={exportField}/>
		</div>
	);
}

export default RedditComponent;
