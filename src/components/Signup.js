import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword: ""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password, cpassword} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password, cpassword})
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {

            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Account created Successfully", "success")
        } else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }


  return (
    <div className='container mt-2'>
        <h2 className='my-3'>Create an account to use iNotebook!</h2>
        <form onSubmit={handleSubmit}>
        <div className="my-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name='name' onChange={onChange} placeholder='Enter your Name' aria-describedby="emailHelp" required/>
        </div>
        <div className="my-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" onChange={onChange} name='email' placeholder='Enter your Email' aria-describedby="emailHelp" required/>
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="my-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={onChange} name='password' placeholder='Enter a strong Password' minLength={5} required/>
        </div>
        <div className="my-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" onChange={onChange} name='cpassword' placeholder='Confirm your Password' minLength={5} required/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      
    </div>
  );
};

export default Signup;
