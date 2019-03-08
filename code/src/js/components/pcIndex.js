import React from 'react';
import PCHeader from './pcHeader';
import PCFooter from './pcFooter';
export default class PCIndex extends React.Component{
	render(){
		return(
        <div>
            <PCHeader></PCHeader>
			<PCFooter></PCFooter>
        </div>
		
		);
	};
}