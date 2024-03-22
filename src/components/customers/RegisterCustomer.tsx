import { useState} from "react";
import * as env from '../../constants';
import { useNavigate } from "react-router-dom";

export default function RegisterCustomer() {
	// States for registration
  const [userData, setUserData] = useState({});
	const [name, setName] = useState("");
  const [dob, setDob] = useState("");
	const [email, setEmail] = useState("");
	const [aadhaarNum, setAadhaarNum] = useState("");

	// // States for checking the errors
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);
  const navigate = useNavigate();

	// Handling the name change
	const handleName = (e: any) => {
		setName(e.target.value);
		setSubmitted(false);
	};

	// Handling the email change
	const handleEmail = (e: any) => {
		setEmail(e.target.value);
		setSubmitted(false);
	};

	// Handling the password change
	const handleDob = (e: any) => {
		setDob(e.target.value);
		setSubmitted(false);
	};

  // Handling the aadhaar number
	const handleAadhaarNum = (e: any) => {
		setAadhaarNum(e.target.value);
		setSubmitted(false);
	};

	// Handling the form submission
	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (name === "" || email === "" || dob === "" || aadhaarNum === '') {
			setError(true);
		} else {
			setSubmitted(true);
			setError(false);
      let userObj = {
        name: name,
        dob: dob,
        email: email,
        aadhaarNumber: aadhaarNum
      };
      // setUserData(userObj);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userObj)
      };
      env.default.REACT_APP_API_ENDPOINT
      fetch(`${env.default.REACT_APP_API_ENDPOINT}/api/users/create`, requestOptions)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setUserData(data);
          localStorage.setItem('loginId', data.id);
          navigate('/choose-plan');
        });
		}
	};

	// Showing success message
	const successMessage = () => {
		return (
			<div
				className="success"
				style={{
					display: submitted ? "" : "none",
				}}
			>
				<h1>User successfully registered!!</h1>
			</div>
		);
	};

	// Showing error message if error is true
	const errorMessage = () => {
		return (
			<div
				className="error"
				style={{
					display: error ? "" : "none",
				}}
			>
				<h1>Please enter all the fields</h1>
			</div>
		);
	};

	return (
		<div className="form">
			<div>
				<h1>User Registration</h1>
			</div>

			{/* Calling to the methods */}
			<div className="messages">
				{errorMessage()}
				{successMessage()}
			</div>

			<form>
				{/* Labels and inputs for form data */}
        <div>
          <label className="label">Name</label>
          <input
            onChange={handleName}
            className="input"
            value={name}
            type="text"
          />
        </div>

        <div>
          <label className="label">DOB</label>
          <input
            onChange={handleDob}
            // ref={dobInputRef}
            className="input"
            value={dob}
            type="date"
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            onChange={handleEmail}
            // ref={emailInputRef}
            className="input"
            value={email}
            type="email"
          />
        </div>

        <div>
          <label className="label">Aadhaar Number</label>
          <input
            onChange={handleAadhaarNum}
            // ref={aadhaarNumInputRef}
            className="input"
            value={aadhaarNum}
            type="text"
            maxLength={12}
          />
        </div>

        <div>
          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </div>
			</form>
		</div>
	);
}
