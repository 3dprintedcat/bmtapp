import React, { useState } from "react";
import { Form, Input, Button, message, Space, Card, Row, Col, Grid, QRCode } from "antd"; // importing required components from antd library
import axios from "axios"; // importing axios library for making HTTP requests
import { buildTestTotp, getSecret, testURI } from "./totp"; // importing custom functions related to TOTP authentication
import { GetUser } from "../services"; // importing custom function to get user data from server
import Link from "antd/es/typography/Link"; // importing Link component from antd library
import ParticleEffect from "./ParticleEffect";

const { useBreakpoint } = Grid; // extracting useBreakpoint from Grid component
const layout = { // defining the layout for the form
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

// function to save login details in sessionStorage
export const loginExport = (login, User) => {
  sessionStorage.setItem("login", login);
  sessionStorage.setItem("User", User);
};

// function to retrieve login details from sessionStorage
export const loginImport = () => {
  return sessionStorage.getItem("login");
};

const tailLayout = { // defining the layout for the submit button
  wrapperCol: { offset: 8, span: 8 },
};

// function to handle resetting of OTP or password
const resetOTPOrPassword = () => {
  message.info("Please contact the BMTSC Admin");
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
          loginExport("loggedIn", values.playerTag);
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
            console.log("this is the data",response.data)
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
      return (24)
    } else {
      return (24)
    }
  }
  return (
    <>
    <Card  style={{
      position: "absolute",
      top: "0",
      left: "0",
      width: screenSize.sm ? "600px":"100vw" ,
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.1)",
      borderRadius: "0px",
    }}>
    <div style={{ marginTop: 50 }}>
      <h1 style={{ textAlign: "center" }}>
        {isLoggingIn ? "Login" : "Create User"}
      </h1>
      <Form {...layout} form={form} name="basic" onFinish={onFinish} style={{ justifyContent: "center"}}>
      <Row gutter={[8,8]}>
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
        <Col span={24}>
        <div style={{display:"flex", width:"100%", justifyContent:"center", visibility:!isLoggingIn,  }}>
        
          <div style={{width:"13em", height:"24em", textAlign:"center", marginBottom:"em"}}>
            <QRCode value={testURI()} hidden={isLoggingIn} icon="/logo192.png" bgColor="#ffffff" size="182" style={{borderRadius:"8px 8px 0px 0px"}}/>
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
          <br/><br/><Link onClick={()=> {resetOTPOrPassword()}}>Reset OTP or Password</Link>
        </Form.Item>
      </Form>
    </div>
    </Card>
    </>
  );
};
