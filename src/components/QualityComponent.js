'use strict';

import React from 'react';
import Modal from './ModalComponent';
const qualityData = require('json!./data/qualities.json');

require('styles//Quality.sass');

class QualityComponent extends React.Component {
	render() {
		const {actions} = this.props;

		let qualities = {
			Positive: [],
			Negative: []
		};
		qualityData.forEach((quality)=>{
			qualities[quality.category].push(
				<tr key={quality.category + '-' + quality.name}>
					<td><button className="btn btn-success">+</button></td>
					<td>{quality.name}</td>
					<td>{quality.karma}</td>
					<td>{quality.source} p{quality.page}</td>
				</tr>
			);
		});
		return (
			<div className="quality-component row">
				<div className="col-md-12">
					<h2>Qualities</h2>
						<Modal
							modalName="Positive"
							modalContent={
								<div className="table-responsive">
									<table className="table">
										<thead>
											<tr>
												<th>Add</th>
												<th>Name</th>
												<th>Karma</th>
												<th>Ref</th>
											</tr>
										</thead>
										<tbody>
											{qualities.Positive}
										</tbody>
									</table>
								</div>
							}
							/>

						<Modal
							modalName="Negative"
							modalContent={
								<div className="table-responsive">
									<table className="table">
										<thead>
											<tr>
												<th>Add</th>
												<th>Name</th>
												<th>Karma</th>
												<th>Ref</th>
											</tr>
										</thead>
										<tbody>
											{qualities.Negative}
										</tbody>
									</table>
								</div>
							}
						/>
					</div>
			</div>
		);
	}
}



QualityComponent.displayName = 'QualityComponent';

// Uncomment properties you need
// QualityComponent.propTypes = {};
// QualityComponent.defaultProps = {};

export default QualityComponent;
