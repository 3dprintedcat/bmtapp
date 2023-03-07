import { Card, Col, Row,Grid, Image, Tag, Space, Modal, Form, message } from "antd";
import Meta from "antd/es/card/Meta";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import ListingForm from '../components/ListingForm';
import { DeleteItemList, GetItemList } from "../services";
import Loading from "../shared/loading";
const { useBreakpoint } = Grid;







const ItemMarket = () =>{
    let screenSize = useBreakpoint();
    const [activeApp,setActiveApp] = useState(<MarketGrid screenSize={screenSize} onClick={onClick}/>)
    
    const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
    function onClick(name){
      
        if (name !== "add" && name !== "home"){
            DeleteItemList(name.slice(1)).then(()=>{

                
                message.info(name + " deleted");
                window.location.reload()
            }).finally(()=>{
              
                
            })
            
        }else if(name==="add"){
            showModal();
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
        <Modal title="Color Settings" open={isModalOpen} onCancel={handleCancel} footer={[]}>
        
       <ListingForm/>
      </Modal>
        {activeApp}

      </Content>
);
}




const MarketGrid = ({
    onClick
}) =>{
    const [loading, setLoading] = useState(true);
    let screenSize = useBreakpoint();
    const [items,setItems] = useState();
var flag = true;
  useEffect(()=>{
    if (flag){
      flag=false;
      GetItemList()
      .then( (res) => {
        let data = res?.data;
        setItems(<Row gutter={[8,8]} Loading={loading} >{data?.map((element) => (<React.Fragment key={element.id}>
            
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Card hoverable style={{}} onClick={()=>{onClick("#"+element.id)}}  cover={<Image
            preview={false}
            id="test"
      alt="example"
      src={element.image}
     style={{
      width:"100%",
      height:"15vh",
      objectFit:"cover"
     }}
     fallback='\logo192.png'
    />}><Meta
    title={element.title}
    description={" for "+ Number((element.price)).toLocaleString(undefined, {maximumFractionDigits:0}) +" aUEC"}
  /></Card>
        </Col></React.Fragment>))}
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
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
title={"Make New Listing"}
/></Card>
    </Col>
        </Row>
          
        );
      
      })
      .finally(()=>{
        setLoading(false);
      }).catch((err) =>{
        message.error("Error" + String(err));

      })
  
    }},[screenSize]);
    return(
        items);
}
export default ItemMarket;