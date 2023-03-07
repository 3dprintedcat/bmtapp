import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { buildTestTotp, getSecret, testURI } from "./totp";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
export const loginExport = (login) =>{
    sessionStorage.setItem("login", login);
};
export const loginImport = () =>{
    return (sessionStorage.getItem("login"));
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};


export const LoginForm = () => {
  const [form] = Form.useForm();
  const [isLoggingIn, setIsLoggingIn] = useState(true);
let token
  const onFinish = (values) => {
    if (isLoggingIn) {
      // Login request
      token = values.totp
      axios
        .post("https://bmtsc.org/api/retrieveUser/", {
          playerTag: values.playerTag,
          password: values.password,
        })
        .then((response) => {
          if (buildTestTotp(token,response.data.totp) === null){
            message.error("OTP Incorrect");
          }else{
          message.success("Login successful");
          loginExport("loggedIn");
          window.location.reload()
          }
        })
        .catch((error) => {
          console.error(error);
          message.error("Login failed");
        });
    } else {
      // Create user request
          if (buildTestTotp(values.totp,getSecret()) === null){message.error("OTP Incorrect")}else{
            
            token = getSecret()
      axios
        .post("https://bmtsc.org/api/createUser/", {
          playerTag: values.playerTag,
          password: values.password,
          totp: token,
        })
        .then((response) => {
          message.success("User created successfully");
          axios
        .post("https://bmtsc.org/api/retrieveUser/", {
          playerTag: values.playerTag,
          password: values.password,
        }).then(()=>{
            loginExport("loggedIn");
          window.location.reload()
        })

        })
        .catch((error) => {
          console.error(error);
          message.error("Error creating user");
        });
      }
    }
  };

  const toggleLogin = () => {
    setIsLoggingIn(!isLoggingIn);
    
    form.resetFields();
  };

  return (
    <div style={{ marginTop: 50 }}>
      <h1 style={{ textAlign: "center" }}>
        {isLoggingIn ? "Login" : "Create User"}
      </h1>
      <Form {...layout} form={form} name="basic" onFinish={onFinish}>
        <Form.Item
          label="Player Tag"
          name="playerTag"
          rules={[{ required: true, message: "Please input your player tag!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="One Time Password"
          name="totp"
          rules={[{ required: true, message: "Please input your OTP!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            {isLoggingIn ? "Login" : "Create User"}
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={toggleLogin}>
            {isLoggingIn ? "Create User" : "Login"}
          </Button>
        </Form.Item>
        <img src={testURI()} hidden={isLoggingIn}/>
      </Form>
    </div>
  );
};
