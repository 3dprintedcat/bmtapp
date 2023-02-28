import './App.css';
import { ConfigProvider,theme } from 'antd';
import MainTradingPage from './shared/mainTradingPage';
import React from 'react';


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
    
    
    </div>      
      </ConfigProvider>
  );
}
export default App;
