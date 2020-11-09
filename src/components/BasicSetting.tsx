import React from 'react';
import { Card } from 'antd';
import BasicSettingForm from './BasicSettingForm';

type Props = {

};

export default function BasicSetting(props: Props) {
  return (
    <Card bordered style={{ width: 600, margin: 24 }}>
      <BasicSettingForm />
    </Card>
  );
}