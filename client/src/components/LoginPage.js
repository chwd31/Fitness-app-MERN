import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;


  const [login, { error }] = useMutation(LOGIN);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  
    login({
      variables: {
        input: {
        email,
        password,
        },
      },
    })
      .then((response) => {
        console.log('Login response:', response);
        const { token } = response.data.login;
        localStorage.setItem('token', token);
        onLogin(user);
      })
      .catch((error) => {
        console.error('Error occurred logging in:', error);
      });
  };
  
  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      {error && <p>Error occurred while logging in: {error.message}</p>}
    </div>
  );
};

export default LoginPage;
