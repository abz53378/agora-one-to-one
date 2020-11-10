import AgoraRTC, { Client, ClientConfig, Stream } from 'agora-rtc-sdk';
import { isDeleteExpression } from 'typescript';

export type Params = {
  mode: ClientConfig['mode'];
  codec: ClientConfig['codec'];
  uid: string | number;
  appId: string;
  microphoneId: string;
  cameraId: string;
  token: string;
  channel: string;
};

type OnRemoteStreamChanged = (streams: Stream[]) => void;
type OnLocalStreamChanged = (localStream: Stream | null) => void;

export default class RTC {
  public client: Client | null = null;

  public joined = false;

  public published = false;

  public localStream: Stream | null = null;

  public remoteStreams: Stream[] = [];

  public params: Params = {
    mode: 'live',
    codec: 'h264',
    uid: '',
    appId: '',
    microphoneId: '',
    cameraId: '',
    token: '',
    channel: '',
  };

  constructor() {
    console.log(`agora sdk version: ${AgoraRTC.VERSION} compatible: ${AgoraRTC.checkSystemRequirements()}`);
  }

  public onRemoteStreamChanged: OnRemoteStreamChanged = streams =>
    console.log(streams);

  public onLocalStreamChanged: OnLocalStreamChanged = stream =>
    console.log(stream);

  public playStream = (streamId: string | number, htmlId: string) => {
    if (this.localStream?.getId() === streamId) {

      this.localStream.play(htmlId);
      return;
    }

    const stream = this.remoteStreams
      .find(st => st.getId() === streamId);
    if (stream) {
      stream?.play(htmlId);
    }

  };

  public closeStream = (streamId: string | number) => {
    let stream;

    if (this.localStream?.getId() === streamId) {
      stream = this.localStream;
    } else {
      stream = this.remoteStreams
        .find(st => st.getId() === streamId);
    }

    if (stream) {
      if (stream.isPlaying()) stream.stop();
      stream?.close();
    }
  };

  public initClient = async (params: Params) => {
    this.params = params;
    this.client = AgoraRTC.createClient({
      mode: params.mode, codec: params.codec,
    });
    this.handleEvents();
    return new Promise((resolve, reject) => {
      this.client?.init(params.appId, () => {
        resolve();
      }, e => {
        reject(e);
      });
    });
  };

  public initStream = async () => {
    // create local stream
    const { uid, microphoneId, cameraId } = this.params;
    this.localStream = AgoraRTC.createStream({
      streamID: uid,
      audio: true,
      video: true,
      screen: false,
      microphoneId,
      cameraId,
    });

    return new Promise((resolve, reject) => {
      // initialize local stream. Callback function executed after intitialization is done
      this.localStream?.init(() => {
        console.log('init local stream success');
        this.onLocalStreamChanged(this.localStream!);
        // play stream with html element id "local_stream"
        resolve();
      }, (err) => {
        reject(err);
        console.error('init local stream failed ', err);
      });
    });
  };



  public join = async (params: Params) => {
    if (!this.client) {
      await this.initClient({ ...params });
    }
    return new Promise((resolve, reject) => {
      if (this.joined) {
        return reject(new Error('You\'r already joined'));
      }
      return this.client?.join(
        params.token ? params.token : null,
        params.channel,
        params.uid ? +params.uid : null,
        async uid => {
          console.log(`join channel: ${params.channel} success, uid: ${uid}`);
          this.joined = true;
          this.params.uid = uid;
          await this.initStream();
          resolve();
        }, err => {
          reject(err);
        },
      );
    });

  };


  public publish = async () => {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        return reject(new Error('Please Join Room First'));
      }
      if (this.published) {
        return reject(new Error('Your already published'));
      }
      const oldState = this.published;

