import React from 'react';
import { Form, Input, Button, Switch } from 'antd';

type Props = {};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function BasicSettingForm(props: Props) {
  return (
    <Form {...layout}>
      <Form.Item label="ID" name="appId">
        <Input />
      </Form.Item>
      <Form.Item label="Channel" name="channel">
        <Input />
      </Form.Item>
      <Form.Item label="Token" name="token">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button.Group>
          <Button type="primary">
            JOIN
          </Button>
          <Button type="primary">
            LEAVE
          </Button>
          <Button type="primary">
            PUBLISH
          </Button>
          <Button type="primary">
            UNPUBLISH
          </Button>
        </Button.Group>
      </Form.Item>
      <Form.Item label="Show Profile">
        <Switch />
      </Form.Item>
    </Form>
  );
}

export default BasicSettingForm;