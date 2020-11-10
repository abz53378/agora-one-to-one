import { Stream } from 'agora-rtc-sdk';
import { useState, useRef } from 'react';
import RTC from '../utils/rtc';


export type RTCPayload = {
  params: RTC['params'],
  join: RTC['join'],
  publish: RTC['publish'],
  unpublish: RTC['unpublish'],
  leave: RTC['leave'],
  playStream: RTC['playStream'],
  closeStream: RTC['closeStream'],
  localStreamId: string,
  remoteStreamIds: Array<string>,
};

export default function useRTC() {
  const [
    localStreamId,
    setLocalStreamId,
  ] = useState<string | number | null>(null);
  const [
    remoteStreamIds,
    setRemoteStreamIds,
  ] = useState<Array<string | number>>([]);
  const onRemoteStreamChanged = (streams: Array<Stream>) => {
    const ids = streams.map(stream => stream.getId());
    setRemoteStreamIds(ids);
  };
  const onLocalStreamChanged = (stream: Stream | null) => {
    setLocalStreamId(stream ? stream.getId() : null);
  };
  const rtc = useRef(new RTC()).current;
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
    localStreamId,
    remoteStreamIds,
  }];
}