import React from 'react';
import { Card, Col, Row,Grid } from 'antd';

const { useBreakpoint } = Grid;

const themes = [
  {
    name: 'UEE Navy',
    primaryColor: '#1B3C68',
    baseColor: '#0B1C30',
    textColor: '#B0C4DE'
  },
  {
    name: 'Pirate',
    primaryColor: '#FF1100',
    baseColor: '#101010',
    textColor: '#FFA07A'
  },{
  name: 'Terra',
  primaryColor: '#78968D', // A muted green color inspired by Terra's lush vegetation
  baseColor: '#F1F1F1', // A light color inspired by Terra's natural beauty
  textColor: '#1C352D' // A dark color for contrast, inspired by the dense forests of Terra
},
{
  name: 'Stanton',
  primaryColor: '#FFD700', // Gold color, representing the wealth and prosperity of Stanton
  baseColor: '#333333', // Dark gray, representing the industrial nature of Stanton
  textColor: '#FFFFFF' // White for contrast
},
{
  name: 'Crusader',
  primaryColor: '#FFA500', // Bright orange, representing Crusader's gas giant
  baseColor: '#1A1A2E', // Dark blue, representing the deep space around Crusader
  textColor: '#E5E5E5' // Light grey for contrast
},
{
  name: 'Hurston',
  primaryColor: '#8B4513', // Saddle brown, representing Hurston's polluted environment
  baseColor: '#4B5320', // Dark green, representing the natural environment of Hurston
  textColor: '#E5E5E5' // Light grey for contrast
},
{
  name: 'MicroTech',
  primaryColor: '#87CEEB', // Sky blue, representing MicroTech's icy environment
  baseColor: '#1A1A2E', // Dark blue, representing the deep, cold environment of MicroTech
  textColor: '#E5E5E5' // Light grey for contrast
}
,{
  name: 'ArcCorp',
  primaryColor: '#FF4500', // Keep the primary color as a bold, industrial orange
  baseColor: '#303030', // Change the base color to a darker gray to reflect the urban aesthetic
  textColor: '#E0E0E0' // Change the text color to a lighter gray for better contrast against the darker base color
}
,
  {
    name: 'Vanduul',
    primaryColor: '#800000',
    baseColor: '#070707',
    textColor: '#FF6347'
  },
  {
    name: 'Banu',
    primaryColor: '#FFD700',
    baseColor: '#8B4513',
    textColor: '#FFEC8B'
  },
  {
    name: 'Xi\'an',
    primaryColor: '#228B22',
    baseColor: '#696969',
    textColor: '#ADFF2F'
  },
  {
    name: 'Tevarin',
    primaryColor: '#483D8B',
    baseColor: '#2F4F4F',
    textColor: '#9370DB'
  },
  {
  name: 'Drake Interplanetary',
  primaryColor: '#FF8C00', // Keep the primary color as a bold, industrial orange
  baseColor: '#424242', // Change the base color to a darker gray to reflect the industrial aesthetic
  textColor: '#E0E0E0' // Change the text color to a lighter gray for better contrast against the darker base color
}
,
  {
    name: 'Origin Jumpworks',
    primaryColor: '#87CEEB',
    baseColor: '#1E90FF',
    textColor: '#F0F8FF'
  },
  {
    name: 'Anvil Aerospace',
    primaryColor: '#FF4500',
    baseColor: '#696969',
    textColor: '#FFA07A'
  },{
  name: 'Aegis Dynamics',
  primaryColor: '#3D5A80',
  baseColor: '#98C1D9',
  textColor: '#E0FBFC'
},
{
  name: 'MISC',
  primaryColor: '#EE6C4D',
  baseColor: '#293241',
  textColor: '#E0FBFC'
},
{
  name: 'Kruger Intergalactic',
  primaryColor: '#1D3557',
  baseColor: '#457B9D',
  textColor: '#F1FAEE'
},
{
  name: 'Consolidated Outland',
  primaryColor: '#E63946',
  baseColor: '#F1FAEE',
  textColor: '#1D3557'
}
,{
  name: 'Mountain Dew',
  primaryColor: '#77B255', // Mountain Dew's iconic bright green color
  baseColor: '#DFF280', // A lighter, more obnoxious shade of green
  textColor: '#FF4500' // A bold orange for contrast, inspired by the excitement of Mountain Dew
},
// {
//   name: 'Brittany',
//   primaryColor: '#8B008B', // Dark Magenta as the primary color
//   baseColor: '#2F1B4C', // A dark purple for the base color
//   textColor: '#D8BFD8' // Thistle (a soft, feminine shade of purple) for the text color
// }

  // Add more themes here...
];


export const ThemeGrid = () => {
  const screenSize = useBreakpoint();

  const setTheme = (theme) => {
    console.log(theme);
    localStorage.setItem('themeP', theme.primaryColor);
    localStorage.setItem('themeB', theme.baseColor);
    localStorage.setItem('themeT', theme.textColor);
    window.location.reload();
  };

  return (
    <div className="site-card-wrapper">
      <Row gutter={[8,8]}>
        {themes.map((theme, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={6} key={index}>
            <Card
              hoverable
              style={{ 
                backgroundColor: theme.baseColor, 
                color: theme.textColor, 
                borderColor: theme.primaryColor,
                borderWidth: '5px', // Adjust this value to change the border thickness
                borderStyle: 'solid' // This ensures the border is solid
              }}
              onClick={() => setTheme(theme)}
            >
              <Card.Meta 
                title={<span style={{ color: theme.textColor }}>{theme.name}</span>} 
                description={<span style={{ color: theme.textColor }}>Click to set this theme</span>} 
              />

            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
