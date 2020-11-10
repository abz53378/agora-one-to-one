import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import Setting from './components/Setting';
import useRTC from './hooks/useRTC';
import View from './components/View';
import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  const [{
    join,
    publish,
    leave,
    unpublish,
    localStreamId,
    remoteStreamIds,
    playStream,
    closeStream,
  }] = useRTC();

  return (
    <Layout className="layout">
      <Header className="header">
        Basic Communication
      </Header>
      <Content>
        <Row>
          <Col span={12}>
            <Setting
              join={join}
              publish={publish}
              leave={leave}
              unpublish={unpublish}
            />
          </Col>
          <Col span={12}>
            {
              [localStreamId, ...remoteStreamIds].map(id => (
                <View
                  key={id}
                  streamId={id}
                  playStream={playStream}
                  closeStream={closeStream}
                />
              ))
            }

          </Col>
        </Row>

      </Content>
      <Footer>Created by Leo</Footer>
    </Layout>
  );
}

export default App;
