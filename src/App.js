import './App.css';
import { Card, ConfigProvider,Switch,theme } from 'antd';
import MainTradingPage from './shared/mainTradingPage';
import React, { useEffect, useState } from 'react';
import { LoginForm, loginImport } from './components/logicForLogin';

const { useToken } = theme;

// define a function to set the theme in local storage
export const setTheme = (custTheme) => {
  console.log(custTheme);
  localStorage.setItem('themeP', custTheme[0].primaryColor);
  localStorage.setItem('themeB', custTheme[0].baseColor);
  localStorage.setItem('themeT', custTheme[0].textColor);
};

// define a function to get the theme from local storage
export const getTheme = () => {
   
  if (localStorage.getItem('themeP') === undefined){
    setTheme({primaryColor:'#7FB069',baseColor:'#282c34',textColor:'#cccccc'});
  }
  return({primaryColor:localStorage.getItem('themeP'),baseColor:localStorage.getItem('themeB'),textColor:localStorage.getItem('themeT')});
};

 const loginCheck = () =>{
  console.log(loginImport() === 'loggedIn')
  return (loginImport() === "loggedIn");
 }


function App() {
  const [custTheme, setcustTheme] = useState(getTheme() || {primaryColor:'#7FB069',baseColor:'#282c34',textColor:'#cccccc'});
  const { token } = useToken();
  return (<>
    <ConfigProvider
    theme={{
      token: {

        colorPrimary:custTheme?.primaryColor || '#7FB069',
        colorBgBase:custTheme?.baseColor || '#282c34',
        borderRadius:"8px",


        
        colorTextBase:custTheme?.textColor || '#cccccc',
        colorInfo:"#6CA6C1",
        colorError:"#EF767A",
        colorSuccess:'#7FB069',
        colorWarning:'#EDAE49',},
    }}>
    <div className="App" style={{height:"100%"}}>
    <Card style={{borderRadius:0}} hidden={loginCheck()}><LoginForm/></Card>
    {loginCheck() ? 
    <MainTradingPage hidden={!loginCheck()} /> : <></>
    
}
    </div>      
      </ConfigProvider>
      </>
  );
}
export default App;