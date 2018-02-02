import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import {loginUser} from '../../userApi.js';
import dva, { connect } from 'dva';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { email, password } = values;
        loginUser(email, password).then(user => {                
          if(user){             
            const firstname = user.user.split(" ")[0];
            message.success("Welcome back, " + firstname);
            const base64image = String.fromCharCode.apply(null, new Uint16Array(user.profileImage.data));
            this.props.dispatch({type:'user/logInUser'});   // antd dva operation to change isLoggedIn state to true   
            this.props.dispatch({type:'user/updateProfileImage', payload:base64image})  
            this.props.history.push('/inspiration');      
          } else {
            message.error("Incorrect email or password!");
            
          }

                
        });
        
        
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Form onSubmit={this.handleSubmit} className="login-form">

        <FormItem>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your email!',
            }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Login
          </Button>
          Or <a href="./Join">Join Now!</a>
        </FormItem>
      </Form>
	</div>
    );
  }
}

//export const WrappedLoginForm = Form.create()(LoginForm);
export const WrappedLoginForm = Form.create()(connect()(LoginForm));
