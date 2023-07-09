import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './styles/staff.css';
import './styles/dashboard.css';

function ManagerDashboard() {
  const [empCount, setEmpCount] = useState();
  const [asgnCount, setAsgnCount] = useState();
  const [repairCount, setRepairCount] = useState();
  const [reinforceCount, setReinforceCount] = useState();
  const [manufactureCount, setManufactureCount] = useState();
  const [resizeCount, setResizeCount] = useState();
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8800/employeeCount')
		.then(res => {
			setEmpCount(res.data[0].employee)
		}).catch(err => console.log(err));

    axios.get('http://localhost:8800/asgnCount')
		.then(res => {
			setAsgnCount(res.data[0].asgn)
		}).catch(err => console.log(err));

    axios.get('http://localhost:8800/repairCount')
		.then(res => {
			setRepairCount(res.data[0].repair)
		}).catch(err => console.log(err));

    axios.get('http://localhost:8800/reinforceCount')
		.then(res => {
			setReinforceCount(res.data[0].reinforce)
		}).catch(err => console.log(err));

    axios.get('http://localhost:8800/manufactureCount')
		.then(res => {
			setManufactureCount(res.data[0].manufacture)
		}).catch(err => console.log(err));

    axios.get('http://localhost:8800/resizeCount')
		.then(res => {
			setResizeCount(res.data[0].resize)
		}).catch(err => console.log(err));

    axios.get('http://localhost:8800/recentAsgn')
		.then(res => {
			setData(res.data)
		}).catch(err => console.log(err));
  } , [])

  return (
    <>
      <div class="staff-container d-flex my-5">
        <div class="w-100 bg-white rounded px-5 py-4">
          <h2 class="pb-2 ms-3 mb-2">Dashboard</h2>

          <hr class="text-black mb-4" />

          <div class="row mb-3">

            <div class="col">
              <div class="data-container d-flex align-items-center justify-content-between p-3" id="acc">
                <div class="ps-4">
                  <h4>Total Active Employee</h4>
                  <div class="py-2 fs-4">{empCount}</div>
                </div>
                <div><i class="bi bi-people fs-1 pe-5"></i></div>
              </div>
            </div>

            <div class="col">
              <div class="data-container d-flex align-items-center justify-content-between p-3" id="asgn">
                <div class="ps-4">
                  <h4>Total Assignments</h4>
                  <div class="py-2 fs-4">{asgnCount}</div>
                </div>
                <div><i class="bi bi-table fs-1 pe-5"></i></div>
              </div>
            </div>

          </div>

          <div class="row mb-3">

            <div class="col">
              <div class="data-container d-flex align-items-center justify-content-between p-3" id="job">
                <div class="ps-4">
                  <h4>Repair</h4>
                  <div class="py-2 fs-4">{repairCount}</div>
                </div>
                <div><i class="bi bi-wrench fs-1 pe-5"></i></div>
              </div>
            </div>

            <div class="col">
              <div class="data-container d-flex align-items-center justify-content-between p-3" id="job">
                <div class="ps-4">
                  <h4>Reinforce</h4>
                  <div class="py-2 fs-4">{reinforceCount}</div>
                </div>
                <div><i class="bi bi-hammer fs-1 pe-5"></i></div>
              </div>
            </div>

            <div class="col">
              <div class="data-container d-flex align-items-center justify-content-between p-3" id="job">
                <div class="ps-4">
                  <h4>Manufacture</h4>
                  <div class="py-2 fs-4">{manufactureCount}</div>
                </div>
                <div><i class="bi bi-gear fs-1 pe-5"></i></div>
              </div>
            </div>

            <div class="col">
              <div class="data-container d-flex align-items-center justify-content-between p-3" id="job">
                <div class="ps-4">
                  <h4>Resize</h4>
                  <div class="py-2 fs-4">{resizeCount}</div>
                </div>
                <div><i class="bi bi-rulers fs-1 pe-5"></i></div>
              </div>
            </div>

          </div>

          <div class="row mb-3">
            
            <div class="col">
              <div class="row mb-4">
                <div class="col">
                  <div class="data-container d-flex align-items-center justify-content-between p-3" id="job">
                    <div class="ps-4">
                      <h4>Completed Assignments</h4>
                      <div class="py-2 fs-4">0</div>
                    </div>
                    <div><i class="bi bi-people fs-1 pe-5"></i></div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="data-container d-flex align-items-center justify-content-between p-3" id="job">
                    <div class="ps-4">
                      <h4>Ongoing Assignments</h4>
                      <div class="py-2 fs-4">0</div>
                    </div>
                    <div><i class="bi bi-people fs-1 pe-5"></i></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="data-container d-flex align-items-center justify-content-between p-3" id="job">
                <div class="ps-4">
                  <h4>Recent Assignments</h4>
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
                <div><i class="bi bi-arrow-clockwise fs-1 pe-5"></i></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default ManagerDashboard