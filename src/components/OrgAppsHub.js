import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Col, Row, Grid, Image, Tag } from "antd";
import { Content } from "antd/es/layout/layout";
import MainTradingPage from "../shared/mainTradingPage";
import { CreateService } from "./CreateService";
import Meta from 'antd/es/card/Meta';

const { useBreakpoint } = Grid;

const OrgAppHub = () => {
    const [apps, setApps] = useState([]);
    const [activeApp, setActiveApp] = useState();
    const screenSize = useBreakpoint();

    useEffect(() => {
        axios.get('https://bmtsc.org/api/apps/index.php')
            .then(response => {
                setApps(response.data);
                console.log(response.data);
                setActiveApp(<ActiveApp apps={response.data} screenSize={screenSize} onClick={onClick} />);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [screenSize]);

    function onClick(name) {
        if (name !== "add" && name !== "home") {
            setActiveApp(<><Tag color={"green"} style={{marginBottom:"1em", cursor: "pointer"}} onClick={() => onClick("home")}>Home</Tag><iframe src={name} width="100%" height="100%"></iframe></>);
        } else {
            setActiveApp(<ActiveApp apps={apps} screenSize={screenSize} onClick={onClick} />);
        }
        if (name === "add") {
            setActiveApp(<><Tag color={"green"} style={{marginBottom:"1em", cursor: "pointer"}}onClick={() => {onClick("home")}}>Home</Tag><CreateService/></>);
        }
    }

    return (
        <Content
            style={{
                overflow: "auto",
                padding: screenSize.xs ? 16 : 16,
                height: '100%'
            }}
        >
            {activeApp}
        </Content>
    );
}

const ActiveApp = ({ apps, onClick, screenSize }) => (
    <Row gutter={[8,8]}>
        {console.log("test")}
        {apps.map((app, index) => (
            <Col key={index} span={screenSize.xs ? 24 : 6}>
                <Card hoverable onClick={() => onClick(app.url)} cover={<Image
                    preview={false}
                    alt="example"
                    src={app.image}
                    style={{width: "100%"}}
                    fallback='\logo192.png'
                />}>
                    <Meta
                        title={app.name}
                        description={app.description}
                    />
                </Card>
            </Col>
        ))}
        <Col span={screenSize.xs ? 24 : 6}>
            <Card hoverable style={{}} onClick={() => onClick("add")} cover={<Image
                preview={false}
                id="test"
                alt="example"
                src='\placeHolder.png'
                style={{width: "100%"}}
                fallback='\logo192.png'
            />}>
                <Meta title={"Add New Org Service"} />
            </Card>
        </Col>
    </Row>
);

export default OrgAppHub;
