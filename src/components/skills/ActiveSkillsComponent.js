'use strict';

import React from 'react';
let skillsData = require('json!../data/skills.json');

require('styles/skills/ActiveSkills.sass');

class ActiveSkillsComponent extends React.Component {
	render() {
		return (
			<div className="activeskills-component">
				<h3>Active Skills</h3>

				<div className="row">
					<div className="col-xs-12">
						<div className="table-responsive">
							<table className='table'>
								<thead>
									<tr>
										<th>Raise</th>
										<th>Rating</th>
										<th>Lower</th>
										<th>Skill Name</th>
										<th>Spec</th>
										<th>Mods</th>
										<th>Dice Pool</th>
										<th>Ref</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ActiveSkillsComponent.displayName = 'SkillsActiveSkillsComponent';

// Uncomment properties you need
// ActiveSkillsComponent.propTypes = {};
// ActiveSkillsComponent.defaultProps = {};

export default ActiveSkillsComponent;
