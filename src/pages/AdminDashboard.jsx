import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './styles/admin.css';
import './styles/dashboard.css';

function AdminDashboard() {
  const [staffCount, setStaffCount] = useState();
  const [empCount, setEmpCount] = useState();
  const [mngCount, setMngCount] = useState();
  const [asgnCount, setAsgnCount] = useState();
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8800/staffCount')
		.then(res => {
			setStaffCount(res.data[0].staff)
		}).catch(err => console.log(err));

    axios.get('http://localhost:8800/managerCount')
		.then(res => {
			setMngCount(res.data[0].manager)
		}).catch(err => console.log(err));

    axios.get('http://localhost:8800/employeeCount')
		.then(res => {
			setEmpCount(res.data[0].employee)
		}).catch(err => console.log(err));

    axios.get('http://localhost:8800/asgnCount')
		.then(res => {
			setAsgnCount(res.data[0].asgn)
		}).catch(err => console.log(err));

    axios.get('http://localhost:8800/recentAsgn')
		.then(res => {
			setData(res.data)
		}).catch(err => console.log(err));
  } , [])

  return (
    <div class="admin-container">
      <h2 class="pb-3 mb-3">Admin Dashboard</h2>

      <div class="row mb-3">

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

      <div class="row">

        <div class="col">

          <div class="row row-cols-2">
            <div class="col">
              <div class="data-container d-flex align-items-center justify-content-between p-3" id="acc">
                <div class="ps-4">
                  <h4>Manager</h4>
                  <div class="py-2 fs-4">{mngCount}</div>
                </div>
                <div><i class="bi bi-people fs-1 pe-5"></i></div>
              </div>
            </div>

            <div class="col">
              <div class="data-container d-flex align-items-center justify-content-between p-3" id="acc">
                <div class="ps-4">
                  <h4>Employee</h4>
                  <div class="py-2 fs-4">{empCount}</div>
                </div>
                <div><i class="bi bi-people fs-1 pe-5"></i></div>
              </div>
            </div>

            
          </div>
        
        </div>

        <div class="col">

          <div class="data-container py-4 px-3">
            <div class="px-4">
              <h4 class="text-black mb-3">Recent Assignments</h4>
              <table class="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Client Name</th>
                    <th>Machine Type</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((recent, index) => {
                    return <tr key={index}>
                      <td>{recent.id}</td>
                      <td>{recent.client}</td>
                      <td>{recent.machinetype}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
        
      </div>
      
    </div>
  )
}

export default AdminDashboard;