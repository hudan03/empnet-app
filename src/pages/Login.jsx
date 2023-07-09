import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice.js";
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, isError, isSuccess, isLoading, message} = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if(user || isSuccess) {
            if(user && user.role === "admin") {
                navigate("/admin")
            }
            if(user && user.role === "manager") {
                navigate("/managerHome")
            }
            if(user && user.role === "employee") {
                navigate("/home")
            }
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch. navigate]);

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({email, password}));
        // axios.post('http://localhost:8800/login', values)
        // .then(res => {
        //     if(res.data.Status === "Success") {
        //         navigate('/admin')
        //     } else {
        //         alert(res.data.Error);
        //     }
        // })
        // .catch(err => console.log(err));
    }

    // Login Form and Styling

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-form-container">
                    <h1> EMPnet System Login </h1>
                    <form action='' onSubmit={Auth} className="login-form">
                        {isError && <p>{message}</p>}
                        <div className="form-item">
                            <label for="email">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} className="form-elements"
                                value={email} type="email" placeholder="youremail@email.com" id="email" name="email" />
                        </div>

                        <div className="form-item">
                            <label for="password">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} className="form-elements"
                                value={password} type="password" placeholder="Your Password" id="password" name="password" />
                        </div>

                        <button className="login-button" type="submit">
                            {isLoading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;