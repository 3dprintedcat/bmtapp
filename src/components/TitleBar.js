import React from 'react';

const TitleBar = ({color, textColor}) => {
  const minimize = () => {
    window.electron.minimize();
  }

  const close = () => {
    window.electron.close();
  }
console.log(textColor)
console.log(color)
  return (
    <div style={{ 
        WebkitAppRegion: 'drag', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: color,
        color: textColor ,
        padding: '10px'
    }}>
      <div >     </div>  {/* Empty div for spacing */}
      <div style={{ color: textColor }}>BMT Services Center</div>  {/* Title in the center */}
      <div style={{ WebkitAppRegion: 'no-drag', display: 'flex' }}> {/* Buttons on the right */}
        {/* <button 
            onClick={minimize} 
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
        >x</button> */}
      </div>
    </div>
  );
}

export default TitleBar;
