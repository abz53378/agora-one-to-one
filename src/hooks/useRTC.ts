import { Stream } from 'agora-rtc-sdk';
import { useState, useRef } from 'react';
import { message } from 'antd';
import RTC from '../utils/rtc';


export type RTCPayload = {
  params: RTC['params'],
  join: RTC['join'],
  publish: RTC['publish'],
  unpublish: RTC['unpublish'],
  leave: RTC['leave'],
  playStream: RTC['playStream'],
  closeStream: RTC['closeStream'],
  localStream: Stream | null,
  remoteStreams: Array<Stream>,
};

export default function useRTC() {
  const [
    localStream,
    setLocalStream,
  ] = useState<Stream | null>(null);
  const [
    remoteStreams,
    setRemoteStreams,
  ] = useState<Array<Stream>>([]);
  const onRemoteStreamChanged = (streams: Array<Stream>) => {
    setRemoteStreams(streams);
  };
  const onLocalStreamChanged = (stream: Stream | null) => {
    setLocalStream(stream);
  };
  const rtc = useRef(new RTC({
    messageHandler: message,
  })).current;
  rtc.onRemoteStreamChanged = onRemoteStreamChanged;
  rtc.onLocalStreamChanged = onLocalStreamChanged;
  return [{
    params: rtc.params,
    join: rtc.join,
    publish: rtc.publish,
    unpublish: rtc.unpublish,
    leave: rtc.leave,
    playStream: rtc.playStream,
    closeStream: rtc.closeStream,
    localStream,
    remoteStreams,
  }];
}