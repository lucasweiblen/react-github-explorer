import React, {useState} from 'react';
import './Login.css';
import {config} from '../../config/httpClient';
import {navigate} from '@reach/router';

const Login = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  //const [loggedIn, setLoggedIn] = useState(false);

  const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleClick = () => {
    const url = '/users/login';

    config.appAPI
      .post(url, {
        username: username,
        email: email,
        password: password,
      })
      .then(function(response) {
        if (response.status === 200) {
          localStorage.setItem('token', JSON.stringify(response.data['token']));
          localStorage.setItem('user', JSON.stringify(response.data['user']));
          //setLoggedIn(true);
          props.onSignIn();
          navigate('/');
        }
      })
      .catch(function(error) {
        console.log(error.response);
        if (error.response && error.response.status === 403) {
          //setLoggedIn(false);
        }
      });
  };

  const handleUsername = e => {
    setUsername(e.target.value);
  };

  const handleEmail = e => {
    const email = e.target.value;
    if (email && email.length > 0) {
      if (validateEmail(email)) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
      }
      setEmail(e.target.value);
    }
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  return (
    <div className="container login">
      <div className="columns is-mobile is-centered">
        <div className="column is-half">
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Username"
                onChange={handleUsername}
                value={username}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
            </div>
          </div>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className={validEmail ? 'input' : 'input is-danger'}
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
              {!validEmail ? (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle" />
                </span>
              ) : (
                ''
              )}
            </div>
            {!validEmail ? (
              <p className="help is-danger">This email is invalid</p>
            ) : (
              ''
            )}
          </div>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Password"
                onChange={handlePassword}
                value={password}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-key" />
              </span>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleClick}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
