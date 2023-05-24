import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom"

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      history.push('/books')
    }
  };

  return (
    <div className="login-form-modal-container">
      <h1>Sign in to Greatcooks</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {errors.map((error, idx) => (
            <p className="errors" key={idx}>{error}</p>
          ))}
        </div>
        <div className='login-input'>
              <labe>
                Email
              </labe>
              <input
                type="text"
                value={email}
                className="borderless-inputs"
                placeholder="Type your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>
                Password
              </label>
              <input
                type="password"
                value={password}
                className="borderless-inputs"
                placeholder="Type your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            <button className="log-in-button" type="submit">Log In</button>
          </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
