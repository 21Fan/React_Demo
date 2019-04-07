import React from 'react';
import { Row, Col ,Tabs,Carousel} from 'antd';
// import { settings } from 'cluster';
const TabPane=Tabs.TabPane;
import PCNewsBlock from './pc_news_block';
import PCNewsImage from './pc_news_image';
export default class PCNewsContainer extends React.Component{
    render(){

        const settings={
            dots:true,
            infinite:true,
            speed:500,
            autoplay:true,
            slidesToShow:1
        };
        return(
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} class ="container">
                        <div class="leftContainer">
                            <div class="carousel">
                                <Carousel {...settings}>
                                    <div><img src="./src/images/carousel_1.jpg"/></div>
                                    <div><img src="./src/images/carousel_2.jpg"/></div>
                                    <div><img src="./src/images/carousel_3.jpg"/></div>
                                    <div><img src="./src/images/carousel_4.jpg"/></div>
                                </Carousel>
                            </div>
                            <div>
							<PCNewsImage count={6} type="guoji" width="400px" cartTitle="国际新闻" imageWidth="112px"/>
						    </div>
                        </div>
                        
                        <Tabs class="tabs_news">
                            <TabPane tab="头条" key="1">
                                <PCNewsBlock count={22} type="top" width="100%" bordered="false">
                                </PCNewsBlock>
                            </TabPane>
                            <TabPane tab="国际" key="2">
                                <PCNewsBlock count={22} type="guoji" width="100%" bordered="false">
                                </PCNewsBlock>
                            </TabPane>
                            <TabPane tab="娱乐" key="3">
                                <PCNewsBlock count={22} type="yule" width="100%" bordered="false">
                                </PCNewsBlock>
                            </TabPane>
                        </Tabs>
                        <div>
							<PCNewsImage count={8} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="132px"/>
							<PCNewsImage count={16} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="132px"/>
						</div>
                        
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    }

}