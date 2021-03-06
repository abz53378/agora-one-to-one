import React from 'react';
import { Card, Collapse, Form } from 'antd';
import BasicSettingForm from './BasicSettingForm';
import AdvancedSettingForm from './AdvancedSettingForm';
import { RTCPayload } from '../hooks/useRTC';

const { Panel } = Collapse;

type Props = {
  join: RTCPayload['join'];
  publish: RTCPayload['publish'];
  leave: RTCPayload['leave'];
  unpublish: RTCPayload['unpublish'];
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function Setting(props: Props) {
  const { join, publish, leave, unpublish } = props;
  const onFinish = (values: RTCPayload['params']) => {
    join(values).catch(console.log);
  };
  return (
    <Card bordered style={{ margin: 24 }}>
      <Form {...layout} onFinish={onFinish}>
        <BasicSettingForm
          onLeave={() => leave().catch(console.log)}
          onPublish={() => publish().catch(console.log)}
          onUnpublish={() => unpublish().catch(console.log)}
        />
        <Collapse style={{}}>
          <Panel forceRender key="advancedSetting" header="Advanced Setting">
            <AdvancedSettingForm />
          </Panel>
        </Collapse>
      </Form>
    </Card>
  );
}