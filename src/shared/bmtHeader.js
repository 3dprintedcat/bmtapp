import {theme,Grid} from 'antd';

const { useBreakpoint } = Grid;
const { useToken } = theme;

const BMTHeader = () =>{
    let screenSize = useBreakpoint();
    const { token } = useToken();
    return(
    <header className="App-header" style={screenSize.xs ? {backgroundColor:token.colorPrimary, height:"7vh", position:"sticky", top:0,zIndex:"2"}:{backgroundColor:token.colorPrimary, height:"7vh", position:"sticky", top:0,zIndex:"2"}}>
        <img src="/logo192.png" style={screenSize.xs ? {height:"6vh",float:"left", marginLeft:"1%",marginTop:"1%"} : {height:"5vh",float:"left", marginTop:"1vh", marginLeft:"0.5em"}}></img>
      </header>);
};
export default BMTHeader;