import './App.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { ConfigProvider,theme, Layout, Menu } from 'antd';
import MainTradingPage from './shared/mainTradingPage';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const { useToken } = theme;
function App() {
  const { token } = useToken();
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary:'#7FB069',
        colorBgContainer:"#454c5a",
        colorBgContainerDisabled:"#393f4d",
        colorBackground:"#1d2027",
      },
    }}>
    <div className="App" style={{height:"100%", backgroundColor:token.colorBackground}}>
    <MainTradingPage/>
    <Layout className="layout" style={{height:"100%", backgroundColor:token.colorBackground}}>
    <Sider
          width={200}
          style={{
            background: token.colorBgContainer,
            height:"100%"
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
      </Layout>
    
    </div>      
      </ConfigProvider>
  );
}
export default App;
