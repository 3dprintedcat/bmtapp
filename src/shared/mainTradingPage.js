import BMTHeader from './bmtHeader';
import {AimOutlined,MenuUnfoldOutlined,MenuFoldOutlined } from '@ant-design/icons';
import { theme, Layout, Menu} from 'antd';
import React,{ useState } from 'react';
const { Header, Sider, Content } = Layout;

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const { useToken } = theme;
const MainTradingPage = () =>{
    const { token } = useToken();
    const [collapsed, setCollapsed] = useState(false);
  
const items2 = [getItem('Navigation', '1', <AimOutlined />,[
        getItem('Planet System', 'sub1', null, [
            getItem('Hurston System', '11', null,[
                getItem('Hurston', '12'),
                getItem('Arial', '13' ,null,[
                    getItem('HDMS-Bezdek', '14'),
                ]),]), ]),
      ,
        getItem('Stations', 'sub2', null, [getItem('Option 21', '21'), getItem('Option 22', '22'), getItem('Option 23', '23'), getItem('Option 24', '24'), getItem('Option 22', '22')]),
      ]),
    
  ];
    return(
    <>
       <Layout style={{height:"100vh"}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            style:{height: "7vh", fontSize:"2em", color:token.colorPrimary},
            onClick: () => setCollapsed(!collapsed),
          })}
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
                height: '93vh',
                borderRight: 0,
            }}
            items={items2}
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
        <Content
          style={{
            margin: '16px 16px',
            padding: 24,
            minHeight: 280,
            background: token.colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
    
    </>
    );
};
export default MainTradingPage;