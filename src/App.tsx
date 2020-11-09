import React from 'react';
import { Layout } from 'antd';
import BasicSetting from './components/BasicSetting';
import AdvancedSetting from './components/AdvancedSetting';

import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header className="header">
        Basic Communication
      </Header>
      <Content>
        <BasicSetting />
        <AdvancedSetting />
      </Content>
      <Footer>Created by Leo</Footer>
    </Layout>
  );
}

export default App;
