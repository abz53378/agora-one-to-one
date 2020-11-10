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
type MessageHandler = {
  success: (content: string) => void;
  error: (content: string) => void;
  info: (content: string) => void;
};

const ConsoleMessageHandler = {
  success: (content: string) => console.log(content),
  error: (content: string) => console.error(content),
  info: (content: string) => console.info(content),
};
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

  private messageHandler = ConsoleMessageHandler;

  constructor({
    messageHandler,
  }: {
    messageHandler: MessageHandler
  }) {
    if (this.messageHandler) {
      this.messageHandler = messageHandler;
    }
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
        const errorText = 'You\'r already joined';
        this.messageHandler.error(errorText);
        return reject(new Error(errorText));
      }
      return this.client?.join(
        params.token ? params.token : null,
        params.channel,
        params.uid ? +params.uid : null,
        async uid => {
          this.messageHandler.success(`join channel: ${params.channel} success, uid: ${uid}`);
          this.joined = true;
          this.params.uid = uid;
          await this.initStream();
          resolve();
        }, err => {
          this.messageHandler.error('join channel failed');
          reject(err);
        },
      );
    });

  };


  public publish = async () => {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        this.messageHandler.error('Please Join Room First');
        return reject(new Error('Please Join Room First'));
      }
      if (this.published) {
        this.messageHandler.error('Your already published');
        return reject(new Error('Your already published'));
      }
      const oldState = this.published;

      // publish localStream
      this.client?.publish(this.localStream!, err => {
        this.published = oldState;
        this.messageHandler.error(`publish failed:${err}`);
        reject(new Error(`publish failed:${err}`));
      });
      this.published = true;
      this.messageHandler.success('publish success');
      return resolve();
    });
  };


  public unpublish = async () => {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        this.messageHandler.error('Please Join Room First');
        reject(new Error('Please Join Room First'));
        return;
      }
      if (!this.published) {
        this.messageHandler.error('Your didn\'t publish');
        reject(new Error('Your didn\'t publish'));
        return;
      }
      const oldState = this.published;
      this.client?.unpublish(this.localStream!, err => {
        this.published = oldState;
        this.messageHandler.error(`unpublish failed: ${err}`);
        reject(new Error(`unpublish failed: ${err}`));
      });
      this.published = false;
      this.messageHandler.success('unpublish success');
      resolve();
    });
  };

  public leave = async () => {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        this.messageHandler.error('Please Join Room First');
        reject(new Error('Please Join Room First'));
        return;
      }
      if (!this.joined) {
        this.messageHandler.error('You are not in channel');
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
        this.messageHandler.success('client leaves channel success');
        this.published = false;
        this.joined = false;
        resolve(isDeleteExpression);
      }, err => {
        this.messageHandler.error(`channel leave failed: ${err}`);
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
      this.messageHandler.info('peer leave');
      console.log('peer-leave', id);
    });
    // Occurs when the local stream is published.
    this.client.on('stream-published', evt => {
      this.messageHandler.success('stream published success');
    });
    // Occurs when the remote stream is added.
    this.client.on('stream-added', evt => {
      const remoteStream = evt.stream;
      const id = remoteStream.getId();
      this.messageHandler.info(`stream-added uid: ${id}`);

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
      const id = remoteStream.getId();
      this.remoteStreams.push(remoteStream);
      this.onRemoteStreamChanged(this.remoteStreams);
      this.messageHandler.info(`stream-subscribed remote-uid: ${id}`);
    });
    // Occurs when the remote stream is removed; for example, a peer user calls Client.unpublish.
    this.client.on('stream-removed', evt => {
      const remoteStream = evt.stream;
      const id = remoteStream.getId();
      this.messageHandler.info(`stream-removed uid: ${id}`);

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
      this.messageHandler.info('onTokenPrivilegeWillExpire');

      console.log('onTokenPrivilegeWillExpire');
    });
    this.client.on('onTokenPrivilegeDidExpire', () => {
      // After requesting a new token
      // client.renewToken(token);
      this.messageHandler.info('onTokenPrivilegeDidExpire');

      console.log('onTokenPrivilegeDidExpire');
    });
  };

}
