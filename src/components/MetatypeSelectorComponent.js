import React from 'react';
import metatypeData from './data/metatype.json';
import priorityData from './data/priority.json';
import 'styles/MetatypeSelector.sass';

class MetatypeSelectorComponent extends React.Component {
	render() {
		const {priorityRating, metatype, action, karma} = this.props;
		let buttonElements = [],
			racialDetails = [],
			currentMetaData = metatypeData[metatype.typeName];

		for(let typeName in metatypeData) {
			let selectedMetatype = metatype.typeName === typeName;
			const priorityMetaData = priorityData[priorityRating].metatype;
			buttonElements.push(
				<MetatypeButton
					typeName={typeName}
					anOption={typeName in priorityMetaData}
					checked={selectedMetatype}
					key={typeName}
					selectMetatypeAction = {action}
					priority = {priorityRating}
					karma={karma}
					karmaNewCost = {(priorityMetaData[typeName] && priorityMetaData[typeName].karma) || 0}
					karmaOldCost = {priorityData[metatype.priority].metatype[metatype.typeName].karma || 0}
				/>
			);

			if(selectedMetatype) {
				let racials = metatypeData[typeName].racial;
				for(let trait in racials) {
					racialDetails.push(
						<p key={typeName + trait}>
							<strong>{trait}: </strong>
							{racials[trait]}
						</p>
					);
				}
			}
		}
		return (
			<div className="metatypeselector-component">
				<h2>Metatype</h2>
				<div className="btn-group">
					{buttonElements}
				</div>
				<div className='row'>
					<div className='col-xs-6'>
						<h3>Racial Traits</h3>
						{racialDetails}
					</div>
					<div className='col-xs-6'>
						<h3>Reference</h3>
						<strong>{currentMetaData.reference.book}</strong> p{currentMetaData.reference.page}
					</div>
				</div>
			</div>
		);
	}
}

const MetatypeButton = ({typeName, anOption, checked, selectMetatypeAction, karma, karmaNewCost, karmaOldCost, priority}) => {
	return(
		<label className={`btn
			${(!anOption && checked ? 'btn-danger' : 'btn-primary')}
			${(anOption ? '' : 'disabled')}
			${(checked ? 'active' : '')}`
		}>
			<input
				type="radio"
				name="metatype-selector"
				id={'metatype-' + typeName}
				autoComplete="off"
				checked={checked}
				onChange={()=> {
					if(anOption){
						selectMetatypeAction({typeName, priority});
						karma({karmaPoints: karmaOldCost});
						karma({karmaPoints: -karmaNewCost});
					}
				}}
			/>
				{typeName}
		</label>
	);
};

MetatypeSelectorComponent.displayName = 'MetatypeSelectorComponent';

// Uncomment properties you need
// MetatypeSelectorComponent.propTypes = {};
// MetatypeSelectorComponent.defaultProps = {};

export default MetatypeSelectorComponent;
