import BMTHeader from './bmtHeader';
import {AimOutlined,MenuUnfoldOutlined,MenuFoldOutlined, SettingOutlined,EditOutlined,EllipsisOutlined,ArrowDownOutlined,ArrowUpOutlined } from '@ant-design/icons';
import { theme, Layout, Menu, Row, Col, Avatar, Card, Statistic} from 'antd';
import React,{ useState } from 'react';
import Meta from 'antd/es/card/Meta';
import Search from 'antd/es/transfer/search';
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
            borderRadius: "8px",
            minHeight: 280,
            background: token.colorBgContainer,
          }}
        >
           <Row gutter={[20,20]}>
            <Col span={24} > <Card title="test"><Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
    />
    </Card></Col>
      <Col xs={24} sm={24} md={6} lg={6} xl={6}><Card
    bodystyle={{
    }}
    cover={
      <img
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
  <Col span={18}>
  <Card
    title="Card title"
    bordered={false}
    style={{
      
    }}
  >
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
  </Col>
  <Col span={12}>
      <Card bordered={false} title="Deaths">
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={12}>
      <Card bordered={false} title="Profits">
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    </Row>
        </Content>
      </Layout>
    </Layout>
    
    </>
    );
};
export default MainTradingPage;