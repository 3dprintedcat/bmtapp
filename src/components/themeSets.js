import React from 'react';
import { Card, Col, Row,Grid } from 'antd';

const { useBreakpoint } = Grid;

const themes = [
  {
    name: 'Aegis Dynamics',
    primaryColor: '#3D5A80',
    baseColor: '#98C1D9',
    textColor: '#E0FBFC'
  },
  {
    name: 'Anvil Aerospace',
    primaryColor: '#FF4500',
    baseColor: '#696969',
    textColor: '#FFA07A'
  },
  {
    name: 'Anvil Amethyst',
    primaryColor: '#9932CC',
    baseColor: '#F8F8FF',
    textColor: '#4B0082'
  },
  {
    name: 'ArcCorp',
    primaryColor: '#FF4500',
    baseColor: '#303030',
    textColor: '#E0E0E0'
  },
  {
    name: 'Aurora Pink',
    primaryColor: '#FF69B4',
    baseColor: '#FFF0F5',
    textColor: '#8B008B'
  },
  {
    name: 'Banu',
    primaryColor: '#FFD700',
    baseColor: '#8B4513',
    textColor: '#FFEC8B'
  },
  {
    name: 'Brittany',
    primaryColor: '#8B008B',
    baseColor: '#2F1B4C',
    textColor: '#D8BFD8'
  },
  {
    name: 'Consolidated Outland',
    primaryColor: '#E63946',
    baseColor: '#F1FAEE',
    textColor: '#1D3557'
  },
  {
    name: 'Crusader',
    primaryColor: '#FFA500',
    baseColor: '#1A1A2E',
    textColor: '#E5E5E5'
  },
  {
    name: 'Drake Diamond',
    primaryColor: '#FFB6C1',
    baseColor: '#FFF5EE',
    textColor: '#2F4F4F'
  },
  {
    name: 'Drake Interplanetary',
    primaryColor: '#FF8C00',
    baseColor: '#424242',
    textColor: '#E0E0E0'
  },
  {
    name: 'Hurston',
    primaryColor: '#8B4513',
    baseColor: '#4B5320',
    textColor: '#E5E5E5'
  },
  {
    name: 'Kruger Intergalactic',
    primaryColor: '#1D3557',
    baseColor: '#457B9D',
    textColor: '#F1FAEE'
  },
  {
    name: 'MicroTech',
    primaryColor: '#87CEEB',
    baseColor: '#1A1A2E',
    textColor: '#E5E5E5'
  },
  {
    name: 'MISC',
    primaryColor: '#EE6C4D',
    baseColor: '#293241',
    textColor: '#E0FBFC'
  },
  {
    name: 'Mountain Dew',
    primaryColor: '#77B255',
    baseColor: '#DFF280',
    textColor: '#FF4500'
  },
  {
    name: 'Origin Jumpworks',
    primaryColor: '#87CEEB',
    baseColor: '#1E90FF',
    textColor: '#F0F8FF'
  },
  {
    name: 'Origin Opal',
    primaryColor: '#FFC0CB',
    baseColor: '#FAEBD7',
    textColor: '#8B4513'
  },
  {
    name: 'Pirate',
    primaryColor: '#FF1100',
    baseColor: '#101010',
    textColor: '#FFA07A'
  },
  {
    name: 'Stanton',
    primaryColor: '#FFD700',
    baseColor: '#333333',
    textColor: '#FFFFFF'
  },
  {
    name: 'Tevarin',
    primaryColor: '#483D8B',
    baseColor: '#2F4F4F',
    textColor: '#9370DB'
  },
  {
    name: 'Terra',
    primaryColor: '#78968D',
    baseColor: '#F1F1F1',
    textColor: '#1C352D'
  },
  {
    name: 'UEE Navy',
    primaryColor: '#1B3C68',
    baseColor: '#0B1C30',
    textColor: '#B0C4DE'
  },
  {
    name: 'Vanduul',
    primaryColor: '#800000',
    baseColor: '#070707',
    textColor: '#FF6347'
  },
  {
    name: 'Vanduul Violet',
    primaryColor: '#9400D3',
    baseColor: '#E6E6FA',
    textColor: '#FFFFFF'
  },
  {
    name: 'Xi\'an',
    primaryColor: '#228B22',
    baseColor: '#696969',
    textColor: '#ADFF2F'
  }


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
