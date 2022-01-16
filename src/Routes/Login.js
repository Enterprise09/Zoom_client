import axios from "axios";
import React, { useState } from "react";
import { authService, FirebaseApp } from "../config/firebaseService";
import "../scss/Login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [isNew, setIsNew] = useState(true);
  async function onSubmit(event) {
    event.preventDefault();
    if (isNew) {
      // 새로운 계정 -> 회원가입
      try {
        await authService.createUserWithEmailAndPassword(email, pw);
      } catch (e) {
        console.log("Register Error: ", e);
      }
    } else {
      // 계정이 있음 -> 로그인
      try {
        await authService.signInWithEmailAndPassword(email, pw);
      } catch (e) {
        console.log("Login Error: ", e);
      }
    }
  }
  function onChange(event) {
    const {
      target: { value, name },
    } = event;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "pw":
        setPw(value);
        break;
    }
  }
  function onToggleClick() {
    setIsNew(!isNew);
  }
  async function onSocialClick(event) {
    const {
      target: { name },
    } = event;
    let provider;
    switch (name) {
      case "google":
        provider = new FirebaseApp.auth.GoogleAuthProvider();
        break;
      case "github":
        provider = new FirebaseApp.auth.GithubAuthProvider();
        break;
      case "kakao":
        alert(
          "카카오 로그인은 구현중에 있습니다!\n다른 로그인 방식을 선택해주세요"
        );
        break;
    }
    try {
      await authService.signInWithPopup(provider);
    } catch (e) {
      console.log("Social Login Error: ", e);
    }
  }
  return (
    <div className="loginContainer">
      <h1>ZOOM</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
          maxLength={30}
          placeholder="Enter email"
        />
        <input
          type="password"
          name="pw"
          value={pw}
          onChange={onChange}
          required
          maxLength={12}
          placeholder="Enter password"
        />
        <input type="submit" value={isNew ? "Register" : "Login"} />
      </form>
      <span className="toggleLogin" onClick={onToggleClick}>
        {isNew ? "로그인" : "회원가입"}
      </span>
      <hr />
      <span>또는 다음으로 로그인</span>
      <div className="oAuthLogin">
        <img
          name="google"
          onClick={onSocialClick}
          src="img/google.png"
          width={40}
        />
        <img
          name="github"
          onClick={onSocialClick}
          src="img/github.png"
          width={40}
        />
        <img
          name="kakao"
          onClick={onSocialClick}
          src="img/kakao.png"
          width={40}
        />
      </div>
    </div>
  );
}

export default Login;
