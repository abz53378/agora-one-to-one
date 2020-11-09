import React from 'react';
import { Form, Input, Select, Radio } from 'antd';
import useDevices from '../hooks/useDevices';

type Props = {};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const resolutions = [
  {
    name: 'default',
    value: 'default',
  },
  {
    name: '480p',
    value: '480p',
  },
  {
    name: '720p',
    value: '720p',
  },
  {
    name: '1080p',
    value: '1080p',
  },
];

const modes = ['live', 'rtc'];
const codecs = ['h264', 'vp8'];


function AdvancedSettingForm(props: Props) {
  const { devices } = useDevices();
  return (
    <Form {...layout}>
      <Form.Item label="UID" name="uid">
        <Input />
      </Form.Item>
      <Form.Item label="CAMERA" name="camera">
        <Select>
          {devices.videos.map(video => (
            <Select.Option key={video.value} value={video.value}>
              {video.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="MICROPHONE" name="microphone">
        <Select>
          {devices.audios.map(audio => (
            <Select.Option key={audio.value} value={audio.value}>
              {audio.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="CAMERA RESOLUTION" name="cameraResolution">
        <Select>
          {resolutions.map(resolution => (
            <Select.Option key={resolution.value} value={resolution.value}>
              {resolution.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="MODE" name="mode">
        <Radio.Group>
          {modes.map(mode => (
            <Radio value={mode} key={mode}>
              {mode}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item label="CODEC" name="codec">
        <Radio.Group>
          {codecs.map(codec => (
            <Radio value={codec} key={codec}>
              {codec}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </Form>
  );
}

export default AdvancedSettingForm;