import { Form, Input, DatePicker, TimePicker, Select, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const CreateEventForm = () => {
  const onFinish = (values) => {
    axios.post('http://localhost:3000/events/',JSON.stringify(values))
      .then((response) => {
        console.log(values);
        console.log(response.data);
        //window.location.reload();
      })
      .catch((error) => {
        message.error('Failed to create event');
        console.error(error);
      });
  };

  return (
    <Form
      name="create-event"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Event Title"
        name="title"
        rules={[
          { required: true, message: 'Please enter event title' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Event Date"
        name="date"
        rules={[
          { required: true, message: 'Please select event date' }
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Event Time"
        name="time"
        rules={[
          { required: true, message: 'Please select event time' }
        ]}
      >
        <TimePicker />
      </Form.Item>

      <Form.Item
        label="Event Location"
        name="location"
        rules={[
          { required: true, message: 'Please enter event location' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Equipment Required"
        name="equipment"
      >
        <Input.TextArea placeholder="List equipment required for the event" />
      </Form.Item>

      <Form.Item
        label="Roles"
        name="roles"
      >
        <Select mode="multiple" placeholder="Select roles for the event">
          <Option value="Pilot">Pilot</Option>
          <Option value="Gunner">Gunner</Option>
          <Option value="Engineer">Engineer</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          Create Event
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateEventForm;
