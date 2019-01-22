import React from 'react';
import LifeStyleData from '../../data/lifestyle.json';

class LifeStyleComponent extends React.PureComponent {
	componentWillMount() {
		const [discard, ...lifestyles] = LifeStyleData.lifestyles.lifestyle;
		this.lifestyles = lifestyles;
	}

	render() {
		return (
			<div className="life-style-component">
				<h3>Life Styles</h3>
				{
					this.lifestyles.map(lifestyle => {
						return (<div className="lifestyle--item"></div>);
					})
				}
			</div>
		);
	}
}

export default LifeStyleComponent;
