import React from 'react';

import { Row, Col } from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    Checkbox,
    Modal
} from 'antd';
const FormItem=Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane=Tabs.TabPane;
class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible:false,
            action:'login',
            hasLogined:false,
            username:'fan',
            userid:0
        };
    }
    componentWillMount(){
		if (localStorage.userid!='') {
			this.setState({hasLogined:true});
			this.setState({username:localStorage.username,userid:localStorage.userid});
		}
	};
    setModalVisible(value){
        this.setState({modalVisible:value});
    };
    handleClick(e){
        if(e.key=="register"){
            this.setState({current:"register"});
            this.setModalVisible(true);
        }
        else{
            {this.setState({current:e.key});}
        }   
    };
   
    handleSubmit(e){
        //页面开始向API进行提交数据
        e.preventDefault();
        var myFetchOptions={
            method:'GET'
        };
        var formData = this.props.form.getFieldsValue();
        // console.log(formData);
        var status;
        fetch("http://localhost:8080/index?action=" + this.state.action
		+"&username="+formData.username+"&password="+formData.password
		+"&r_username=" + formData.r_username + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
        + formData.r_confirmPassword, myFetchOptions)
        .then(response => 
            {
                return response.json();
            })       
		.then(
            json => {
            this.setState({userid: json.UserId});
            localStorage.username=json.UserName;
            localStorage.userid=json.UserId;
            //console.log(json);
            if(UserId==0)message.error("密码或用户名错误！")//如果id为0就错误
        //  console.log(response);
            else message.success("请求成功！");
        });//
        
        if(this.state.action=="login"){
            this.setState({hasLogined:true});
        }
        message.success("请求成功！！！");
        
        this.setModalVisible(false);
    };

    callback(key){
        if(key==1){
        this.setState({action:'login'});
        }
        else if(key==2){
            this.setState({action:'register'});
        }
    };
    logout(){
        localStorage.username='';
        
        this.setState({hasLogined:false});
    };
    render() {
        let{getFieldProps}=this.props.form;

        const userShow =this.state.hasLogined
        ?
        <Menu.Item key="logout" class="register">
        <Button type = "primary" htmlType="button">{this.state.username}</Button>
        &nbsp;&nbsp;
        <Link target="_blank">
            <Button type="primary" htmlType="button">个人中心</Button>
        </Link>
        &nbsp;&nbsp;
        <Button type="primary" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>

        </Menu.Item>
        :
        <Menu.Item key="register" class="register">
            <Icon type="appstore"/>注册/登录
        </Menu.Item>;
        return (
            <header>

                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" class="logo">
                            <img src="./src/images/logo.png" alt="logo" />
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
                            <Menu.Item key="top">
                                <Icon type="appstore" />头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore" />社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore" />国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore" />国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore" />娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="appstore" />体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="appstore" />科技
                            </Menu.Item>
                            <Menu.Item key="sheshang">
                                <Icon type="appstore" />时尚
                            </Menu.Item>
                            {userShow}
                        </Menu>

<Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关闭">
<Tabs type="card" onChange={this.callback.bind(this)}>
 
    <TabPane tab="登录" key="1">
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                    <Input placeholder="请输入您的账号"{...getFieldProps('username')}></Input>
                </FormItem>
                <FormItem label="密码"type="password">
                    <Input placeholder="请输入您的密码"{...getFieldProps('password')}></Input>
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
            </Form>
    </TabPane>
    <TabPane tab="注册" key="2">
        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <FormItem label="账户">
                <Input placeholder="请输入您的账号"{...getFieldProps('r_username')}></Input>
            </FormItem>
            <FormItem label="密码"type="password">
                <Input placeholder="请输入您的密码"{...getFieldProps('r_password')}></Input>
            </FormItem>
            <FormItem label="确认密码"type="password">
                <Input placeholder="请再次输入您的密码"{...getFieldProps('r_confirmPassword')}></Input>
            </FormItem>
            <Button type="primary" htmlType="submit">注册</Button>
        </Form>
    </TabPane>

</Tabs>

</Modal>
                    </Col>
                    <Col span={2}></Col>
                </Row>


            </header>
        );
    };
}
export default PCHeader = Form.create({})(PCHeader);//二次封装