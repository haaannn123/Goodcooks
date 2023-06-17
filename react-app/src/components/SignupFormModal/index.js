import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(first_name, last_name, username, email, password));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
        history.push("/")
      }
    } else {
      setErrors(["Confirm Password field must be the same as the Password field"]);
    }
  };

  return (
    <div className="sign-up-form-container">
      <h1>Sign up for Greatcooks</h1>
        <form onSubmit={handleSubmit}>
          <div className="errors" >
            {errors.map((error, idx) => (
				<p key={idx}>{error}</p>
            ))}
          </div>
      <div className="sign-up-form-input">
	  	  <label>First name</label>
          <input
		  	type="text"
			value={first_name}
			placeholder="John"
			className="borderless-inputs"
			onChange={(e) => setFirstName(e.target.value)}
			required />
		  <label>Last name</label>
          <input
		  	type="text"
			value={last_name}
			placeholder="Doe"
			className="borderless-inputs"
			onChange={(e) => setLastname(e.target.value)}
			required />
          <label>Email</label>
          <input
		  	type="text"
			value={email}
			placeholder="johndoe@gmail.com"
			className="borderless-inputs"
			onChange={(e) => setEmail(e.target.value)}
			required />
          <label>Username</label>
          <input
		  	type="text"
			className="borderless-inputs"
			value={username}
			placeholder="JohnDoe"
			onChange={(e) => setUsername(e.target.value)}
			required />
          <label>Password</label>
          <input
		  	type="password"
			className="borderless-inputs"
			value={password}
			placeholder="Password"
			onChange={(e) => setPassword(e.target.value)}
			required />
          <label>Confirm Password</label>
          <input
		  	type="password"
			  className="borderless-inputs"
			value={confirmPassword}
			placeholder="Confirm password"
			onChange={(e) => setConfirmPassword(e.target.value)}
			required />
          <button className="sign-up-button" type="submit">Sign Up</button>
      </div>
        </form>
    </div>
  );
}

export default SignupFormModal;
