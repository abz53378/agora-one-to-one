(this["webpackJsonprun-the-world"]=this["webpackJsonprun-the-world"]||[]).push([[0],{126:function(e,n){function t(e){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}t.keys=function(){return[]},t.resolve=t,e.exports=t,t.id=126},158:function(e,n,t){},271:function(e,n){},272:function(e,n){},273:function(e,n){},274:function(e,n){},275:function(e,n){},276:function(e,n){},277:function(e,n){},280:function(e,n,t){},285:function(e,n,t){"use strict";t.r(n);var r=t(7),a=t(0),i=t.n(a),o=t(16),c=t.n(o),l=(t(158),t(149)),s=t(43),u=t(295),d=t(66),m=t(45),h=t(72),p=t(291),f=t(290),b=t(288),v=t(292),j=t(147);var g=function(e){var n=e.onLeave,t=e.onPublish,a=e.onUnpublish;return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(b.a.Item,{label:"ID",name:"appId",children:Object(r.jsx)(v.a,{})}),Object(r.jsx)(b.a.Item,{label:"Channel",name:"channel",children:Object(r.jsx)(v.a,{})}),Object(r.jsx)(b.a.Item,{label:"Token",name:"token",children:Object(r.jsx)(v.a,{})}),Object(r.jsx)(b.a.Item,{wrapperCol:{offset:8},children:Object(r.jsxs)(j.a.Group,{children:[Object(r.jsx)(j.a,{type:"primary",htmlType:"submit",children:"JOIN"}),Object(r.jsx)(j.a,{type:"primary",onClick:n,children:"LEAVE"}),Object(r.jsx)(j.a,{type:"primary",onClick:t,children:"PUBLISH"}),Object(r.jsx)(j.a,{type:"primary",onClick:a,children:"UNPUBLISH"})]})})]})},O=t(289),S=t(293),x=t(30),w=t.n(x),I=t(46),y=t(50),k=t.n(y);function P(){return(P=Object(I.a)(w.a.mark((function e(){var n,t,r,a;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=k.a.createStream({audio:!0,video:!1}),t=k.a.createStream({audio:!1,video:!0}),r=new Promise((function(e){n.init((function(){return e(null)}),(function(n){return e(n)}))})),a=new Promise((function(e){t.init((function(){return e(null)}),(function(n){return e(n)}))})),e.next=6,Promise.all([r,a]).then((function(e){null!==e[0]&&console.warn("create audio temp stream failed!",e[0]),null!==e[1]&&console.warn("create video temp stream failed!",e[0])}));case 6:return n.close(),t.close(),e.abrupt("return",new Promise((function(e,n){k.a.getDevices((function(n){console.log(n);for(var t=[],r=[],a=0;a<n.length;a++){var i=n[a];if("videoinput"===i.kind){var o=i.label,c=i.deviceId;o||(o="camera-".concat(t.length)),t.push({name:o,value:c,kind:i.kind})}if("audioinput"===i.kind){var l=i.label,s=i.deviceId;l||(l="microphone-".concat(r.length)),r.push({name:l,value:s,kind:i.kind})}}e({videos:t,audios:r})}))})));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function C(){var e=Object(a.useState)({audios:[],videos:[]}),n=Object(s.a)(e,2),t=n[0],r=n[1],i=Object(a.useState)(null),o=Object(s.a)(i,2),c=o[0],l=o[1],u=Object(a.useState)(!1),d=Object(s.a)(u,2),m=d[0],h=d[1];return Object(a.useEffect)((function(){h(!0),function(){return P.apply(this,arguments)}().then((function(e){return r(e)})).catch((function(e){return l(e)})).finally((function(){return h(!1)}))}),[]),{devices:t,error:c,loading:m}}var E=[{name:"default",value:"default"},{name:"480p",value:"480p"},{name:"720p",value:"720p"},{name:"1080p",value:"1080p"}],H=["live","rtc"],R=["h264","vp8"];var F=function(e){var n,t,a=C(),i=a.devices;return a.loading?null:Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(b.a.Item,{label:"UID",name:"uid",children:Object(r.jsx)(v.a,{})}),Object(r.jsx)(b.a.Item,{label:"CAMERA",name:"cameraId",initialValue:null===(n=i.videos[0])||void 0===n?void 0:n.value,children:Object(r.jsx)(O.a,{children:i.videos.map((function(e){return Object(r.jsx)(O.a.Option,{value:e.value,children:e.name},e.value)}))})}),Object(r.jsx)(b.a.Item,{label:"MICROPHONE",name:"microphoneId",initialValue:null===(t=i.audios[0])||void 0===t?void 0:t.value,children:Object(r.jsx)(O.a,{children:i.audios.map((function(e){return Object(r.jsx)(O.a.Option,{value:e.value,children:e.name},e.value)}))})}),Object(r.jsx)(b.a.Item,{label:"CAMERA RESOLUTION",name:"cameraResolution",initialValue:E[0].value,children:Object(r.jsx)(O.a,{children:E.map((function(e){return Object(r.jsx)(O.a.Option,{value:e.value,children:e.name},e.value)}))})}),Object(r.jsx)(b.a.Item,{label:"MODE",name:"mode",initialValue:H[0],children:Object(r.jsx)(S.a.Group,{children:H.map((function(e){return Object(r.jsx)(S.a,{value:e,children:e},e)}))})}),Object(r.jsx)(b.a.Item,{label:"CODEC",name:"codec",initialValue:R[0],children:Object(r.jsx)(S.a.Group,{children:R.map((function(e){return Object(r.jsx)(S.a,{value:e,children:e},e)}))})})]})},L=p.a.Panel,D={labelCol:{span:8},wrapperCol:{span:16}};function T(e){var n=e.join,t=e.publish,a=e.leave,i=e.unpublish;return Object(r.jsx)(f.a,{bordered:!0,style:{margin:24},children:Object(r.jsxs)(b.a,Object(h.a)(Object(h.a)({},D),{},{onFinish:function(e){n(e).catch(console.log)},children:[Object(r.jsx)(g,{onLeave:function(){return a().catch(console.log)},onPublish:function(){return t().catch(console.log)},onUnpublish:function(){return i().catch(console.log)}}),Object(r.jsx)(p.a,{style:{},children:Object(r.jsx)(L,{forceRender:!0,header:"Advanced Setting",children:Object(r.jsx)(F,{})},"advancedSetting")})]}))})}var J=t(294),N=t(142),U=t(143),V={success:function(e){return console.log(e)},error:function(e){return console.error(e)},info:function(e){return console.info(e)}},Y=function e(n){var t=this,r=n.messageHandler;Object(N.a)(this,e),this.client=null,this.joined=!1,this.published=!1,this.localStream=null,this.remoteStreams=[],this.params={mode:"live",codec:"h264",uid:"",appId:"",microphoneId:"",cameraId:"",token:"",channel:""},this.messageHandler=V,this.onRemoteStreamChanged=function(e){return console.log(e)},this.onLocalStreamChanged=function(e){return console.log(e)},this.playStream=function(e,n){var r;if((null===(r=t.localStream)||void 0===r?void 0:r.getId())!==e){var a=t.remoteStreams.find((function(n){return n.getId()===e}));a&&(null===a||void 0===a||a.play(n))}else t.localStream.play(n)},this.closeStream=function(e){var n,r,a;(r=(null===(n=t.localStream)||void 0===n?void 0:n.getId())===e?t.localStream:t.remoteStreams.find((function(n){return n.getId()===e})))&&(r.isPlaying()&&r.stop(),null===(a=r)||void 0===a||a.close())},this.initClient=function(){var e=Object(I.a)(w.a.mark((function e(n){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.params=n,t.client=k.a.createClient({mode:n.mode,codec:n.codec}),t.handleEvents(),e.abrupt("return",new Promise((function(e,r){var a;null===(a=t.client)||void 0===a||a.init(n.appId,(function(){e()}),(function(e){r(e)}))})));case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),this.initStream=Object(I.a)(w.a.mark((function e(){var n,r,a,i;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.params,r=n.uid,a=n.microphoneId,i=n.cameraId,t.localStream=k.a.createStream({streamID:r,audio:!0,video:!0,screen:!1,microphoneId:a,cameraId:i}),e.abrupt("return",new Promise((function(e,n){var r;null===(r=t.localStream)||void 0===r||r.init((function(){console.log("init local stream success"),t.onLocalStreamChanged(t.localStream),e()}),(function(e){n(e),console.error("init local stream failed ",e)}))})));case 3:case"end":return e.stop()}}),e)}))),this.join=function(){var e=Object(I.a)(w.a.mark((function e(n){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.client){e.next=3;break}return e.next=3,t.initClient(Object(h.a)({},n));case 3:return e.abrupt("return",new Promise((function(e,r){var a;if(t.joined){var i="You'r already joined";return t.messageHandler.error(i),r(new Error(i))}return null===(a=t.client)||void 0===a?void 0:a.join(n.token?n.token:null,n.channel,n.uid?+n.uid:null,function(){var r=Object(I.a)(w.a.mark((function r(a){return w.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t.messageHandler.success("join channel: ".concat(n.channel," success, uid: ").concat(a)),t.joined=!0,t.params.uid=a,r.next=5,t.initStream();case 5:e();case 6:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}(),(function(e){t.messageHandler.error("join channel failed"),r(e)}))})));case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),this.publish=Object(I.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){var r;if(!t.client)return t.messageHandler.error("Please Join Room First"),n(new Error("Please Join Room First"));if(t.published)return t.messageHandler.error("Your already published"),n(new Error("Your already published"));var a=t.published;return null===(r=t.client)||void 0===r||r.publish(t.localStream,(function(e){t.published=a,t.messageHandler.error("publish failed:".concat(e)),n(new Error("publish failed:".concat(e)))})),t.published=!0,t.messageHandler.success("publish success"),e()})));case 1:case"end":return e.stop()}}),e)}))),this.unpublish=Object(I.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){var r;if(!t.client)return t.messageHandler.error("Please Join Room First"),void n(new Error("Please Join Room First"));if(!t.published)return t.messageHandler.error("Your didn\b\b\b't publish"),void n(new Error("Your didn\b\b\b't publish"));var a=t.published;null===(r=t.client)||void 0===r||r.unpublish(t.localStream,(function(e){t.published=a,t.messageHandler.error("unpublish failed: ".concat(e)),n(new Error("unpublish failed: ".concat(e)))})),t.published=!1,t.messageHandler.success("unpublish success"),e()})));case 1:case"end":return e.stop()}}),e)}))),this.leave=Object(I.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){return t.client?t.joined?void t.client.leave((function(){var n,r;(null===(n=t.localStream)||void 0===n?void 0:n.isPlaying())&&t.localStream.stop(),null===(r=t.localStream)||void 0===r||r.close();for(var a=[],i=0;i<t.remoteStreams.length;i++){var o=t.remoteStreams.shift(),c=null===o||void 0===o?void 0:o.getId();a.push(c),(null===o||void 0===o?void 0:o.isPlaying())&&o.stop()}t.localStream=null,t.remoteStreams=[],t.onLocalStreamChanged(t.localStream),t.onRemoteStreamChanged(t.remoteStreams),t.client=null,t.messageHandler.success("client leaves channel success"),t.published=!1,t.joined=!1,e(U.isDeleteExpression)}),(function(e){t.messageHandler.error("channel leave failed: ".concat(e)),n(new Error("channel leave failed: ".concat(e)))})):(t.messageHandler.error("You are not in channel"),void n(new Error("You are not in channel"))):(t.messageHandler.error("Please Join Room First"),void n(new Error("Please Join Room First")))})));case 1:case"end":return e.stop()}}),e)}))),this.handleEvents=function(){t.client&&(t.client.on("error",(function(e){console.log(e)})),t.client.on("peer-leave",(function(e){var n=e.uid;console.log("id",e);var r=t.remoteStreams.filter((function(e){return n!==e.getId()})),a=t.remoteStreams.find((function(e){return n===e.getId()}));a&&a.isPlaying()&&a.stop(),t.remoteStreams=r,t.onRemoteStreamChanged(t.remoteStreams),t.messageHandler.info("peer leave"),console.log("peer-leave",n)})),t.client.on("stream-published",(function(e){t.messageHandler.success("stream published success")})),t.client.on("stream-added",(function(e){var n,r=e.stream,a=r.getId();(t.messageHandler.info("stream-added uid: ".concat(a)),a!==t.params.uid)&&(null===(n=t.client)||void 0===n||n.subscribe(r,{},(function(e){console.log("stream subscribe failed",e)})));console.log("stream-added remote-uid: ",a)})),t.client.on("stream-subscribed",(function(e){var n=e.stream,r=n.getId();t.remoteStreams.push(n),t.onRemoteStreamChanged(t.remoteStreams),t.messageHandler.info("stream-subscribed remote-uid: ".concat(r))})),t.client.on("stream-removed",(function(e){var n=e.stream,r=n.getId();t.messageHandler.info("stream-removed uid: ".concat(r)),n.isPlaying()&&n.stop(),t.remoteStreams=t.remoteStreams.filter((function(e){return e.getId()!==r})),t.onRemoteStreamChanged(t.remoteStreams),console.log("stream-removed remote-uid: ",r)})),t.client.on("onTokenPrivilegeWillExpire",(function(){t.messageHandler.info("onTokenPrivilegeWillExpire"),console.log("onTokenPrivilegeWillExpire")})),t.client.on("onTokenPrivilegeDidExpire",(function(){t.messageHandler.info("onTokenPrivilegeDidExpire"),console.log("onTokenPrivilegeDidExpire")})))},this.messageHandler&&(this.messageHandler=r),console.log("agora sdk version: ".concat(k.a.VERSION," compatible: ").concat(k.a.checkSystemRequirements()))};var A=t(296),M=t(297);var B=function(e){var n=e.stream,t=e.playStream,i=e.closeStream,o=Object(a.useState)(!1),c=Object(s.a)(o,2),l=c[0],u=c[1],d=null===n||void 0===n?void 0:n.getId(),m="stream_".concat(n);return Object(a.useEffect)((function(){return d&&t(d,m),function(){d&&i(d)}}),[m,d,t,i]),Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("div",{id:m,style:{height:200,width:300}}),l?Object(r.jsx)(A.a,{onClick:function(){null===n||void 0===n||n.unmuteVideo(),u(!1)}}):Object(r.jsx)(M.a,{onClick:function(){null===n||void 0===n||n.muteVideo(),u(!0)}})]})},G=(t(280),u.a.Header),W=u.a.Content,_=u.a.Footer;var q=function(){var e=function(){var e=Object(a.useState)(null),n=Object(s.a)(e,2),t=n[0],r=n[1],i=Object(a.useState)([]),o=Object(s.a)(i,2),c=o[0],l=o[1],u=Object(a.useRef)(new Y({messageHandler:J.b})).current;return u.onRemoteStreamChanged=function(e){l(e)},u.onLocalStreamChanged=function(e){r(e)},[{params:u.params,join:u.join,publish:u.publish,unpublish:u.unpublish,leave:u.leave,playStream:u.playStream,closeStream:u.closeStream,localStream:t,remoteStreams:c}]}(),n=Object(s.a)(e,1)[0],t=n.join,i=n.publish,o=n.leave,c=n.unpublish,h=n.localStream,p=n.remoteStreams,f=n.playStream,b=n.closeStream;return Object(r.jsxs)(u.a,{className:"layout",children:[Object(r.jsx)(G,{className:"header",children:"Basic Communication"}),Object(r.jsx)(W,{children:Object(r.jsxs)(d.a,{children:[Object(r.jsx)(m.a,{span:12,children:Object(r.jsx)(T,{join:t,publish:i,leave:o,unpublish:c})}),Object(r.jsx)(m.a,{span:12,children:[h].concat(Object(l.a)(p)).map((function(e){return e&&Object(r.jsx)(B,{stream:e,playStream:f,closeStream:b},e.getId())}))})]})}),Object(r.jsx)(_,{children:"Created by Leo"})]})},z=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,298)).then((function(n){var t=n.getCLS,r=n.getFID,a=n.getFCP,i=n.getLCP,o=n.getTTFB;t(e),r(e),a(e),i(e),o(e)}))};c.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(q,{})}),document.getElementById("root")),z()}},[[285,1,2]]]);
//# sourceMappingURL=main.279dff73.chunk.js.map