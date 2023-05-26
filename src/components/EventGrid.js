import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Content } from 'antd/es/layout/layout';
import CreateEventForm from './CreateEvent';

const EventGrid = () => {
  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Load events from API when component mounts
  useEffect(() => {
    axios.get('https:/bmtsc.org/api/events/index.php')
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));
  }, []);

  // Show modal when card is clicked
  const handleCardClick = (event) => {
    setSelectedEvent(event);
    setVisible(true);
  }
const [isModalOpen, setIsModalOpen] = useState(false);
  const showCreateModal = () => {
    setIsModalOpen(true);
  };
  const handleCreateCancel = () => {
    setIsModalOpen(false);
  };

  // Hide modal when cancel button is clicked
  const handleCancel = () => {
    setSelectedEvent(null);
    setVisible(false);
  }

  // Accept event when confirm button is clicked
  const handleConfirm = () => {
    axios.put(`/api/events/${selectedEvent.id}`, { accepted: true })
      .then(res => {
        // Update events array to reflect accepted event
        setEvents(events.map(e => e.id === selectedEvent.id ? { ...e, accepted: true } : e));
        setSelectedEvent(null);
        setVisible(false);
      })
      .catch(err => console.log(err));
  }

  return (
    <Content  style={{
        overflow:"auto",
        padding: 16,
        height:'100%'
        
    }}>
        <Modal open={isModalOpen} onCancel={handleCreateCancel}> <CreateEventForm/> </Modal>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {events.map(event => (
        <Card
          key={event.id}
          title={event.title}
          style={{ width: 300 }}
          extra={event.accepted ? <Button type="primary">Accepted</Button> : <Button onClick={() => handleCardClick(event)}>Accept</Button>}
        >
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>
          {event.equipment && <p><strong>Equipment:</strong> {event.equipment}</p>}
          {event.roles && <p><strong>Roles:</strong> {event.roles}</p>}
        </Card>
      ))}
      {selectedEvent && (
        <Modal
          title={selectedEvent.title}
          onCancel={handleCancel}
          open={visible}
          footer={[
            <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
            <Button key="confirm" type="primary" onClick={handleConfirm}>Confirm</Button>,
          ]}
        >
          <p><strong>Date:</strong> {selectedEvent.date}</p>
          <p><strong>Time:</strong> {selectedEvent.time}</p>
          <p><strong>Location:</strong> {selectedEvent.location}</p>
          {selectedEvent.equipment && <p><strong>Equipment:</strong> {selectedEvent.equipment}</p>}
          {selectedEvent.roles && <p><strong>Roles:</strong> {selectedEvent.roles}</p>}
        </Modal>
      )}
    </div>
    <FloatButton onClick={() => showCreateModal()} icon={<PlusOutlined />}
      type="primary"
      style={{
        right: 24,
      }} />
    </Content>
  );
};

export default EventGrid;
