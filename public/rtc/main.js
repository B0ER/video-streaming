function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function handleConnection(event) {
  const peerConnection = event.target;
  const iceCandidate = event.candidate;

  if (iceCandidate) {
    const newIceCandidate = new RTCIceCandidate(iceCandidate);
    const otherPeer = getOtherPeer(peerConnection);

    otherPeer.addIceCandidate(newIceCandidate)
      .then(() => {
        handleConnectionSuccess(peerConnection);
      }).catch((error) => {
        handleConnectionFailure(peerConnection, error);
      });

    trace(`${getPeerName(peerConnection)} ICE candidate:\n` + `${event.candidate.candidate}.`);
  }
}

function gotLocalMediaStream(mediaStream) {
  localVideo.srcObject = mediaStream;
  localStream = mediaStream;
  trace('Received local stream.');
  callButton.disabled = false;  // Enable call button.

  return mediaStream;
}

window.onload = e => {

  if (!hasGetUserMedia()) {
    console.error("userMedia unsupported!");
    return;
  }

  const constraints = {
    video: false,
    audio: true,
  };

  const localVideo = document.querySelector('localVideo');

  let localPeerConnection;
  navigator.mediaDevices.getUserMedia(constraints).then(gotLocalMediaStream).then((stream) => {
    console.log(JSON.stringify(stream));
    localVideo.srcObject = stream;

    localPeerConnection = new RTCPeerConnection();
    localPeerConnection.addEventListener('icecandidate', (event) => handleConnection(event));
    localPeerConnection.addEventListener('iceconnectionstatechange', (event) => { });
  });

};
