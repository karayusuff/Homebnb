import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css'

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const isValid = () => (credential.length >= 4 && password.length >= 6);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div id='login-page'>
      <div id='login-container'>
        <h1 id='login-title'>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label className='label'>
            Username or Email
            <input
              className='input'
              placeholder='Please enter your username or email'
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              className='input'
              placeholder='Please enter your password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.credential && <p>{errors.credential}</p>}
          <button 
            id='login-button' 
            type="submit"
            className={!isValid() ? 'disabled-button' : ''}
          >
            Log In
          </button>
          <button 
            id="demo-button" 
            type="submit" 
            onClick={() => {
              setCredential("demo-lition");
              setPassword("password");
            }}
          >
            Log in as demo user
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;