      // publish localStream
      this.client?.publish(this.localStream!, err => {
        this.published = oldState;
        reject(new Error(`publish failed:${err}`));
      });
      this.published = true;
      return resolve();
    });
  };


  public unpublish = async () => {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        reject(new Error('Please Join Room First'));
        return;
      }
      if (!this.published) {
        reject(new Error('Your didn\'t publish'));
        return;
      }
      const oldState = this.published;
      this.client?.unpublish(this.localStream!, err => {
        this.published = oldState;
        reject(new Error(`unpublish failed: ${err}`));
      });
      this.published = false;
      resolve();
    });
  };

  public leave = async () => {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        reject(new Error('Please Join Room First'));
        return;
      }
      if (!this.joined) {
        reject(new Error('You are not in channel'));
        return;
      }
      this.client.leave(() => {
        // stop stream
        if (this.localStream?.isPlaying()) {
          this.localStream.stop();
        }
        // close stream
        this.localStream?.close();
        const ids = [];
        for (let i = 0; i < this.remoteStreams.length; i++) {
          const stream = this.remoteStreams.shift();
          const id = stream?.getId();
          ids.push(id);

          if (stream?.isPlaying()) {
            stream.stop();
          }
        }
        this.localStream = null;
        this.remoteStreams = [];
        this.onLocalStreamChanged(this.localStream);
        this.onRemoteStreamChanged(this.remoteStreams);
        this.client = null;
        console.log('client leaves channel success');
        this.published = false;
        this.joined = false;
        resolve(isDeleteExpression);
      }, err => {
        reject(new Error(`channel leave failed: ${err}`));
      });
    });
    /**
     * Leaves an AgoraRTC Channel
     * This method enables a user to leave a channel.
     * */

  };


  private handleEvents = () => {
    if (!this.client) return;
    this.client.on('error', (err) => {
      console.log(err);
    });
    // Occurs when the peer user leaves the channel; for example, the peer user calls Client.leave.
    this.client.on('peer-leave', evt => {
      const id = evt.uid;
      console.log('id', evt);
      const streams = this.remoteStreams.filter(e => id !== e.getId());
      const peerStream = this.remoteStreams.find(e => id === e.getId());
      if (peerStream && peerStream.isPlaying()) {
        peerStream.stop();
      }
      this.remoteStreams = streams;
      this.onRemoteStreamChanged(this.remoteStreams);
      console.log('peer-leave', id);
    });
    // Occurs when the local stream is published.
    this.client.on('stream-published', evt => {
      console.log('stream-published');
    });
    // Occurs when the remote stream is added.
    this.client.on('stream-added', evt => {
      const remoteStream = evt.stream;
      const id = remoteStream.getId();
      if (id !== this.params.uid) {
        this.client?.subscribe(remoteStream, {}, err => {
          console.log('stream subscribe failed', err);
        });
      }
      console.log('stream-added remote-uid: ', id);
    });
    // Occurs when a user subscribes to a remote stream.
    this.client.on('stream-subscribed', evt => {
      const remoteStream = evt.stream;
      this.remoteStreams.push(remoteStream);
      this.onRemoteStreamChanged(this.remoteStreams);
    });
    // Occurs when the remote stream is removed; for example, a peer user calls Client.unpublish.
    this.client.on('stream-removed', evt => {
      const remoteStream = evt.stream;
      const id = remoteStream.getId();
      if (remoteStream.isPlaying()) {
        remoteStream.stop();
      }
      this.remoteStreams = this.remoteStreams.filter(stream => {
        return stream.getId() !== id;
      });
      this.onRemoteStreamChanged(this.remoteStreams);
      console.log('stream-removed remote-uid: ', id);
    });
    this.client.on('onTokenPrivilegeWillExpire', () => {
      // After requesting a new token
      // this.client.renewToken(token);
      console.log('onTokenPrivilegeWillExpire');
    });
    this.client.on('onTokenPrivilegeDidExpire', () => {
      // After requesting a new token
      // client.renewToken(token);
      console.log('onTokenPrivilegeDidExpire');
    });
  };

}
