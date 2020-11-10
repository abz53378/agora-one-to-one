import React from 'react';
import { Form, Input, Select, Radio } from 'antd';
import useDevices from '../hooks/useDevices';

type Props = {};

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
  const { devices, loading } = useDevices();
  if (loading) return null;
  return (
    <>
      <Form.Item label="UID" name="uid">
        <Input />
      </Form.Item>
      <Form.Item label="CAMERA" name="cameraId" initialValue={devices.videos[0]?.value}>
        <Select>
          {devices.videos.map(video => (
            <Select.Option
              key={video.value}
              value={video.value}
            >
              {video.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="MICROPHONE" name="microphoneId" initialValue={devices.audios[0]?.value}>
        <Select>
          {devices.audios.map(audio => (
            <Select.Option key={audio.value} value={audio.value}>
              {audio.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="CAMERA RESOLUTION" name="cameraResolution" initialValue={resolutions[0].value}>
        <Select>
          {resolutions.map(resolution => (
            <Select.Option key={resolution.value} value={resolution.value}>
              {resolution.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="MODE" name="mode" initialValue={modes[0]}>
        <Radio.Group>
          {modes.map(mode => (
            <Radio value={mode} key={mode}>
              {mode}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item label="CODEC" name="codec" initialValue={codecs[0]}>
        <Radio.Group>
          {codecs.map(codec => (
            <Radio value={codec} key={codec}>
              {codec}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </>
  );
}

export default AdvancedSettingForm;