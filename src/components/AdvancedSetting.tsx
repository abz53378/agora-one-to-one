import React from 'react';
import { Collapse } from 'antd';
import AdvancedSettingForm from './AdvancedSettingForm';

type Props = {

};

const { Panel } = Collapse;

function AdvancedSetting(props: Props) {
  return (
    <Collapse style={{ width: 600, margin: 24 }}>
      <Panel key="advancedSetting" header="Advanced Setting">
        <AdvancedSettingForm />
      </Panel>
    </Collapse>
  );
}

export default AdvancedSetting;