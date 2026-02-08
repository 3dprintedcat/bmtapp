import React from 'react';
import { Card, Col, Row, Grid, Tag, Space } from 'antd';

const { useBreakpoint } = Grid;

const themes = [
  // Ship Manufacturers
  {
    name: 'Aegis Dynamics',
    description: 'Military precision and strength',
    primaryColor: '#4A6FA5',
    baseColor: '#1A1F2E',
    textColor: '#E8EEF7',
    accentColor: '#7BA3D4',
    secondaryColor: '#B0C4DE',
    borderRadius: 2,
    fontFamily: 'Rajdhani, sans-serif',
    headingFont: 'Rajdhani, sans-serif',
    fontSize: 14,
    cardOpacity: 0.95,
    boxShadow: 'small',
    buttonRadius: 2
  },
  {
    name: 'Anvil Aerospace',
    description: 'Military-grade ruggedness',
    primaryColor: '#D84315',
    baseColor: '#263238',
    textColor: '#ECEFF1',
    accentColor: '#FF5722',
    secondaryColor: '#90A4AE',
    borderRadius: 0,
    fontFamily: 'Saira Condensed, sans-serif',
    headingFont: 'Teko, sans-serif',
    fontSize: 14,
    cardOpacity: 1,
    boxShadow: 'small',
    buttonRadius: 0
  },
  {
    name: 'ARGO Astronautics',
    description: 'Industrial utility',
    primaryColor: '#FFA726',
    baseColor: '#424242',
    textColor: '#FFE0B2',
    accentColor: '#FFB74D',
    secondaryColor: '#FFCC80',
    borderRadius: 4,
    fontFamily: 'Roboto Condensed, sans-serif',
    headingFont: 'Roboto Condensed, sans-serif',
    fontSize: 14,
    cardOpacity: 0.95,
    boxShadow: 'small',
    buttonRadius: 4
  },
  {
    name: 'Consolidated Outland',
    description: 'Innovative exploration',
    primaryColor: '#26A69A',
    baseColor: '#F5F5F5',
    textColor: '#004D40',
    accentColor: '#4DB6AC',
    secondaryColor: '#00796B',
    borderRadius: 16,
    fontFamily: 'Montserrat, sans-serif',
    headingFont: 'Montserrat, sans-serif',
    fontSize: 14,
    cardOpacity: 1,
    boxShadow: 'small',
    buttonRadius: 16
  },
  {
    name: 'Crusader Industries',
    description: 'Luxury and capability',
    primaryColor: '#FF6F00',
    baseColor: '#0D1117',
    textColor: '#FFE0B2',
    accentColor: '#FF8F00',
    secondaryColor: '#FFB74D',
    borderRadius: 12,
    fontFamily: 'Exo 2, sans-serif',
    headingFont: 'Exo 2, sans-serif',
    fontSize: 14,
    cardOpacity: 0.9,
    boxShadow: 'glow',
    buttonRadius: 12
  },
  {
    name: 'Drake Interplanetary',
    description: 'Function over form',
    primaryColor: '#FF6B35',
    baseColor: '#1C1C1C',
    textColor: '#F4F4F4',
    accentColor: '#FF8555',
    secondaryColor: '#CCCCCC',
    borderRadius: 3,
    fontFamily: 'Roboto, sans-serif',
    headingFont: 'Roboto, sans-serif',
    fontSize: 14,
    cardOpacity: 1,
    boxShadow: 'small',
    buttonRadius: 3
  },
  {
    name: 'Esperia',
    description: 'Alien reproductions',
    primaryColor: '#8E24AA',
    baseColor: '#1A1625',
    textColor: '#E1BEE7',
    accentColor: '#AB47BC',
    secondaryColor: '#CE93D8',
    borderRadius: 8,
    fontFamily: 'Orbitron, sans-serif',
    headingFont: 'Orbitron, sans-serif',
    fontSize: 13,
    cardOpacity: 0.92,
    boxShadow: 'glow',
    buttonRadius: 8
  },
  {
    name: 'Kruger Intergalactic',
    description: 'Compact German engineering',
    primaryColor: '#0277BD',
    baseColor: '#ECEFF1',
    textColor: '#01579B',
    accentColor: '#0288D1',
    secondaryColor: '#01579B',
    borderRadius: 2,
    fontFamily: 'IBM Plex Sans, sans-serif',
    headingFont: 'IBM Plex Sans, sans-serif',
    fontSize: 14,
    cardOpacity: 1,
    boxShadow: 'none',
    buttonRadius: 2
  },
  {
    name: 'MISC',
    description: 'Versatile workhorse ships',
    primaryColor: '#F57C00',
    baseColor: '#212121',
    textColor: '#FFE0B2',
    accentColor: '#FB8C00',
    secondaryColor: '#FFCC80',
    borderRadius: 6,
    fontFamily: 'Inter, sans-serif',
    headingFont: 'Inter, sans-serif',
    fontSize: 14,
    cardOpacity: 0.95,
    boxShadow: 'small',
    buttonRadius: 6
  },
  {
    name: 'Origin Jumpworks',
    description: 'Luxury and elegance',
    primaryColor: '#29B6F6',
    baseColor: '#FAFAFA',
    textColor: '#0D47A1',
    accentColor: '#4FC3F7',
    secondaryColor: '#1976D2',
    borderRadius: 16,
    fontFamily: 'Raleway, sans-serif',
    headingFont: 'Raleway, sans-serif',
    fontSize: 14,
    cardOpacity: 1,
    boxShadow: 'small',
    buttonRadius: 16
  },
  {
    name: 'RSI (Roberts Space)',
    description: 'Classic UEE design',
    primaryColor: '#1976D2',
    baseColor: '#263238',
    textColor: '#E3F2FD',
    accentColor: '#2196F3',
    secondaryColor: '#90CAF9',
    borderRadius: 4,
    fontFamily: 'Titillium Web, sans-serif',
    headingFont: 'Titillium Web, sans-serif',
    fontSize: 14,
    cardOpacity: 1,
    boxShadow: 'small',
    buttonRadius: 4
  },
  {
    name: 'Tumbril Land Systems',
    description: 'Ground vehicle specialists',
    primaryColor: '#7CB342',
    baseColor: '#1B1B1B',
    textColor: '#DCEDC8',
    accentColor: '#8BC34A',
    secondaryColor: '#AED581',
    borderRadius: 0,
    fontFamily: 'Roboto Condensed, sans-serif',
    headingFont: 'Russo One, sans-serif',
    fontSize: 15,
    cardOpacity: 1,
    boxShadow: 'small',
    buttonRadius: 0
  },
  {
    name: 'Vanduul Clans',
    description: 'Alien aggression',
    primaryColor: '#C62828',
    baseColor: '#0A0A0A',
    textColor: '#FFCDD2',
    accentColor: '#E53935',
    secondaryColor: '#EF5350',
    borderRadius: 1,
    fontFamily: 'Michroma, sans-serif',
    headingFont: 'Michroma, sans-serif',
    fontSize: 13,
    cardOpacity: 0.9,
    boxShadow: 'glow',
    buttonRadius: 1
  },
  {
    name: 'Banu Souli',
    description: 'Alien merchants',
    primaryColor: '#FFB300',
    baseColor: '#3E2723',
    textColor: '#FFF8E1',
    accentColor: '#FFC107',
    secondaryColor: '#FFD54F',
    borderRadius: 8,
    fontFamily: 'Jura, sans-serif',
    headingFont: 'Jura, sans-serif',
    fontSize: 14,
    cardOpacity: 0.95,
    boxShadow: 'glow',
    buttonRadius: 8
  },
  {
    name: "Xi'an Empire",
    description: 'Ancient alien culture',
    primaryColor: '#43A047',
    baseColor: '#1B2A27',
    textColor: '#C8E6C9',
    accentColor: '#66BB6A',
    secondaryColor: '#81C784',
    borderRadius: 12,
    fontFamily: 'Exo 2, sans-serif',
    headingFont: 'Iceland, sans-serif',
    fontSize: 14,
    cardOpacity: 0.92,
    boxShadow: 'glow',
    buttonRadius: 12
  },
  {
    name: 'Tevarin Remnant',
    description: 'Honorable warriors',
    primaryColor: '#5E35B1',
    baseColor: '#1A1625',
    textColor: '#D1C4E9',
    accentColor: '#7E57C2',
    secondaryColor: '#9575CD',
    borderRadius: 6,
    fontFamily: 'Rajdhani, sans-serif',
    headingFont: 'Rajdhani, sans-serif',
    fontSize: 14,
    cardOpacity: 0.93,
    boxShadow: 'small',
    buttonRadius: 6
  },
  
  // Corporations & Planets
  {
    name: 'ArcCorp',
    description: 'Industrial mega-corporation',
    primaryColor: '#F4511E',
    baseColor: '#212121',
    textColor: '#FFCCBC',
    accentColor: '#FF5722',
    secondaryColor: '#FF7043',
    borderRadius: 0,
    fontFamily: 'Saira Condensed, sans-serif',
    headingFont: 'Tourney, sans-serif',
    fontSize: 15,
    cardOpacity: 1,
    boxShadow: 'small',
    buttonRadius: 0
  },
  {
    name: 'Hurston Dynamics',
    description: 'Weapons manufacturing',
    primaryColor: '#6D4C41',
    baseColor: '#1C1410',
    textColor: '#D7CCC8',
    accentColor: '#8D6E63',
    secondaryColor: '#A1887F',
    borderRadius: 2,
    fontFamily: 'Roboto, sans-serif',
    headingFont: 'Roboto, sans-serif',
    fontSize: 14,
    cardOpacity: 0.98,
    boxShadow: 'small',
    buttonRadius: 2
  },
  {
    name: 'microTech',
    description: 'Computer technology',
    primaryColor: '#42A5F5',
    baseColor: '#FAFAFA',
    textColor: '#0D47A1',
    accentColor: '#64B5F6',
    secondaryColor: '#1976D2',
    borderRadius: 8,
    fontFamily: 'IBM Plex Sans, sans-serif',
    headingFont: 'IBM Plex Mono, sans-serif',
    fontSize: 14,
    cardOpacity: 1,
    boxShadow: 'small',
    buttonRadius: 8
  },
  {
    name: 'Crusader (Planet)',
    description: 'Gas giant platforms',
    primaryColor: '#FB8C00',
    baseColor: '#0A0E14',
    textColor: '#FFE0B2',
    accentColor: '#FF9800',
    secondaryColor: '#FFB74D',
    borderRadius: 12,
    fontFamily: 'Exo 2, sans-serif',
    headingFont: 'Exo 2, sans-serif',
    fontSize: 14,
    cardOpacity: 0.9,
    boxShadow: 'glow',
    buttonRadius: 12
  },
  
  // Factions & Organizations
  {
    name: 'UEE Navy',
    description: 'United Empire military',
    primaryColor: '#1565C0',
    baseColor: '#0D1B2A',
    textColor: '#BBDEFB',
    accentColor: '#1976D2',
    secondaryColor: '#64B5F6',
    borderRadius: 0,
    fontFamily: 'Rajdhani, sans-serif',
    headingFont: 'Audiowide, sans-serif',
    fontSize: 14,
    cardOpacity: 1,
    boxShadow: 'small',
    buttonRadius: 0
  },
  {
    name: 'UEE Advocacy',
    description: 'Law enforcement',
    primaryColor: '#283593',
    baseColor: '#1A1F2E',
    textColor: '#C5CAE9',
    accentColor: '#3F51B5',
    secondaryColor: '#5C6BC0',
    borderRadius: 2,
    fontFamily: 'Titillium Web, sans-serif',
    headingFont: 'Titillium Web, sans-serif',
    fontSize: 14,
    cardOpacity: 1,
    boxShadow: 'small',
    buttonRadius: 2
  },
  {
    name: 'Nine Tails',
    description: 'Pirate syndicate',
    primaryColor: '#D32F2F',
    baseColor: '#0F0F0F',
    textColor: '#FFCDD2',
    accentColor: '#F44336',
    secondaryColor: '#E57373',
    borderRadius: 4,
    fontFamily: 'Chakra Petch, sans-serif',
    headingFont: 'Audiowide, sans-serif',
    fontSize: 14,
    cardOpacity: 0.92,
    boxShadow: 'glow',
    buttonRadius: 4
  },
  {
    name: 'Xenothreat',
    description: 'Human supremacists',
    primaryColor: '#BF360C',
    baseColor: '#1C1410',
    textColor: '#FFCCBC',
    accentColor: '#D84315',
    secondaryColor: '#FF5722',
    borderRadius: 1,
    fontFamily: 'Saira Condensed, sans-serif',
    headingFont: 'Russo One, sans-serif',
    fontSize: 15,
    cardOpacity: 1,
    boxShadow: 'small',
    buttonRadius: 1
  },
  {
    name: 'Crusader Security',
    description: 'Private security',
    primaryColor: '#FF8F00',
    baseColor: '#212121',
    textColor: '#FFE57F',
    accentColor: '#FFA000',
    secondaryColor: '#FFB300',
    borderRadius: 6,
    fontFamily: 'Roboto Condensed, sans-serif',
    headingFont: 'Roboto Condensed, sans-serif',
    fontSize: 14,
    cardOpacity: 0.95,
    boxShadow: 'small',
    buttonRadius: 6
  },
  
  // Locations
  {
    name: 'Stanton System',
    description: 'Corporate controlled',
    primaryColor: '#FFD600',
    baseColor: '#1F1F1F',
    textColor: '#FFF9C4',
    accentColor: '#FFEA00',
    secondaryColor: '#FFF59D',
    borderRadius: 8,
    fontFamily: 'Inter, sans-serif',
    headingFont: 'Montserrat, sans-serif',
    fontSize: 14,
    cardOpacity: 0.95,
    boxShadow: 'glow',
    buttonRadius: 8
  },
  {
    name: 'Terra',
    description: 'Human cultural capital',
    primaryColor: '#00897B',
    baseColor: '#F5F5F5',
    textColor: '#004D40',
    accentColor: '#26A69A',
    secondaryColor: '#00695C',
    borderRadius: 12,
    fontFamily: 'Montserrat, sans-serif',
    headingFont: 'Montserrat, sans-serif',
    fontSize: 14,
    cardOpacity: 1,
    boxShadow: 'none',
    buttonRadius: 12
  },
  {
    name: 'Orison',
    description: 'Floating city',
    primaryColor: '#42A5F5',
    baseColor: '#E3F2FD',
    textColor: '#01579B',
    accentColor: '#64B5F6',
    secondaryColor: '#1976D2',
    borderRadius: 16,
    fontFamily: 'Raleway, sans-serif',
    headingFont: 'Raleway, sans-serif',
    fontSize: 14,
    cardOpacity: 0.98,
    boxShadow: 'small',
    buttonRadius: 16
  },
  {
    name: 'Lorville',
    description: 'Industrial sprawl',
    primaryColor: '#8D6E63',
    baseColor: '#1C1410',
    textColor: '#D7CCC8',
    accentColor: '#A1887F',
    secondaryColor: '#BCAAA4',
    borderRadius: 0,
    fontFamily: 'Roboto Condensed, sans-serif',
    headingFont: 'Teko, sans-serif',
    fontSize: 14,
    cardOpacity: 1,
    boxShadow: 'small',
    buttonRadius: 0
  },
  {
    name: 'Area18',
    description: 'Urban metropolis',
    primaryColor: '#FF5722',
    baseColor: '#212121',
    textColor: '#FFCCBC',
    accentColor: '#FF6E40',
    secondaryColor: '#FF7043',
    borderRadius: 2,
    fontFamily: 'Titillium Web, sans-serif',
    headingFont: 'Chakra Petch, sans-serif',
    fontSize: 14,
    cardOpacity: 0.96,
    boxShadow: 'small',
    buttonRadius: 2
  },
  {
    name: 'New Babbage',
    description: 'Arctic technology hub',
    primaryColor: '#29B6F6',
    baseColor: '#FAFAFA',
    textColor: '#0277BD',
    accentColor: '#4FC3F7',
    secondaryColor: '#0288D1',
    borderRadius: 8,
    fontFamily: 'IBM Plex Sans, sans-serif',
    headingFont: 'IBM Plex Sans, sans-serif',
    fontSize: 14,
    cardOpacity: 1,
    boxShadow: 'none',
    buttonRadius: 8
  },
  {
    name: 'GrimHEX',
    description: 'Outlaw station',
    primaryColor: '#E53935',
    baseColor: '#0A0A0A',
    textColor: '#FFCDD2',
    accentColor: '#F44336',
    secondaryColor: '#EF5350',
    borderRadius: 3,
    fontFamily: 'Space Mono, monospace',
    headingFont: 'Michroma, sans-serif',
    fontSize: 13,
    cardOpacity: 0.88,
    boxShadow: 'glow',
    buttonRadius: 3
  },
  {
    name: 'Port Olisar',
    description: 'Legacy station',
    primaryColor: '#1976D2',
    baseColor: '#263238',
    textColor: '#BBDEFB',
    accentColor: '#2196F3',
    secondaryColor: '#64B5F6',
    borderRadius: 4,
    fontFamily: 'Rajdhani, sans-serif',
    headingFont: 'Play, sans-serif',
    fontSize: 14,
    cardOpacity: 1,
    boxShadow: 'small',
    buttonRadius: 4
  }
];


