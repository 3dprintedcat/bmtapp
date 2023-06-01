import React from 'react';
import { Layout, Button, Progress, List, Typography } from 'antd';
import EventGrid from './components/EventGridOverlay';

const { Sider } = Layout;
const { Title } = Typography;

function Overlay() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', height: '100vh', overflow: 'hidden' }}>
      <Sider theme="dark" width={300} style={{ backgroundColor: 'rgba(0, 0, 0, 0)', color: 'white', display: 'flex', flexDirection: 'column',overflow: "auto"}}>
        <Title level={3} style={{ color: 'white', padding: '20px 20px' }}>Navigation</Title>
        <div className="xs-screen">
          <EventGrid/>
        </div>
      </Sider>
      {/* Other code */}
    </div>
  );
}

export default Overlay;
