# Zoom_client

<div>
    <img src="https://img.shields.io/badge/Node.js-14.15.1-brightgreen">
    <img src="https://img.shields.io/badge/Develop-~ing-orange">
</div>

> Getting Started with Create React App

## What is Zoom_client project?

- 화상 회의, 통화를 웹브라우저 상에서 가능하도록 해주는 웹 어플

- 채팅(메시지) 기능도 추가할 예정

- Socket.io를 이용한 Peer-to-Peer간의 실시간 통신

## Socket.io

> 실시간 양방향 이벤트 통신 지원

- RTCDataChannel을 이용

  > <a href="https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createDataChannel">Document</a>
  >
  > > How to use dataChannel(createDataChannel())

  - 바이너리 기반으로 빠른 속도로 주고 받을 수 있다.
  - 따라서 그물망(Mesh) 구조로 다수를 연결해도 속도 저하를 방지할 수 있다.

    <img src="https://user-images.githubusercontent.com/73864148/148980104-d7d6cc54-6f15-4b9d-b8b0-a4951e2edfd4.png" height="300">

## Firebase

- 서버를 거치지 않고 Firebase를 이용하여 로그인 여부를 빠르게 체크

  > 서버를 거쳐서 로그인 로직을 처리하는 것에 비해 속도가 매우 빠름

  > `Firebase.auth.authStateChange((user) => { socket.emit("login", user)})`

- Firebase 설정 파일을 `src/config/firebaseService.js`에 생성

  > <img src="https://user-images.githubusercontent.com/73864148/148980973-640b3747-6c69-42e1-beb0-0500b5f58914.png">

## Install

```shell
    # install git first
    # or download to .zip
    git clone https://github.com/Enterprise09/Zoom_client.git
    cd Zoom_client
    npm install
    npm start
```

- if you get some error like this

```shell
    npm ERR! code ERESOLVE
    npm ERR! ERESOLVE unable to resolve dependency tree
    npm ERR!
    npm ERR! While resolving: test@0.1.0
    npm ERR! Found: react@17.0.2
    npm ERR! node_modules/react
    npm ERR!   react@"^17.0.2" from the root project
    npm ERR!
    npm ERR! Could not resolve dependency:
    npm ERR! peer react@"^16.0.0" from react-onsenui@1.11.5
    npm ERR! node_modules/react-onsenui
    npm ERR!   react-onsenui@"*" from the root project
    # ~~~
```

> you can try this

```shell
    npm install --legacy-peer-deps
```

- finally start app with `npm start`

## Features

- 로그인, 로그아웃

- 다수가 참여할 수 있는 화상 회의

- 방 만들기 및 참여하기

- 비밀번호와 함께 비공개 방 만들기

- 생성된 방 리스트 보여주고 참여하기

  > 공개 및 비공개 여부 확인

## Release

<img src="https://img.shields.io/badge/Develop-~ing-orange">

- 현재 개발 중 . . .
