import React from 'react';
import ReactDOM from 'react-dom';
import Overlay from './OverlayComp';
import { ConfigProvider } from 'antd';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider
        theme={{
          token: {
            // Set the theme colors using state
            colorPrimary:'#7FB069',
            colorBgBase:'#282c34',
            borderRadius:"8px",
            colorTextBase:'#cccccc',
            colorInfo:"#6CA6C1",
            colorError:"#EF767A",
            colorSuccess:'#7FB069',
            colorWarning:'#EDAE49'
          },
        }}
      >
    <Overlay />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
