// Import required modules
import './App.css';
import { 
  Card, 
  ConfigProvider,
  Switch,
  theme,
  Watermark 
} from 'antd';
import MainTradingPage from './shared/mainTradingPage';
import React, { useEffect, useState } from 'react';
import { 
  LoginForm, 
  loginImport 
} from './components/logicForLogin';

const { useToken } = theme;

// Define a function to set the theme in local storage
export const setTheme = (custTheme) => {
  console.log(custTheme);
  localStorage.setItem('themeP', custTheme[0].primaryColor);
  localStorage.setItem('themeB', custTheme[0].baseColor);
  localStorage.setItem('themeT', custTheme[0].textColor);
};

// Define a function to get the theme from local storage
export const getTheme = () => {
  // Check if the theme exists in local storage
  if (localStorage.getItem('themeP') === undefined){
    // Set the default theme
    setTheme({primaryColor:'#7FB069',baseColor:'#282c34',textColor:'#cccccc'});
  }
  // Return the theme from local storage
  return({
    primaryColor:localStorage.getItem('themeP'),
    baseColor:localStorage.getItem('themeB'),
    textColor:localStorage.getItem('themeT')
  });
};

// Check if the user is logged in
const loginCheck = () => {
  console.log(loginImport() === 'loggedIn');
  return (loginImport() === "loggedIn");
}

function App() {
  // Set the custom theme using state
  const [custTheme, setcustTheme] = useState(
    getTheme() || {primaryColor:'#7FB069',baseColor:'#282c34',textColor:'#cccccc'}
  );
  // Get the token from the theme
  const { token } = useToken();

  // Return the UI components
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Set the theme colors using state
            colorPrimary:custTheme?.primaryColor || '#7FB069',
            colorBgBase:custTheme?.baseColor || '#282c34',
            borderRadius:"8px",
            colorTextBase:custTheme?.textColor || '#cccccc',
            colorInfo:"#6CA6C1",
            colorError:"#EF767A",
            colorSuccess:'#7FB069',
            colorWarning:'#EDAE49'
          },
        }}
      >
        <div className="App" style={{height:"100vh", overflow:"hidden"}}>
          <Card style={{borderRadius:0, overflow:"auto", overflowX: "hidden"}} hidden={loginCheck()} >
            <LoginForm/>
          </Card>
          {loginCheck() ? 
            <MainTradingPage hidden={!loginCheck()} /> : 
            <></>
          }
        </div>      
      </ConfigProvider>
    </>
  );
}

// Export the App component as default
export default App;
