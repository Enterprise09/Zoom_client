import React, { useEffect, useRef, useState } from "react";
import "../scss/Meeting.scss";

function Meeting({ socket }) {
  let myStream;
  let myPeerConnection;

  // useState로 관리하지 않는 이유
  // state가 변경될 때 re-rendering이 진행되기 때문
  let isMuted = false;
  let cameraOff = false;

  const myFace = useRef(null);
  const camerasSelect = useRef(null);
  const muteButton = useRef(null);
  const cameraOffButton = useRef(null);

  useEffect(async () => {
    await getMedia(camerasSelect.current.value);
  }, []);

  async function getCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      const currentCamera = myStream.getVideoTracks()[0];
      cameras.forEach((camera) => {
        const option = document.createElement("option");
        option.value = camera.deviceId;
        option.innerText = camera.label;
        if (currentCamera.label == camera.label) {
          option.selected = true;
        }
        camerasSelect.current.appendChild(option);
      });
    } catch (e) {
      console.log("Get Camera Error - ", e);
    }
  }

  async function getMedia(deviceId) {
    const initConstraints = {
      audio: !isMuted,
      video: { facingMode: "user" },
    };
    const cameraConstraints = {
      audio: !isMuted,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      myStream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initConstraints
      );
      myFace.current.srcObject = myStream;
      if (!deviceId) {
        await getCameras();
      }
    } catch (e) {
      console.log("Get Media Error - ", e);
    }
  }

  async function onMuteClick(event) {
    myStream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    isMuted = !isMuted;
    if (isMuted) {
      muteButton.current.innerText = "UnMute";
      muteButton.current.className = "blueButton";
    } else {
      muteButton.current.innerText = "Mute";
      muteButton.current.className = "redButton";
    }
    // Mute 상태가 카메라를 변경해도 저장되도록 track를 reloading 해줌
    await getMedia(camerasSelect.current.value);
  }
  function onCameraOffClick(event) {
    myStream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    cameraOff = !cameraOff;
    if (cameraOff) {
      cameraOffButton.current.innerText = "Cam On";
      cameraOffButton.current.className = "blueButton";
    } else {
      cameraOffButton.current.innerText = "Cam Off";
      cameraOffButton.current.className = "redButton";
    }
  }

  async function handleCameraChange() {
    await getMedia(camerasSelect.current.value);
  }

  // RTC Code
  function makeConnection() {
    myPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    });
    myPeerConnection.addEventListener("icecandidate", (data) => {
      console.log("sent cadidate");
      socket.emit("ice", data.candidate);
    });
    myPeerConnection.addEventListener("addstream", (data) => {
      console.log(data.stream);
    });
    myStream
      .getTracks()
      .forEach((track) => myPeerConnection.addTrack(track, myStream));
  }

  return (
    <div className="meetingContainer">
      <h1>Meeting</h1>
      <h2>Room Name</h2>
      <div className="meetingMyStream">
        <video
          className="myFace"
          ref={myFace}
          autoPlay
          playsInline
          width={400}
        />
        <div className="buttonBox">
          <button className="redButton" onClick={onMuteClick} ref={muteButton}>
            Mute
          </button>
          <button
            className="redButton"
            onClick={onCameraOffClick}
            ref={cameraOffButton}
          >
            Cam Off
          </button>
          <select
            className="camerasSelect"
            ref={camerasSelect}
            onInput={handleCameraChange}
          ></select>
        </div>
      </div>
    </div>
  );
}

export default Meeting;
