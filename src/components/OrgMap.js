import { Layout,Card, Row, Col, Avatar, message, TreeSelect, Image, Space, Grid,} from 'antd';
import React,{ useEffect, useState } from 'react';
import {GetBodies, GetSystems } from '../services';
import Meta from 'antd/es/card/Meta';
const { Content } = Layout;
const { useBreakpoint } = Grid;

function getItem(value, title,children) {
    return {
      value,
      title,
      children,
    };
  }

const OrgMap = () =>{

    let screenSize = useBreakpoint();
  const [loading, setLoading] = useState(true);
  const [system,setSystem] = useState();
  const [items, setItems] = useState();
  const [setCollapsed] = useState(screenSize.xs ? true : false);
  const [value, setValue] = useState();
  const onChange = (newValue) => {
    setValue(newValue);
    
    console.log(newValue)
    GetBodies(newValue).then((res)=>{
      setLoading(true);
      setSystem(res?.data.data);
      console.log(res?.data.data);
    }).finally(()=>{
      setLoading(false);
    }).catch((err)=>{
      console.log("star system issue")
      message.error("Error" + String(err));
    });
  }
  var arr = []
var flag = true;
  useEffect(()=>{
    if (flag){
      flag=false;
      GetSystems()
      .then( (res) => {
        
        let data = res?.data;
        data?.data?.forEach(element => {
          arr.push(getItem(element.name.toUpperCase(),element.name));
        });
      
      })
      .finally(()=>{
        setItems(arr);
        setLoading(false);
      }).catch((err) =>{
        message.error("Error" + String(err));
      })
  
    }},[]);
    return( <Content
        style={{
          overflow:"auto",
          margin: screenSize.xs ? '8px 8px' :'8px 8px',
          padding: screenSize.xs ? 2 : 16,
          height:'100%'
          
        }}
      >
        <Row gutter={[8,8]}>
          <Col span={screenSize.xs ? 24 : 8}>
            <Card title="Star System" 
        loading={loading}>
              
          <Space direction="vertical" size="large">
        <TreeSelect
    showSearch
    size="large"
    style={{
      width: '100%',
    }}
    value={value}
    dropdownStyle={{
      maxHeight: 400,
      overflow: 'auto',
    }}
    placeholder="Please select"
    allowClear
    treeDefaultExpandAll
    onChange={onChange}
    treeData={items}
  />
  <Meta
  description={system?.description}
/>
</Space>
  </Card>
  </Col>
  <Col span={screenSize.xs ? 24 : 12}>
        
    <Image
      alt="example"
      src={system?.thumbnail ? system?.thumbnail?.source : "error"} 
     style={{
      width:"100%",
      borderRadius: "8px"
     }}
     fallback='\logo192.png'
    />
</Col>
<Col span={screenSize.xs ? 24 : 4}>
        <Card
        loading={loading}
  style={{
    height:"min"
  }}
  hoverable
  cover={
    <Image
      alt="example"
      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      
    />
  }

>
  <Meta
    avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
    title="Card title"
    description="This is the description"
  />
</Card></Col>
      </Row>
      </Content>)
};

export default OrgMap;