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
import ParticleEffect from './components/ParticleEffect';
let mac = false;


const { useToken } = theme;

// Define a function to set the theme in local storage
export const setTheme = (custTheme) => {
  console.log(custTheme);
  localStorage.setItem('themeP', custTheme[0].primaryColor);
  localStorage.setItem('themeB', custTheme[0].baseColor);
  localStorage.setItem('themeT', custTheme[0].textColor);
  localStorage.setItem('themeR', custTheme[0].borderRadius || 8);
  localStorage.setItem('themeF', custTheme[0].fontFamily || 'Inter, sans-serif');
  localStorage.setItem('themeHF', custTheme[0].headingFont || 'Rajdhani, sans-serif');
  localStorage.setItem('themeFSize', custTheme[0].fontSize || 14);
  localStorage.setItem('themeA', custTheme[0].accentColor || custTheme[0].primaryColor);
  localStorage.setItem('themeS', custTheme[0].secondaryColor || custTheme[0].textColor);
  localStorage.setItem('themeCO', custTheme[0].cardOpacity || 1);
  localStorage.setItem('themeBS', custTheme[0].boxShadow || 'small');
  localStorage.setItem('themeBtnR', custTheme[0].buttonRadius || custTheme[0].borderRadius || 8);
};

// Define a function to get the theme from local storage
export const getTheme = () => {
  // Check if the theme exists in local storage
  if (localStorage.getItem('themeP') === undefined){
    // Set the default theme
    setTheme([{
      primaryColor:'#7FB069',
      baseColor:'#282c34',
      textColor:'#cccccc',
      borderRadius:8,
      fontFamily:'Inter, sans-serif',
      headingFont:'Rajdhani, sans-serif',
      fontSize:14,
      accentColor:'#7FB069',
      secondaryColor:'#cccccc',
      cardOpacity:1,
      boxShadow:'small',
      buttonRadius:8
    }]);
}
  document.documentElement.style.setProperty('--primaryColor', localStorage.getItem('themeP'));
  document.documentElement.style.setProperty('--baseColor', localStorage.getItem('themeB'));
  document.documentElement.style.setProperty('--textColor', localStorage.getItem('themeT'));
  document.documentElement.style.setProperty('--borderRadius', localStorage.getItem('themeR') + 'px');
  document.documentElement.style.setProperty('--fontFamily', localStorage.getItem('themeF') || 'Inter, sans-serif');
  document.documentElement.style.setProperty('--headingFont', localStorage.getItem('themeHF') || 'Rajdhani, sans-serif');
  document.documentElement.style.setProperty('--fontSize', localStorage.getItem('themeFSize') + 'px');
  document.documentElement.style.setProperty('--accentColor', localStorage.getItem('themeA'));
  document.documentElement.style.setProperty('--secondaryColor', localStorage.getItem('themeS'));
  document.documentElement.style.setProperty('--cardOpacity', localStorage.getItem('themeCO'));
  document.documentElement.style.setProperty('--buttonRadius', localStorage.getItem('themeBtnR') + 'px');
  
  // Return the theme from local storage
  return({
    primaryColor:localStorage.getItem('themeP'),
    baseColor:localStorage.getItem('themeB'),
    textColor:localStorage.getItem('themeT'),
    borderRadius:parseInt(localStorage.getItem('themeR')) || 8,
    fontFamily:localStorage.getItem('themeF') || 'Inter, sans-serif',
    headingFont:localStorage.getItem('themeHF') || 'Rajdhani, sans-serif',
    fontSize:parseInt(localStorage.getItem('themeFSize')) || 14,
    accentColor:localStorage.getItem('themeA'),
    secondaryColor:localStorage.getItem('themeS'),
    cardOpacity:parseFloat(localStorage.getItem('themeCO')) || 1,
    boxShadow:localStorage.getItem('themeBS') || 'small',
    buttonRadius:parseInt(localStorage.getItem('themeBtnR')) || 8
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
    getTheme() || {
      primaryColor:'#7FB069',
      baseColor:'#282c34',
      textColor:'#cccccc',
      borderRadius:8,
      fontFamily:'Inter, sans-serif',
      headingFont:'Rajdhani, sans-serif',
      fontSize:14,
      accentColor:'#7FB069',
      secondaryColor:'#cccccc',
      cardOpacity:1,
      boxShadow:'small',
      buttonRadius:8
    }
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
            borderRadius:custTheme?.borderRadius || 8,
            colorTextBase:custTheme?.textColor || '#cccccc',
            colorText:custTheme?.textColor || '#cccccc',
            colorTextHeading:custTheme?.textColor || '#cccccc',
            fontFamily:custTheme?.fontFamily || 'Inter, sans-serif',
            fontSize:custTheme?.fontSize || 14,
            fontSizeHeading1: (custTheme?.fontSize || 14) * 2.5,
            fontSizeHeading2: (custTheme?.fontSize || 14) * 2,
            fontSizeHeading3: (custTheme?.fontSize || 14) * 1.5,
            colorInfo:custTheme?.accentColor || "#6CA6C1",
            colorError:"#EF767A",
            colorSuccess:'#7FB069',
            colorWarning:'#EDAE49',
            controlItemBgActive: custTheme?.accentColor,
            controlItemBgActiveHover: custTheme?.accentColor,
            borderRadiusLG: custTheme?.buttonRadius || custTheme?.borderRadius || 8,
            boxShadow: custTheme?.boxShadow === 'none' ? 'none' : 
                      custTheme?.boxShadow === 'large' ? '0 6px 16px 0 rgba(0, 0, 0, 0.4)' :
                      custTheme?.boxShadow === 'glow' ? `0 0 20px ${custTheme?.primaryColor}40` :
                      '0 1px 2px 0 rgba(0, 0, 0, 0.3)'
          },
          components: {
            Typography: {
              fontFamily: custTheme?.headingFont || 'Rajdhani, sans-serif',
              titleMarginBottom: 0
            },
            Card: {
              colorBgContainer: custTheme?.cardOpacity < 1 ? 
                `${custTheme?.baseColor}${Math.round(custTheme?.cardOpacity * 255).toString(16).padStart(2, '0')}` : 
                custTheme?.baseColor
            }
          }
        }}
      >
        <TitleBar color={custTheme?.baseColor || '#282c34'} textColor={custTheme?.textColor || '#cccccc'} mac={mac} login={loginCheck()}/>
        <div className="App" style={{height:"100vh", overflow:"hidden", backgroundColor:"transparent !important"}}>
          <Card style={{borderRadius:0, overflow:"auto", overflowX: "hidden", zIndex: '1'}} hidden={loginCheck()} >
        <ParticleEffect />
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
