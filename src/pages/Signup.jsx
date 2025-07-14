import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';


const onFinish = async (values) => {
    try{
        const response = await fetch('http://localhost:5000/api/signup',{
            method:'POST',
        headers:{ 'Content-Type':'application/json'},
        body:json.stringify(values),
        });
        const data = await response.json();
        if(response.ok){
            alert("signup sucesssfull")
        } else{
            alert(data.message || 'signu falied');
        }

    } catch(e){
        alert("something went wrong")
    }
}

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const Signup = () => (
  <Form
    name="signupForm"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="firstName"
      name="firstName"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Lastname"
      name="lastName"
      rules={[{ required: true, message: 'Please input your lastname!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
export default Signup;