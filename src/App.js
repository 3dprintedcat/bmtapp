import './App.css';
import { ConfigProvider,theme } from 'antd';
import Loading from './shared/loading';

const { useToken } = theme;
function App() {
  
  const { token } = useToken();
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary:'#7FB069',
      },
    }}>
    <div className="App">
      <header className="App-header">
       <Loading theme={token.colorPrimary}/>
       <sub>app development in progress</sub>
      </header>
    </div>      
      </ConfigProvider>
  );
}
export default App;
