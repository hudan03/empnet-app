import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './styles/admin.css';
import './styles/adminDash.css';

function AdminDashboard() {
  const [staffCount, setStaffCount] = useState();
  const [asgnCount, setAsgnCount] = useState();

  useEffect(() => {
    axios.get('http://localhost:8800/staffCount')
		.then(res => {
			setStaffCount(res.data[0].staff)
		}).catch(err => console.log(err));

    axios.get('http://localhost:8800/asgnCount')
		.then(res => {
			setAsgnCount(res.data[0].asgn)
		}).catch(err => console.log(err));
  } , [])

  return (
    <div class="admin-container">
      <h2 class="pb-3 mb-3">Admin Dashboard</h2>

      <div class="row">

        <div class="col">
          <div class="data-container d-flex align-items-center justify-content-between p-3" id="acc">
            <div class="ps-4">
              <h4>Registered Account</h4>
              <div class="py-2 fs-4">{staffCount}</div>
            </div>
            <div><i class="bi bi-people fs-1 pe-5"></i></div>
          </div>
        </div>

        <div class="col">
          <div class="data-container d-flex align-items-center justify-content-between p-3" id="asgn">
            <div class="ps-4">
              <h4>Active Assignments</h4>
              <div class="py-2 fs-4">{asgnCount}</div>
            </div>
            <div><i class="bi bi-table fs-1 pe-5"></i></div>
          </div>
        </div>

      </div>

      <div class="card mt-3">
        <div class="card-header">
          Featured
        </div>
        <div class="card-body">
          <h5>Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      
    </div>
  )
}

export default AdminDashboard;