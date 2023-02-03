import React, { useState } from "react";
import "../css/SignUp.css";
import { Button, Form, FormGroup, Input } from "reactstrap";  
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState([]);
  const [notes, setNotes] = useState({});
  const navigate = useNavigate();

  const signup = async () => {
    const rawResponse = await fetch('http://127.0.0.1:8000/adduser', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password, saved: saved, notes: notes})
    });
    const content = await rawResponse.json();
    // console.log(content);

    navigate('/login');
  };

  return (
    <div className="login-main">
      <h1 className="signup-title"><span className="login-cheese">🧀</span> <br/>Create a That's Cheesy account</h1>
      <p className="signup-desc">One account to save your favorite recipes and add personalized notes.</p>
      <div className="Login-header">
        <Form>
          <FormGroup className="Login-input">
            <p className="signup-p"><b>Enter a Username:</b></p>
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
            <p className="signup-p"><b>Enter a Password:</b></p>
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
        <Button onClick={signup} className="Signup-btn">
            Sign Up
        </Button>
        </div>
    </div>
  );
}