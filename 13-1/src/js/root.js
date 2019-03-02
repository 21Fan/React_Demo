import React from 'react';
import ReactDom from 'react-dom';
import { Button } from 'antd';
import "antd/dist/antd.css";
import PCIndex from './components/pcIndex';
import MobileIndex from './components/mobileIndex';
import MediaQuery from 'react-responsive';
//import {Router,Route,hashHistory} from 'react-router';


export default class Root extends React.Component{
	render(){
		return(
		//程序的入口
		<div>
			<MediaQuery query='(min-device-width:1224px)'>
				<PCIndex/>
			</MediaQuery>
			<MediaQuery query='(max-device-width:1224px)'>
				<MobileIndex/>
			</MediaQuery>
			
		</div>
		);
	};
}
ReactDom.render(<Root/>,document.getElementById('mainContainer'));
//webpack-dev-server --contentbase src --inline --hot
