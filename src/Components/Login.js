import React, { useState } from "react";
import "../scss/Login.scss";

function Login({ socket }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  function onSubmit(event) {
    event.preventDefault();
    socket.emit("login", email, pw);
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
          maxLength={12}
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
        <input type="submit" value="Login" />
      </form>
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
