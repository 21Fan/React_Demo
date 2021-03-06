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
class MobileHeader extends React.Component{
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible:false,
            action:'login',
            hasLogined:false,
            userNickName:'',
            userid:0
        };
    }

    setModalVisible(value){
        this.setState({modalVisible:value});
    };
    handleClick(e){
        if(e.key="register"){
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
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+"&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
        + formData.r_confirmPassword, myFetchOptions)
        .then(response => 
            {
                return response.json();
            })       
		.then(
            json => {
            this.setState({userNickName: json.NickUserName, userid: json.UserId});
            localStorage.userid=json.UserId;
            localStorage.userNickName=json.NickUserName;
            console.log(json);
        //     if(json)message.error("请求失败！！！")
        //  console.log(response);
        // if(!json) message.success("请求成功！！！");
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
    
    login(){
        this.setModalVisible(true);
    };//

	render(){
        let{getFieldProps}=this.props.form;//取全局参数
        const userShow=this.state.hasLogined
        ?
        <Link>
            <Icon type="inbox"></Icon>
        </Link>
        :
        <Icon type="setting" onClick={this.login.bind(this)}></Icon>
        //
		return(
        
            <div id="mobileheader">
                <header>
                    <img src="./src/images/logo.png" alt="logo"/>
                    <span>ReactNews</span>
                    {userShow}
                </header>

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
            </div>
		);
	};
}

export default MobileHeader = Form.create({})(MobileHeader);