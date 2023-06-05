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
import TitleBar from './components/TitleBar';



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
  document.documentElement.style.setProperty('--primaryColor', localStorage.getItem('themeP'));
  document.documentElement.style.setProperty('--baseColor', localStorage.getItem('themeB'));
  document.documentElement.style.setProperty('--textColor', localStorage.getItem('themeT'));
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
        {/* <TitleBar color={custTheme?.baseColor || '#282c34'} textColor={custTheme?.textColor || '#cccccc'}/> */}
        <div className="App" style={{height:"100vh", overflow:"hidden", backgroundColor:"transparent !important"}}>
          <Card style={{borderRadius:0, overflow:"auto", overflowX: "hidden"}} hidden={loginCheck()} >
            <LoginForm/>
          </Card>
          {loginCheck() ? 
            <Watermark content="•" gap={[10,10]} zIndex={1}><MainTradingPage hidden={!loginCheck()} /></Watermark> 
             : 
            <></>
          } 
        </div>      
      </ConfigProvider>
    </>
  );
}

// Export the App component as default
export default App;
