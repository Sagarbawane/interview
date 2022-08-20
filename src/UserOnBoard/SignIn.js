import React, { useState } from "react";
import { debounce } from "./debounce";
import axios from "axios";
import "./index.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const AddEmail = debounce(function (e) {
    let email = e.target.value;
    let regx = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    if (regx.test(email)) {
      setEmail(email);
      setErrorEmail(false);
    } else {
      setErrorEmail(true);
    }
  });

  const AddPassword = e => {
    let password = e.target.value;
    if (password.length > 5) {
      setPassword(password);
      setErrorPassword(false);
    } else {
      setErrorPassword(true);
    }
  };
  const SignIn = () => {
    if ((email, password)) {
      let data = { password };

      axios
        .post(`http://localhost:3030/users/${email}/login`, data)
        .then(ele => {
          console.log(ele);
          //   console.log(ele);
          //   if (ele.data.result === "registration successful!") {
          //     navigate("/signin");
          //   }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  return (
    <div className="containerParent">
      <h1>SignIn Page</h1>
      <div className="inputContainer">
        <input
          className="inputFeild"
          type="email"
          placeholder="Email"
          onChange={e => {
            AddEmail(e);
          }}
        />
        {errorEmail ? <p className="errorMsg">Invalid Email</p> : null}
        <input
          className="inputFeild"
          type="password"
          placeholder="password"
          onChange={e => {
            AddPassword(e);
          }}
        />
        {errorPassword ? (
          <p className="errorMsg">Password must be at least 5 characters</p>
        ) : null}

        <button
          className="button"
          onClick={() => {
            SignIn();
          }}
        >
          SignIn
        </button>
      </div>
    </div>
  );
}

export default SignIn;
