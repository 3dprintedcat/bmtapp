import React, { useState } from "react";
import { Form, Input, Button, message, Space, Card, Row, Col, Grid } from "antd";
import axios from "axios";
import { buildTestTotp, getSecret, testURI } from "./totp";
import { GetUser } from "../services";
const {useBreakpoint} = Grid;
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
  let screenSize = useBreakpoint();
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
      let isPartOfBMTSC = false
          GetUser(values.playerTag)
          .then((response)=>{
            console.log("this is the data",response.data.data.affiliation)
            if (response.data.data.organization.sid === "BMTSC"){
              console.log("yep, part of BMT")
              isPartOfBMTSC = true
            }
            let listOfOrgs = response.data.data.affiliation
            listOfOrgs.forEach(element => {
              console.log("fire")
              console.log(element.sid)
              if (element.sid === "BMTSC"){
                console.log("yep, part of BMT")
                isPartOfBMTSC = true
              }
            });
           

            if (buildTestTotp(values.totp,getSecret()) === null ){message.error("OTP Incorrect")}else{
              console.log(isPartOfBMTSC)
              if (!isPartOfBMTSC){message.error("User Handle doesn't exist in BMTSC, please try again.")}else{
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
  })
    }
  };

  const toggleLogin = () => {
    setIsLoggingIn(!isLoggingIn);
    
    form.resetFields();
  };
  const sizeSwitcher = () =>{
    if (isLoggingIn){
    return(24)
    } else if ( screenSize.xs ){
      return (12)
     } else {
      return (8)
    }
  }
  return (
    <div style={{ marginTop: 50 }}>
      <h1 style={{ textAlign: "center" }}>
        {isLoggingIn ? "Login" : "Create User"}
      </h1>
      <Form {...layout} form={form} name="basic" onFinish={onFinish} style={{ justifyContent: "center"}}>
      <Row gutter={[8,8]}>
        {isLoggingIn || screenSize.xs ? <></> : <Col span={sizeSwitcher()}/>}
      <Col span={sizeSwitcher()}>
        <Form.Item
          label="BMTSC Player Handle"
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
        </Col>
        {!isLoggingIn ? 
        <Col span={screenSize.xs ? 12 : 8}>
        <div style={{display:"flex", width:"100%", justifyContent:"center", visibility:!isLoggingIn,  }}>
        
          <div style={{width:"13em", height:"24em", textAlign:"center", marginBottom:"em"}}>
            <img src={testURI()} style={{borderRadius: "8px 8px 0px 0px"}} width="100%" height={"auto"} hidden={isLoggingIn} />
        <Card style={{borderRadius: "0px 0px 8px 8px",backgroundColor:"black", color: "white", height:"10.5em" }} bodyStyle={{padding:"8px"}}  hidden={isLoggingIn}>Using an Authenticator app such as Google Authenticator, please scan the QR Code and confirm a One Time 6 digit Password.</Card>
        </div>
        </div >
        </Col>
        : <></>
        
}

        </Row>
        
        
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            {isLoggingIn ? "Login" : "Create User"}
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={toggleLogin}>
            {isLoggingIn ? "Create User" : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
