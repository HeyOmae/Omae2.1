'use strict';

import React from 'react';
let metatypeData = require('json!./data/metatype.json'),
	priorityData = require('json!./data/priority.json');

require('styles//Attributes.sass');

class AttributesComponent extends React.Component {
	render() {
		const {priorityRating, metatype} = this.props;
		return (
			<div className="attributes-component ">
				<div className="row">
					<div className="col-xs-12 col-md-9 table-responsive">
						<h2>Attributes</h2>
						<table className="table">
							<thead>
								<tr>
									<th>Bod</th>
									<th>Agi</th>
									<th>Rea</th>
									<th>Str</th>
									<th>Wil</th>
									<th>Log</th>
									<th>Int</th>
									<th>Cha</th>
									<th>Points</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<button className="btn btn-success">+</button>
									</td>
									<td>
										<button className="btn btn-success">+</button>
									</td>
									<td>
										<button className="btn btn-success">+</button>
									</td>
									<td>
										<button className="btn btn-success">+</button>
									</td>
									<td>
										<button className="btn btn-success">+</button>
									</td>
									<td>
										<button className="btn btn-success">+</button>
									</td>
									<td>
										<button className="btn btn-success">+</button>
									</td>
									<td>
										<button className="btn btn-success">+</button>
									</td>
									<td></td>
								</tr>
								<tr>
									<td>
										{metatypeData[metatype].min.bod}/{metatypeData[metatype].max.bod}
									</td>
									<td>
										{metatypeData[metatype].min.agi}/{metatypeData[metatype].max.agi}
									</td>
									<td>
										{metatypeData[metatype].min.rea}/{metatypeData[metatype].max.rea}
									</td>
									<td>
										{metatypeData[metatype].min.str}/{metatypeData[metatype].max.str}
									</td>
									<td>
										{metatypeData[metatype].min.wil}/{metatypeData[metatype].max.wil}
									</td>
									<td>
										{metatypeData[metatype].min.log}/{metatypeData[metatype].max.log}
									</td>
									<td>
										{metatypeData[metatype].min.int}/{metatypeData[metatype].max.int}
									</td>
									<td>
										{metatypeData[metatype].min.cha}/{metatypeData[metatype].max.cha}
									</td>
									<td>
										{priorityData[priorityRating].attributes}
									</td>
								</tr>
								<tr>
									<td>
										<button className="btn btn-success">-</button>
									</td>
									<td>
										<button className="btn btn-success">-</button>
									</td>
									<td>
										<button className="btn btn-success">-</button>
									</td>
									<td>
										<button className="btn btn-success">-</button>
									</td>
									<td>
										<button className="btn btn-success">-</button>
									</td>
									<td>
										<button className="btn btn-success">-</button>
									</td>
									<td>
										<button className="btn btn-success">-</button>
									</td>
									<td>
										<button className="btn btn-success">-</button>
									</td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

AttributesComponent.displayName = 'AttributesComponent';

// Uncomment properties you need
// AttributesComponent.propTypes = {};
// AttributesComponent.defaultProps = {};

export default AttributesComponent;
