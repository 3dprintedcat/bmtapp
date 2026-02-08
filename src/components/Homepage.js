import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Grid, Statistic, Button, Spin, message, Space, Empty, Modal, Switch, List, theme } from 'antd';
import { 
  ShoppingOutlined, 
  CalendarOutlined, 
  TeamOutlined, 
  DashboardOutlined,
  SettingOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';

const { useBreakpoint } = Grid;
const { useToken } = theme;

/**
 * Homepage Component - Customizable dashboard for logged-in users
 * Displays configurable widgets based on user preferences
 */
const Homepage = () => {
  const screenSize = useBreakpoint();
  const navigate = useNavigate();
  const { token } = useToken();
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState(null);
  const [customizeModalOpen, setCustomizeModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalItems: 0,
    upcomingEvents: 0,
    orgMembers: 0,
    activeServices: 0
  });

  // Fetch user's homepage configuration
  useEffect(() => {
    loadHomepageConfig();
    loadUserStats();
  }, []);

  const loadHomepageConfig = async () => {
    try {
      const userHandle = sessionStorage.getItem('User');
      
      // If user is not logged in, just use default config
      if (!userHandle) {
        console.log('No user logged in, using default config');
        setConfig(getDefaultConfig());
        setLoading(false);
        return;
      }
      
      const response = await axios.get(`http://localhost:3000/homepage/config/`, {
        params: { playerTag: userHandle }
      });
      
      console.log('Homepage config loaded:', response.data);
      setConfig(response.data.data || getDefaultConfig());
      setLoading(false);
    } catch (error) {
      console.error('Error loading homepage config:', error);
      // Use default config if user hasn't set one yet
      setConfig(getDefaultConfig());
      setLoading(false);
    }
  };

  const loadUserStats = async () => {
    try {
      // Load aggregated stats from various endpoints
      const [itemsRes, eventsRes] = await Promise.all([
        axios.get('http://localhost:3000/items/').catch(() => ({ data: [] })),
        axios.get('http://localhost:3000/events/').catch(() => ({ data: [] }))
      ]);

      const items = Array.isArray(itemsRes?.data) ? itemsRes.data : (itemsRes?.data?.data || []);
      const events = Array.isArray(eventsRes?.data) ? eventsRes.data : (eventsRes?.data?.data || []);

      setStats({
        totalItems: items.length,
        upcomingEvents: events.filter(e => !e.accepted).length,
        orgMembers: 42, // Placeholder
        activeServices: 12 // Placeholder
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const getDefaultConfig = () => ({
    widgets: [
      { id: 'welcome', type: 'welcome', enabled: true, order: 1 },
      { id: 'stats', type: 'stats', enabled: true, order: 2 },
      { id: 'quickLinks', type: 'quickLinks', enabled: true, order: 3 },
      { id: 'recentActivity', type: 'recentActivity', enabled: true, order: 4 }
    ],
    layout: 'grid', // grid or list
    theme: 'default'
  });

  const saveHomepageConfig = async (newConfig) => {
    try {
      const userHandle = sessionStorage.getItem('User');
      
      // If user is not logged in, just update local config
      if (!userHandle) {
        setConfig(newConfig);
        message.info('Homepage updated (login to save permanently)');
        return;
      }
      
      await axios.post('http://localhost:3000/homepage/config/', {
        playerTag: userHandle,
        config: newConfig
      });
      message.success('Homepage configuration saved');
      setConfig(newConfig);
    } catch (error) {
      console.error('Error saving config:', error);
      message.error('Failed to save configuration');
    }
  };

  const toggleWidget = (widgetId) => {
    const newConfig = {
      ...config,
      widgets: config.widgets.map(w => 
        w.id === widgetId ? { ...w, enabled: !w.enabled } : w
      )
    };
    saveHomepageConfig(newConfig);
  };

  const refreshData = () => {
    setLoading(true);
    loadHomepageConfig();
    loadUserStats();
  };

  if (loading) {
    return (
      <Content style={{ padding: 24, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </Content>
    );
  }

  const enabledWidgets = config?.widgets?.filter(w => w.enabled).sort((a, b) => a.order - b.order) || [];

  return (
    <Content style={{ padding: screenSize.xs ? 16 : 24, overflow: 'auto', height: '100%' }}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, color: token.colorTextBase }}>Dashboard</h1>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={refreshData}>
            Refresh
          </Button>
          <Button icon={<SettingOutlined />} onClick={() => setCustomizeModalOpen(true)}>
            Customize Widgets
          </Button>
        </Space>
      </div>

      {/* Widget Customization Modal */}
      <Modal
        title="Customize Dashboard"
        open={customizeModalOpen}
        onCancel={() => setCustomizeModalOpen(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setCustomizeModalOpen(false)}>
            Done
          </Button>
        ]}
      >
        <p style={{ marginBottom: 16, opacity: 0.7 }}>
          Toggle widgets on or off to customize your dashboard.
        </p>
        <List
          dataSource={config?.widgets || []}
          renderItem={(widget) => (
            <List.Item
              actions={[
                <Switch
                  checked={widget.enabled}
                  onChange={() => toggleWidget(widget.id)}
                />
              ]}
            >
              <List.Item.Meta
                title={getWidgetDisplayName(widget.type)}
                description={getWidgetDescription(widget.type)}
              />
            </List.Item>
          )}
        />
      </Modal>

      <Row gutter={[16, 16]}>
        {enabledWidgets.map(widget => {
          switch (widget.type) {
            case 'welcome':
              return (
                <Col xs={24} key={widget.id}>
                  <WelcomeWidget token={token} />
                </Col>
              );
            case 'stats':
              return (
                <Col xs={24} key={widget.id}>
                  <StatsWidget stats={stats} navigate={navigate} />
                </Col>
              );
            case 'quickLinks':
              return (
                <Col xs={24} md={12} key={widget.id}>
                  <QuickLinksWidget navigate={navigate} />
                </Col>
              );
            case 'recentActivity':
              return (
                <Col xs={24} md={12} key={widget.id}>
                  <RecentActivityWidget />
                </Col>
              );
            default:
              return null;
          }
        })}

        {enabledWidgets.length === 0 && (
          <Col xs={24}>
            <Card>
              <Empty description="No widgets enabled. Click customize to add widgets." />
            </Card>
          </Col>
        )}
      </Row>
    </Content>
  );
};

// Helper functions for widget display
const getWidgetDisplayName = (type) => {
  const names = {
    welcome: 'Welcome Message',
    stats: 'Quick Statistics',
    quickLinks: 'Quick Links',
    recentActivity: 'Recent Activity'
  };
  return names[type] || type;
};

const getWidgetDescription = (type) => {
  const descriptions = {
    welcome: 'Personalized greeting with your username',
    stats: 'Overview of items, events, and org stats',
    quickLinks: 'Fast navigation to key sections',
    recentActivity: 'Recent activity feed'
  };
  return descriptions[type] || '';
};

// Welcome Widget
const WelcomeWidget = ({ token }) => {
  const userHandle = sessionStorage.getItem('User') || 'Citizen';
  
  return (
    <Card>
      <div style={{ padding: '20px 0' }}>
        <h2 style={{ margin: 0, color: token.colorTextBase }}>Welcome back, {userHandle}!</h2>
        <p style={{ margin: '8px 0 0 0', opacity: 0.7 }}>
          Ready for another day in the verse?
        </p>
      </div>
    </Card>
  );
};

// Stats Widget
const StatsWidget = ({ stats, navigate }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={12} sm={6}>
        <Card hoverable onClick={() => navigate('/Market')}>
          <Statistic
            title="Market Items"
            value={stats.totalItems}
            prefix={<ShoppingOutlined />}
          />
        </Card>
      </Col>
      <Col xs={12} sm={6}>
        <Card hoverable onClick={() => navigate('/Events')}>
          <Statistic
            title="Upcoming Events"
            value={stats.upcomingEvents}
            prefix={<CalendarOutlined />}
          />
        </Card>
      </Col>
      <Col xs={12} sm={6}>
        <Card hoverable>
          <Statistic
            title="Org Members"
            value={stats.orgMembers}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>
      <Col xs={12} sm={6}>
        <Card hoverable onClick={() => navigate('/Services')}>
          <Statistic
            title="Active Services"
            value={stats.activeServices}
            prefix={<DashboardOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};

// Quick Links Widget
const QuickLinksWidget = ({ navigate }) => {
  const quickLinks = [
    { title: 'View Market', icon: <ShoppingOutlined />, path: '/Market', color: '#1890ff' },
    { title: 'Browse Events', icon: <CalendarOutlined />, path: '/Events', color: '#52c41a' },
    { title: 'Org Services', icon: <DashboardOutlined />, path: '/Services', color: '#faad14' },
    { title: 'Org Map', icon: <TeamOutlined />, path: '/OrgMap', color: '#eb2f96' },
  ];

  return (
    <Card title="Quick Links">
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        {quickLinks.map((link, index) => (
          <Button
            key={index}
            type="text"
            icon={link.icon}
            onClick={() => navigate(link.path)}
            style={{ width: '100%', textAlign: 'left', height: 'auto', padding: '12px 16px' }}
          >
            <span style={{ marginLeft: 8 }}>{link.title}</span>
          </Button>
        ))}
      </Space>
    </Card>
  );
};

// Recent Activity Widget
const RecentActivityWidget = () => {
  return (
    <Card title="Recent Activity">
      <Empty description="No recent activity" style={{ margin: '40px 0' }} />
    </Card>
  );
};

export default Homepage;
