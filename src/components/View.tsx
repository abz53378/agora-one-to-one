import React, { useEffect } from 'react';
import { RTCPayload } from '../hooks/useRTC';

type Props = {
  streamId: string | number | null;
  playStream: RTCPayload['playStream'],
  closeStream: RTCPayload['closeStream'],
};

function View(props: Props) {
  const { streamId, playStream, closeStream } = props;
  const htmlId = `stream_${streamId}`;
  useEffect(() => {
    streamId && playStream(streamId, htmlId);
    return () => {
      streamId && closeStream(streamId);
    };
  }, [htmlId, streamId, playStream, closeStream]);
  return (
    <div id={htmlId} style={{ height: 200, width: 300 }} />
  );
}

export default View;