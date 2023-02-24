import './App.css';
import { ConfigProvider,theme,Grid } from 'antd';
import Loading from './shared/loading';

const { useBreakpoint } = Grid;

const { useToken } = theme;
function App() {
  let screenSize = useBreakpoint();
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
       <sub style={{fontSize:screenSize.xs ? "25px": ""}}>app development in progress</sub>
      </header>
    </div>      
      </ConfigProvider>
  );
}
export default App;
