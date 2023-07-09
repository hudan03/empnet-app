import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveUser } from '../features/authSlice';
import { LogoutUser, reset } from "../features/authSlice.js";
import './styles/adminNav.css';
import axios from 'axios';

function AdminNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError, user} = useSelector((state => state.auth));

    useEffect(() => {
        dispatch(getActiveUser());
    }, [dispatch]);

    useEffect(() => {
        if(isError) {
            navigate("/");
        }
        if(user && user.role !== "admin") {
            navigate("/");
        }
    }, [isError, user, navigate]);
    
    const logout = () => {
        dispatch(LogoutUser());
        dispatch(reset());
        navigate("/");
    }

    return (
    <>
        <body>
            <div class="d-flex">
                <div className="main-container d-flex justify-content-between flex-column py-3 ps-3 pe-5 vh-100">
                    <div class="sidebar" id="side_nav">
                        <a href="" class="p-3">
                            <img class="mx-2"style={{width: 200}} src="/assets/logo random.png" />
                        </a>
                        <hr class="text-white mt-2" />
                        <ul class="nav nav-pills flex-column mt-3">
                            <NavLink to="/admin" className={({isActive}) => isActive? "active" : null} id="links">
                                <li class="nav-item p-2 mb-2">
                                    <a class="text-decoration-none p-1">
                                        <i class="bi bi-speedometer2 me-3 fs-5"></i>
                                        <span class="fs-5">Dashboard</span>
                                    </a>
                                </li>
                            </NavLink>
                            <NavLink to="/announcements" className={({isActive}) => isActive? "active" : null} id="links">
                                <li class="nav-item p-2 mb-2">
                                    <a class="text-decoration-none p-1">
                                        <i class="bi bi-megaphone me-3 fs-5"></i>
                                        <span class="fs-5">Announcements</span>
                                    </a>
                                </li>
                            </NavLink>
                            <NavLink to="/accounts" className={({isActive}) => isActive? "active" : null} id="links">
                                <li class="nav-item p-2 mb-2">
                                    <a class="text-decoration-none p-1">
                                        <i class="bi bi-people me-3 fs-5"></i>
                                        <span class="fs-5">Accounts</span>
                                    </a>
                                </li>
                            </NavLink>
                            <NavLink to="/assignments" className={({isActive}) => isActive? "active" : null} id="links">
                                <li class="nav-item p-2 mb-2">
                                    <a class="text-decoration-none p-1">
                                        <i class="bi bi-table me-3 fs-5"></i>
                                        <span class="fs-5">Assignments</span>
                                    </a>
                                </li>
                            </NavLink>
                        </ul>      
                    </div>
                    <div>
                        <hr class="text-white mt-2" />
                        <div class="nav-item p-2" onClick={logout}>
                            <a class="text-decoration-none p-1 text-white">
                                <i class="bi bi-box-arrow-left me-3 fs-5"></i>
                                <span class="fs-5">Logout</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </body>
    </>
    )
}

export default AdminNavbar;