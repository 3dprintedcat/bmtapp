import { hover } from "@testing-library/user-event/dist/hover";
import { Card, Col, Row,Grid, Image, Tag, Space } from "antd";
import Meta from "antd/es/card/Meta";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import MainTradingPage from "../shared/mainTradingPage";
import { CreateService } from "./CreateService";

const { useBreakpoint } = Grid;



 



const OrgAppHub = () =>{
    let screenSize = useBreakpoint();
    const [activeApp,setActiveApp] = useState(<ActiveApp screenSize={screenSize} onClick={onClick}/>)
    
    
    function onClick(name){
        console.log("this is the test of the card", name);
        if (name !== "add" && name !== "home"){
        setActiveApp(<><Tag color={"green"} style={{marginBottom:"1em", cursor: "pointer"}}onClick={() => {onClick("home")}}>Home</Tag><iframe src={name} width="100%" height="100%"></iframe></>);
        }else{
            setActiveApp(<ActiveApp screenSize={screenSize} onClick={onClick}/>);
        }if (name === "add"){
            setActiveApp(<><Tag color={"green"} style={{marginBottom:"1em", cursor: "pointer"}}onClick={() => {onClick("home")}}>Home</Tag><CreateService/></>);
        }
        
    }
    return(
        
    <Content
    style={{
        overflow:"auto",
        padding: screenSize.xs ? 2 : 16,
        height:'100%'
        
    }}
    >

        {activeApp}

      </Content>
);
}

const ActiveApp = ({
    onClick
}) =>{
    let screenSize = useBreakpoint();

    return(       <Row gutter={[8,8]}>
        <Col span={screenSize.xs ? 24 : 6}>
            <Card hoverable onClick={()=>{onClick("https://uexcorp.space/")}} cover={<Image
            preview={false}
      alt="example"
      src='\UEXCorp.png'
     style={{
      width:"100%",
     }}
     fallback='\logo192.png'
    />}><Meta
  title={"UEXCorp"}
  description={"Mining, Refining and Trade Calculator, Prices, Ships List"}
/></Card>
        </Col>
        <Col span={screenSize.xs ? 24 : 6}>
            <Card hoverable  onClick={()=>{onClick("https://sc-market.space/#/")}} cover={<Image
            preview={false}
      alt="example"
      src='\SCMarket.png'
     style={{
      width:"100%",
     }}
     fallback='\logo192.png'
    />}><Meta
  title={"SC-Market"}
  description={"Buy, sell, and trade your in game items or contract orgs to perform services you need."}
/></Card>
        </Col>
        <Col span={screenSize.xs ? 24 : 6}>
            <Card hoverable onClick={()=>{onClick("https://finder.cstone.space/")}} cover={<Image
            preview={false}
      alt="example"
      src='\CStoneFinder.png'
     style={{
      width:"100%",
     }}
     fallback='\logo192.png'
    />}><Meta
  title={"CStone Item Finder"}
  description={"A tool for Star Citizen that will help you find any in game item."}
/></Card>
        </Col>
        <Col span={screenSize.xs ? 24 : 6}>
            <Card hoverable onClick={()=>{onClick("https://www.medrunner.space/")}} cover={<Image
            preview={false}
      alt="example"
      src='\medrunner.png'
     style={{
      width:"100%",
     }}
     fallback='\logo192.png'
    />}><Meta
  title={"Medrunner"}
  description={"Medrunner Services provides in-game medical assistance and Search & Rescue services."}
/></Card>
        </Col>
        <Col span={screenSize.xs ? 24 : 6}>
            <Card hoverable style={{}} onClick={()=>{onClick("add")}}  cover={<Image
            preview={false}
            id="test"
      alt="example"
      src='\placeHolder.png'
     style={{
      width:"100%",
     }}
     fallback='\logo192.png'
    />}><Meta
    title={"Add New Org Service"}
  /></Card>
        </Col>
       </Row>)
}
export default OrgAppHub;