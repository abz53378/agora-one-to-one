import AgoraRTC from 'agora-rtc-sdk';


export type DeviceInfo = {
  videos: Array<{
    name: string;
    value: string;
    kind: string;
  }>;
  audios: Array<{
    name: string;
    value: string;
    kind: string;
  }>;
};

export default async function getDevices(): Promise<DeviceInfo> {
  const tempAudioStream = AgoraRTC.createStream({ audio: true, video: false });
  const tempVideoStream = AgoraRTC.createStream({ audio: false, video: true });
  const audioPermissionOK = new Promise(resolve => {
    tempAudioStream.init(() => resolve(null), (e) => resolve(e));
  });
  const videoPermissionOK = new Promise(resolve => {
    tempVideoStream.init(() => resolve(null), (e) => resolve(e));
  });
  await Promise.all([audioPermissionOK, videoPermissionOK]).then(res => {
    if (res[0] !== null) {
      console.warn('create audio temp stream failed!', res[0]);
    }
    if (res[1] !== null) {
      console.warn('create video temp stream failed!', res[0]);
    }
  });
  tempAudioStream.close();
  tempVideoStream.close();
  return new Promise((resolve, reject) => {
    AgoraRTC.getDevices(items => {
      console.log(items);
      const videos = [];
      const audios = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'videoinput') {
          let name = item.label;
          const value = item.deviceId;
          if (!name) {
            name = `camera-${videos.length}`;
          }
          videos.push({
            name,
            value,
            kind: item.kind,
          });
        }
        if (item.kind === 'audioinput') {
          let name = item.label;
          const value = item.deviceId;
          if (!name) {
            name = `microphone-${audios.length}`;
          }
          audios.push({
            name,
            value,
            kind: item.kind,
          });
        }
      }
      resolve({ videos, audios });
    });
  });

}
