import axios from "axios";
import React, { useState } from "react";
import "../scss/Login.scss";

function Login({ socket, authStateChange }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [isNew, setIsNew] = useState(true);
  async function onSubmit(event) {
    event.preventDefault();
    if (isNew) {
      // 새로운 계정 -> 회원가입
      axios({
        method: "post",
        baseURL: "http://localhost:3002",
        url: "/register",
        data: {
          email,
          pw,
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.status === 200) {
            window.localStorage.setItem("auth", true);
            authStateChange();
          } else {
            console.log("Some error with register...");
          }
        })
        .catch((err) => console.log(`Register ${err}`));
    } else {
      // 계정이 있음 -> 로그인
      axios({
        method: "post",
        baseURL: "http://localhost:3002",
        url: "/login",
        data: {
          email,
          pw,
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            window.localStorage.setItem("auth", true);
            authStateChange();
          } else {
            console.log("Some error with login...");
          }
        })
        .catch((err) => console.log(`Login ${err}`));
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
        <img src="img/google.png" width={40} />
        <img src="img/github.png" width={40} />
        <img src="img/kakao.png" width={40} />
      </div>
    </div>
  );
}

export default Login;