export const ThemeGrid = () => {
  const screenSize = useBreakpoint();

  const setTheme = (theme) => {
    console.log(theme);
    localStorage.setItem('themeP', theme.primaryColor);
    localStorage.setItem('themeB', theme.baseColor);
    localStorage.setItem('themeT', theme.textColor);
    localStorage.setItem('themeR', theme.borderRadius);
    localStorage.setItem('themeF', theme.fontFamily);
    localStorage.setItem('themeHF', theme.headingFont);
    localStorage.setItem('themeFSize', theme.fontSize);
    localStorage.setItem('themeA', theme.accentColor);
    localStorage.setItem('themeS', theme.secondaryColor);
    localStorage.setItem('themeCO', theme.cardOpacity);
    localStorage.setItem('themeBS', theme.boxShadow);
    localStorage.setItem('themeBtnR', theme.buttonRadius);
    window.location.reload();
  };

  return (
    <div className="site-card-wrapper">
      <Row gutter={[16, 16]}>
        {themes.map((theme, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={6} key={index}>
            <Card
              hoverable
              style={{ 
                backgroundColor: theme.baseColor, 
                color: theme.textColor, 
                borderColor: theme.primaryColor,
                borderWidth: '4px',
                borderStyle: 'solid',
                borderRadius: `${theme.borderRadius}px`,
                opacity: theme.cardOpacity
              }}
              onClick={() => setTheme(theme)}
            >
              <Card.Meta 
                title={
                  <div>
                    <div style={{ 
                      color: theme.textColor, 
                      fontWeight: 'bold', 
                      marginBottom: '8px', 
                      fontFamily: theme.headingFont,
                      fontSize: '18px'
                    }}>
                      {theme.name}
                    </div>
                    <div style={{ 
                      color: theme.textColor, 
                      fontSize: '12px', 
                      opacity: 0.8,
                      fontStyle: 'italic',
                      fontFamily: theme.fontFamily
                    }}>
                      {theme.description}
                    </div>
                  </div>
                } 
                description={
                  <div style={{ color: theme.textColor, marginTop: '12px' }}>
                    <Space direction="vertical" size={4} style={{ width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                        <Tag color={theme.primaryColor} style={{ margin: 0 }}>Primary</Tag>
                        <Tag color={theme.accentColor} style={{ margin: 0 }}>Accent</Tag>
                      </div>
                      <div style={{ fontSize: '11px', opacity: 0.8 }}>
                        Body: {theme.fontFamily.split(',')[0]}
                      </div>
                      <div style={{ fontSize: '11px', opacity: 0.8 }}>
                        Heading: {theme.headingFont.split(',')[0]}
                      </div>
                      <div style={{ fontSize: '11px', opacity: 0.8 }}>
                        Radius: {theme.borderRadius}px • Shadow: {theme.boxShadow}
                      </div>
                      <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '4px', textAlign: 'center' }}>
                        Click to apply theme
                      </div>
                    </Space>
                  </div>
                } 
              />

            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
