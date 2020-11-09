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
  return new Promise((resolve, reject) => {
    AgoraRTC.getDevices(items => {
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
