import React, { useEffect, useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { RTCPayload } from '../hooks/useRTC';

type Props = {
  stream: RTCPayload['localStream'];
  playStream: RTCPayload['playStream'],
  closeStream: RTCPayload['closeStream'],
};

function View(props: Props) {
  const { stream, playStream, closeStream } = props;
  const [muted, setMuted] = useState(false);
  const mute = () => {
    stream?.muteVideo();
    setMuted(true);
  };
  const unmute = () => {
    stream?.unmuteVideo();
    setMuted(false);
  };
  const streamId = stream?.getId();
  const htmlId = `stream_${stream}`;
  useEffect(() => {
    streamId && playStream(streamId, htmlId);
    return () => {
      streamId && closeStream(streamId);
    };
  }, [htmlId, streamId, playStream, closeStream]);
  return (
    <>
      <div id={htmlId} style={{ height: 200, width: 300 }} />
      {
        muted ?
          <EyeInvisibleOutlined onClick={unmute} /> :
          <EyeOutlined onClick={mute} />
      }
    </>
  );
}

export default View;