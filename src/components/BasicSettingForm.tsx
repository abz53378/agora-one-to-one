import React from 'react';
import { Form, Input, Button, Switch } from 'antd';

type Props = {
  onLeave: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
};



function BasicSettingForm(props: Props) {
  const {
    onLeave,
    onPublish,
    onUnpublish,
  } = props;
  return (
    <>
      <Form.Item label="ID" name="appId">
        <Input />
      </Form.Item>
      <Form.Item label="Channel" name="channel">
        <Input />
      </Form.Item>
      <Form.Item label="Token" name="token">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button.Group>
          <Button type="primary" htmlType="submit">
            JOIN
          </Button>
          <Button type="primary" onClick={() => onLeave()}>
            LEAVE
          </Button>
          <Button type="primary" onClick={() => onPublish()}>
            PUBLISH
          </Button>
          <Button type="primary" onClick={() => onUnpublish()}>
            UNPUBLISH
          </Button>
        </Button.Group>
      </Form.Item>
      <Form.Item label="Show Profile">
        <Switch />
      </Form.Item>
    </>
  );
}

export default BasicSettingForm;