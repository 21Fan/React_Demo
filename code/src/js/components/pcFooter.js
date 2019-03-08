import React from 'react';

import { Row, Col } from 'antd';

export default class PCFooter extends React.Component{
    
    constructor() {
        super();
        var today=new Date();
        this.state = {
            year:today.getFullYear()
        };
    }
    
    render(){
        const ShowYear =this.state.year;
        return(
            <footer>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} class="footer">
                        
                        &copy;&nbsp;{ShowYear} ReactNews. All Rights Reserved.
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </footer>
        );
    };
}