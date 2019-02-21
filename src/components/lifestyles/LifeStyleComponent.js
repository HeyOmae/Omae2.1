import React from 'react';
import LifeStyleData from '../../data/lifestyle.json';
import FilterTable from '../FilterableTable';

class LifeStyleComponent extends React.PureComponent {
	componentWillMount() {
		const [discard, ...lifestyles] = LifeStyleData.lifestyles.lifestyle;
		this.lifestyles = lifestyles;
	}

	render() {
		return (
			<div className="life-style-component">
				<h3>Life Styles</h3>
				<table>
					<thead>
						<th>Select</th>
						<th>Name</th>
						<th>¥</th>
						<th>Ref</th>
					</thead>
					<tbody>
						{
							this.lifestyles.map((lifestyle) => {
								return (<tr className="lifestyle--item">{lifestyle.name}</tr>);
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}

export default LifeStyleComponent;
