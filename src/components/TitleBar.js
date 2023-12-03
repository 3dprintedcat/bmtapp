import React from 'react';

const TitleBar = ({color, textColor, mac, login}) => {
  const minimize = () => {
    window.electron.minimize();
  }
  const maximize = () => {
    window.electron.maximize();
  }

  const close = () => {
    window.electron.close();
  }
   const showOverlay = () => {
    window.electron.showOverlay();
  }
console.log(textColor)
console.log(color)
console.log(login)
  return (
    <div style={{ 
        WebkitAppRegion: 'drag', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: !login ? "#000000" :color,
        color: textColor ,
        padding: '10px',
        zIndex: '100'
    }}>
      {!mac ? (
        <>
      <div >     </div>  {/* Empty div for spacing */}
      <div style={{ color: textColor }}>BMT Services Center</div>  {/* Title in the center */}
      <div style={{ WebkitAppRegion: 'no-drag', display: 'flex' }}> {/* Buttons on the right */}
        <button 
            onClick={showOverlay} 
            style={{ 
                backgroundColor: '#555', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                marginRight: '10px',
                cursor: 'pointer'
            }}
        >Overlay</button>
        <button 
            onClick={minimize} 
            style={{ 
                width: '20px',
                height: '20px',
                backgroundColor: '#555', 
                color: 'white', 
                border: 'none', 
                borderRadius: '50%', 
                marginRight: '10px',
                cursor: 'pointer'
            }}
        >-</button>
        <button 
            onClick={maximize} 
            style={{ 
                width: '20px',
                height: '20px',
                backgroundColor: '#555', 
                color: 'white', 
                border: 'none', 
                borderRadius: '50%', 
                marginRight: '10px',
                cursor: 'pointer'
            }}
        >+</button>
        <button 
            onClick={close} 
            style={{ 
                width: '20px',
                height: '20px',
                backgroundColor: '#f00', 
                color: 'white', 
                border: 'none', 
                borderRadius: '50%', 
                cursor: 'pointer'
            }}
        >x</button>
      </div></>): <div style={{marginBottom:"5px"}}></div>}
    </div>
  );
}

export default TitleBar;
