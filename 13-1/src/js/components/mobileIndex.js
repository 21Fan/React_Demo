import React from 'react';
import MobileHeader from './mobileHeader';

export default class MobileIndex extends React.Component{
	render(){
		return(
        <div>
            <MobileHeader></MobileHeader>
			<Tabs>
				<TabPane tab="头条" key="1"></TabPane>
				<TabPane tab="头条" key="2"></TabPane>
				<TabPane tab="头条" key="3"></TabPane>
				<TabPane tab="头条" key="4"></TabPane>
				<TabPane tab="头条" key="5"></TabPane>
			</Tabs>
        </div>
		
		);
	};
}