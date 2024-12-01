import { useDispatch } from "react-redux";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../store/session';
import './SignupForm.css'


function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const isValid = () => (
    username.length >= 4 && 
    password.length >= 6 && 
    email.length && 
    firstName.length && 
    lastName.length && 
    confirmPassword.length  
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      ).then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword: "Passwords must match"
    });
  };

  return (
      <div id='signup-container'>
        <h1 id='signup-title'>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label className="label">
            Email
            <input
              placeholder="e.g., yourname@example.com"
              className="input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <div className="error-container">{errors.email && errors.email}</div>
          <label className="label">
            Username
            <input
              placeholder="Choose a username"
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <div className="error-container">{errors.username && errors.username}</div>
          <label className="label">
            First Name
            <input
              placeholder="Enter your first name"
              className="input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <div className="error-container">{errors.firstName && errors.firstName}</div>
          <label className="label">
            Last Name
            <input
              placeholder="Enter your last name"
              className="input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <div className="error-container">{errors.lastName && errors.lastName}</div>
          <label className="label">
            Password
            <input
              placeholder="Create a password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="error-container">{errors.password && errors.password}</div>
          <label className="label">
            Confirm Password
            <input
              placeholder="Confirm your password"
              className="input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <div className="error-container">{errors.confirmPassword && errors.confirmPassword}</div>
          <button 
            id="signup-button" 
            type="submit"
            disabled={!isValid()}
          >
            Sign Up
          </button>
        </form>
      </div>
  );
}

export default SignupFormModal;