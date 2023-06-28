import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export const Login = (props) => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [acc, setAcc] = useState([])

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://empnet.onrender.com/login', values)
        .then(res => {
            setAcc(res.data[0])
            if(acc.type === "admin") {
                navigate('/admin');
            } 
            else if(acc.type === "manager") {
                navigate('/managerHome');
            }
            else if(acc.type === "employee") {
                navigate('/home');
            }
            else {
                alert(res.data.Message);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-form-container">
                    <h1> EMPnet System Login </h1>
                    <form action='' onSubmit={handleSubmit} className="login-form">
                        <div className="form-item">
                            <label for="email">Email</label>
                            <input onChange={e => setValues({...values, email: e.target.value})} className="form-elements"
                                type="email" placeholder="youremail@email.com" id="email" name="email" />
                        </div>

                        <div className="form-item">
                            <label for="password">Password</label>
                            <input onChange={e => setValues({...values, password: e.target.value})} className="form-elements"
                                type="password" placeholder="Your Password" id="password" name="password" />
                        </div>

                        <button className="login-button" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}