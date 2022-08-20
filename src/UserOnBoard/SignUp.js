import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { debounce } from "./debounce";

function SignIn() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [lastName, setLastName] = useState("");
  const [errorLastName, setErrorLastName] = useState(false);
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const AddName = e => {
    let name = e.target.value;
    if (name.length > 5) {
      setFirstName(name);
      setErrorName(false);
    } else {
      setErrorName(true);
    }
  };
  const AddSurname = e => {
    let surname = e.target.value;
    if (surname.length > 5) {
      setLastName(surname);
      setErrorLastName(false);
    } else {
      setErrorLastName(true);
    }
  };
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

  const SignUp = () => {
    if ((firstName, lastName, email, password)) {
      let data = {
        firstName,
        lastName,
        email,
        password,
      };
      console.log(data);
      axios
        .post("http://localhost:3030/signup", data)
        .then(ele => {
          console.log(ele);
          if (ele.data.result === "registration successful!") {
            navigate("/signin");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div className="containerParent">
      <h1>SignUp Page</h1>

      <div className="inputContainer">
        <input
          className="inputFeild"
          type="text"
          placeholder="FirstName"
          onChange={e => {
            AddName(e);
          }}
        />
        {errorName ? (
          <p className="errorMsg">Name must be at least 5 characters</p>
        ) : null}
        <input
          className="inputFeild"
          type="text"
          placeholder="LastName"
          onChange={e => {
            AddSurname(e);
          }}
        />
        {errorLastName ? (
          <p className="errorMsg">LastName must be at least 5 characters</p>
        ) : null}
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
            SignUp();
          }}
        >
          SignUp
        </button>
      </div>
    </div>
  );
}

export default SignIn;
