import BMTHeader from './bmtHeader';
import {EnvironmentTwoTone ,ShopTwoTone, MedicineBoxTwoTone ,MenuUnfoldOutlined,MenuFoldOutlined,SettingTwoTone } from '@ant-design/icons';
import { theme, Layout, Menu, Grid, Modal, Form, Button, Input, Space} from 'antd';
import React,{ useState } from 'react';
import { setTheme } from '../App';
import OrgMap from '../components/OrgMap';
import OrgAppHub from '../components/OrgAppsHub';
import ItemMarket from '../components/ItemMarket';
import { Route, BrowserRouter as  Router, Routes, useNavigate } from 'react-router-dom';
import { loginExport } from '../components/logicForLogin';
import { testURI } from '../components/totp';

const { Header, Sider } = Layout;
const { useBreakpoint } = Grid;

function getMenu(key,label,icon,children) {
    return {
      key,
      label,
      icon,
      children
    };
}
  const { useToken } = theme;
const MainTradingPage = () =>{
  const navigate = useNavigate();
  let screenSize = useBreakpoint();
  const { token } = useToken();
  const [curPage,setCurPage] = useState(<OrgMap/>); 
  const [collapsed, setCollapsed] = useState(true);
      const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    if (!values?.primaryColor){
      values.primaryColor= token.colorPrimary;
    }
    if (!values?.baseColor){
      values.baseColor= token.colorBgBase;
    }
    if (!values?.textColor){
      values.textColor=token.colorTextBase;
    }
    setTheme([values]);
    window.location.reload();
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onClick = (e) => {
    setCollapsed(true);
    if (e.key==="4"){
      
      showModal();
    } else if (e.key==="1"){
      navigate("/OrgMap");
    } else if (e.key==="2"){
      navigate("/Services");
    }else if (e.key==="3"){
      navigate("/Market");
    }
  };
  const logout =()=>{
    loginExport("");
    window.location.reload()
  }
    return(
    <>
       <Layout style={{height:"100%"}}>
       <Modal title="Color Settings" open={isModalOpen} onCancel={handleCancel} footer={[]}>
        
        <Form name="colorForm" onFinish={onFinish}
    onFinishFailed={onFinishFailed}>
        <Form.Item 
          label="Background Color"
      name="baseColor"><Input type="color" defaultValue={token.colorBgBase}/></Form.Item>
        <Form.Item  label="Primary Color"
      name="primaryColor"><Input type="color" defaultValue={token.colorPrimary}/></Form.Item>
        <Form.Item  label="Text Color"
      name="textColor"><Input type="color" defaultValue={token.colorTextBase}/></Form.Item>
      
      <Space direction="horizontal">
       <Button type="primary" htmlType="submit">
        Submit
      </Button>
      <Button danger onClick={() =>{logout()}}>Log Out</Button>    
 </Space>
        </Form>

      </Modal>
      
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ height:"100%", overflow:"hidden" }}
      collapsedWidth={screenSize.xs ? "50":"80"}>
        <div className='wrapTrigger' >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            style:{height: "7vh", fontSize:"2em", color:token.colorPrimary  , 
            textAlign: "center !important"},
            onClick: () => setCollapsed(!collapsed),
          })}
          </div>
        <Menu
            mode="inline"
            onClick={onClick}
            
            defaultOpenKeys={['sub1']}
            style={{
                height: '93vh',
                borderRight: 0,
                padding: 0,
            }}
            items={[getMenu(1,"Org Map",<EnvironmentTwoTone twoToneColor={token.colorPrimary}/> ),getMenu(2,"Org Services",<MedicineBoxTwoTone twoToneColor={token.colorPrimary} />),getMenu(3,"In-game Market",<ShopTwoTone twoToneColor={token.colorPrimary}  />),getMenu(4,"Settings",<SettingTwoTone twoToneColor={token.colorPrimary} />)]}
          />
          
            
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: token.colorBgContainer,
            height: "7vh"
          }}
        >
            <BMTHeader/>
        </Header>
        <Routes>
        <Route path="/OrgMap" element={<OrgMap/>} />
        <Route path="/Services"  element={<OrgAppHub/>} />
        <Route path="/Market"  element={<ItemMarket/>} />
        </Routes>
      </Layout>
    </Layout>
    </>
    );
};

export default MainTradingPage;