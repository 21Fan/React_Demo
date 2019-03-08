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
            userid:0,
            confirmDirty: false,
            autoCompleteResult: [],
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
        //"http://localhost:8080/index?action=register&username=fan&pass"
        fetch("http://surface-zhangkh:8080/index?action=" + this.state.action
		+"&username="+formData.username+"&password="+formData.password
		+"&r_username=" + formData.r_username + "&r_password="
		+ formData.r_password , myFetchOptions)
        .then(response => 
            {
                //console.log(response);
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

    callbacks(key){
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
    // ConfirmPassword(name,event){

    //     var newState={}
    //     newState[name]=event.target.value;
    //     this.setState(newState);
    //     var formData = this.props.form.getFieldsValue();

    //     co=document.getElementById('confirmpassword');
    //     if(this.state.firstPasswd!=this.state.lastPasswd)
    //     co.validateStatus="error";
    // };
    
    handleConfirmBlur (e){
        const value = e.target.value;
        this.setState({confirmDirty:this.state.confirmDirty||!!value});
    };
    
    compareToFirstPassword  (rule, value, callback)  {
          
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
    };
    
    validateToNextPassword  (rule, value, callback)  {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    
    
    render() {
        let{getFieldProps}=this.props.form;
        let {getFieldDecorator} = this.props.form;
        
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

<Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} /*onOk={()=>this.setModalVisible(false)}*/ okText="关闭">
<Tabs type="card" onChange={this.callbacks.bind(this)}>
 
    <TabPane tab="登录" key="1">
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                    <Input placeholder="请输入您的账号"{...getFieldProps('username')} id></Input>
                    
                </FormItem>
                <FormItem label="密码"type="password">
                    <Input placeholder="请输入您的密码"{...getFieldProps('password')}></Input>
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
            </Form>
    </TabPane>
    <TabPane tab="注册" key="2">
        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <Form.Item label="账户">
                <Input placeholder="请输入您的账号"{...getFieldProps('r_username')}></Input>

            </Form.Item>





            
            <Form.Item
          label="Password"
        >
          {getFieldDecorator('r_password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
                validator: this.validateToNextPassword.bind(this),
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        <Form.Item
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
                validator: this.validateToNextPassword.bind(this),
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur.bind(this)} />
          )}
        </Form.Item>

        
            
            
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