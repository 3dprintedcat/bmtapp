import {
  Layout,
  Card,
  Row,
  Col,
  Avatar,
  message,
  TreeSelect,
  Image,
  Space,
  Grid,
  Typography,
  Statistic,
  Progress,
} from 'antd';
import React,{ useEffect, useState } from 'react';
import { GetBodies, GetSystems } from '../services';
import Meta from 'antd/es/card/Meta';
const { Content } = Layout;
const { useBreakpoint } = Grid;

function getItem(value, title, children) {
  return {
    value,
    title,
    children,
  };
}

const OrgMap = () => {

  let screenSize = useBreakpoint();
  const [loading, setLoading] = useState(true);
  const [system, setSystem] = useState();
  const [items, setItems] = useState();
  const [setCollapsed] = useState(screenSize.xs ? true : false);
  const [value, setValue] = useState();
  
  const onChange = (newValue) => {
    setValue(newValue);
    
    console.log(newValue)
    GetBodies(newValue).then((res) => {
      
      setLoading(true);
      setSystem(res?.data.data);
      console.log(res?.data.data);
    }).finally(() => {
      setLoading(false);
    }).catch((err) => {
      console.log("star system issue")
      message.error("Error" + String(err));
    });
  }

  var arr = []
  var flag = true;
  
  useEffect(() => {
    if (flag) {
      flag=false;
      GetSystems()
      .then((res) => {
        let data = res?.data;
        data?.data?.forEach(element => {
          arr.push(getItem(element.name.toUpperCase(), element.name));
        });
      })
      .finally(() => {
        setItems(arr);
        setLoading(false);
      }).catch((err) => {
        message.error("Error" + String(err));
      })
    }
  }, []);
  const habitablePercent = (innerHZ, outerHZ, frostLine) => {console.log((frostLine - innerHZ) / (outerHZ - innerHZ) * 10); return (frostLine - innerHZ) / (outerHZ - innerHZ) * 10}
  
  return (
    <Content
      style={{
        overflow: "auto",
        margin: screenSize.xs ? '8px 8px' : '8px 8px',
        padding: screenSize.xs ? 2 : 16,
        height: '100%'
      }}
    >
      <Row gutter={[8,8]}>
        <Col span={screenSize.xs ? 24 : 8}>
          <Card title="Star System" loading={loading}>
            <Space direction="vertical" size="large">
              <TreeSelect
                showSearch
                size="large"
                style={{ width: '100%' }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                onChange={onChange}
                treeData={items}
              />
              <Meta description={system?.description} />
              <div style={{ marginTop: '16px' }}>
                {system?.name && <Statistic title="Star System Name" value={system?.name} />}
                {system?.distance && <Statistic title="Distance (ly)" value={system?.distance} />}
                {system?.population && <Statistic title="Population" value={system?.population} />}
                {system?.allegiance && <Statistic title="Allegiance" value={system?.allegiance} />}
                {system?.government && <Statistic title="Government" value={system?.government} />}
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={screenSize.xs ? 24 : 8}> <Card title="Celestial Objects" loading={loading}>
            {system?.celestial_objects?.map((body) => (
              <Card.Grid key={body.id}>
                <Avatar size={64} src={<Image src={body.texture?.images?.product_thumb_large} />} />
                <Meta title={body.name} description={body.description} />
              </Card.Grid>
            ))}
          </Card>
        </Col>
        <Col span={screenSize.xs ? 24 : 8}>
  <Card title="Habitable Zone">
    <div>
      <p>Inner: {system?.habitable_zone_inner}</p>
      <p>Outer: {system?.habitable_zone_outer}</p>
      <Progress type="circle" percent={habitablePercent(system?.habitable_zone_inner,system?.habitable_zone_outer,system?.frost_line)} showInfo={false} status="active" />
    </div>
  </Card>
</Col>
      </Row>
    </Content>
  );
};
export default OrgMap;
