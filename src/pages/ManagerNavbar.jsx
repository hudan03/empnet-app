import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './styles/navstyles.css';
import axios from 'axios';

function ManagerNavbar(){

    const [name, setName] = useState('')
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8800/staff')
        .then(res => {
            if(res.data.Status === "Success") {
                setName(res.data.name);
            } else {
                navigate('/');
            }
        })
        .catch(err => console.log(err))
    }, []) 

    const handleLogout = () => {
        axios.get('http://localhost:8800/logout')
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/');
            } else {
                alert("error");
            }
            
        })
        .catch(err => console.log(err))
    }

        return (
            <>
                <body>
                    <div class="d-flex flex-column">
                        <div class="nav-container d-flex flex-row justify-content-between align-items-center text-white p-3">
                            <div class="left d-flex flex-row">
                                <div class="brand-container">
                                    <img class="image px-3" src="/assets/logo random.png" alt="logo" />
                                </div>

                                <ul class="d-flex flex-row p-3 mb-0" id="navbar-item">
                                    <NavLink id="links" to="/managerHome" className={({isActive}) => isActive? "active" : null}>
                                        <li>
                                            <a class="text-decoration-none px-3 fs-5"> 
                                                Home 
                                            </a>
                                        </li>
                                    </NavLink>
                                    <NavLink id="links" to="/managerDashboard" className={({isActive}) => isActive? "active" : null}>
                                        <li>
                                            <a class="text-decoration-none px-3 fs-5"> 
                                                Dashboard 
                                            </a>
                                        </li>
                                    </NavLink>
                                    <NavLink id="links" to="/managerAssignments" className={({isActive}) => isActive? "active" : null}>
                                        <li>
                                            <a class="text-decoration-none px-3 fs-5"> 
                                                Manage Assignments
                                            </a>
                                        </li>
                                    </NavLink>
                                </ul>
                            </div>

                            <div class="btn-group px-3">
                                <button type="button" class="btn btn-light fs-5">
                                    <i class="bi bi-person-circle pe-3 fs-5"></i>Hudan Aryajudanta
                                </button>
                                <button type="button" class="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Profile</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" onClick={handleLogout} href="#">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                        <Outlet />
                    </div>
                </body>
            </>
        );

}

export default ManagerNavbar