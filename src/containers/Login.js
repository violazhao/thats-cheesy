import React, { useState } from "react";
import "../css/Login.css";
import { Button, Form, FormGroup, Input } from "reactstrap";  
import { useNavigate, Link } from "react-router-dom";

export default function Login({ user_id, handleLogin }) {
  const [failedLogin, setFailedLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
    })
    .then((response) => response.json())
    .then((data) => {
        // console.log('Success:', data);
        if (data !== null) {
          console.log("correct user!");
          navigate(`/`, {state: {user_id: data._id.$oid}});
          handleLogin(data._id.$oid);
          setFailedLogin(false);
        } else {
          console.log("incorrect")
          setFailedLogin(true);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }

  return (
    <div className="login-main">
      <h1 className="login-title"><span className="login-cheese">🧀</span> <br/> Login to your account</h1>
      <div className="Login-header">
        <Form>
          <FormGroup className="Login-input">
            <Input
              type="text"
              value={username}
              id="username-input"
              className="username-input"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="Login-input"> 
            <Input
              type="text"
              value={password}
              id="username-input"
              className="username-input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
      </Form>
      <br></br>
      <Button onClick={login} className="Login-btn">
        Login
      </Button>
      </div>
      {failedLogin ?
        <div className="Error">
          <br></br>
          Incorrect Login
        </div>
        :
        <div>
          
        </div>
      }
      <p className="login-p">Don't have an account? <Link className="login-link" to="/signup">Sign Up</Link></p>
      </div>
  );
}