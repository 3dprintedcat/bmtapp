import BMTHeader from './bmtHeader';
import {EnvironmentTwoTone ,ShopTwoTone, MedicineBoxTwoTone ,MenuUnfoldOutlined,MenuFoldOutlined,SettingTwoTone,ScheduleTwoTone } from '@ant-design/icons';
import { theme, Layout, Menu, Grid, Modal, Form, Button, Input, Space, Watermark} from 'antd';
import React,{ useState } from 'react';
import { setTheme } from '../App';
import OrgMap from '../components/OrgMap';
import OrgAppHub from '../components/OrgAppsHub';
import ItemMarket from '../components/ItemMarket';
import { Route, BrowserRouter as  Router, Routes, useNavigate } from 'react-router-dom';
import { loginExport } from '../components/logicForLogin';
import { testURI } from '../components/totp';
import CreateEventForm from '../components/CreateEvent';
import EventGrid from '../components/EventGrid';
import { ThemeGrid } from '../components/themeSets';


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
    }else if (e.key==="5"){
      navigate("/Events");
    }
  };
  const logout =()=>{
    loginExport("");
    window.location.reload()
  }
    return(
    <>

       <Layout style={{height:"100%"}}>
       <Modal title="Color Settings" open={isModalOpen} width={'70%'} onCancel={handleCancel} footer={[]}>
        
      <Space  direction="vertical">
      <ThemeGrid/>
        <Button danger onClick={() =>{logout()}}>Log Out</Button>  </Space>
      </Modal>
      
      <Sider   trigger={null} collapsible collapsed={collapsed} style={{ height:"100%", overflow:"hidden", zIndex:"2" }}
      collapsedWidth={screenSize.xs ? "50":"80"}>
        <div className='wrapTrigger' >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            style:{height: "7vh", fontSize:"2em", color:token.colorPrimary  , zIndex:"2",
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
                zIndex:"2"
            }}
            items={[getMenu(1,"Org Map",<EnvironmentTwoTone twoToneColor={token.colorPrimary}/> ),getMenu(2,"Org Services",<MedicineBoxTwoTone twoToneColor={token.colorPrimary} />),getMenu(3,"In-game Market",<ShopTwoTone twoToneColor={token.colorPrimary}  />),getMenu(5,"Org Events",<ScheduleTwoTone twoToneColor={token.colorPrimary} />),getMenu(4,"Settings",<SettingTwoTone twoToneColor={token.colorPrimary} />)]}
          />
          
            
      </Sider>
      <Layout className="site-layout" style={{backgroundColor:"transparent", zIndex:"2"}} >
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
        <Route path="/Events"  element={<EventGrid/>} />
        </Routes>
      </Layout>
    </Layout>
    </>
    );
};

export default MainTradingPage;