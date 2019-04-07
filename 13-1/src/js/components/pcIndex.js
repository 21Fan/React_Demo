import React from 'react';
import PCHeader from './pcHeader';
import PCFooter from './pcFooter';
import PCNewsContainer from './pc_newscontainer';
export default class PCIndex extends React.Component{
	render(){
		return(
        <div>
            <PCHeader></PCHeader>
			<PCNewsContainer></PCNewsContainer>
			<PCFooter></PCFooter>
        </div>
		
		);
	};
}