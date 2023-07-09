import React, { useEffect, useState } from 'react'
import './styles/staff.css';
import './styles/staffCard.css';
import axios from 'axios'

function EmployeeAssignments () {
  const [data, setData] = useState([]) 
  const [values, setValues] = useState({
    clientName: '',
    machineType: '',
    capacity: '',
  })
  const [msg, setMsg] = useState("");
  const [record, setRecord] = useState([]);

  const getAssignments = async () => {
    const response = await axios.get('https://empnet-api.onrender.com/asgn');
    setData(response.data);
  }

  const showDetail = async (asgnId) => {
    try {
        const response = await axios.get(`https://empnet-api.onrender.com/asgn/${asgnId}`);
        setRecord(response.data);
    } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
    }
  }

  useEffect(() => {
    getAssignments();
  }, [])

  return (
    <>
      <div class="staff-container d-flex my-5">
        <div class="w-100 bg-white rounded p-5">
          <h2 class="ms-4">Active Assignments</h2>

          <div class="asgn-container justify-content-center p-4 mt-3" id="employee">
            <div class="row row-cols-2">
              {data.map((asgn, index) => {
                  console.log(record);
                  return (
                    <>
                      <div class="col">
                        <div key={asgn.uuid}>
                          <div class="record-container">
                            <div class="d-flex align-items-center justify-content-between p-3">
                              <div class="mt-3 ps-4">
                                <h4>{asgn.clientName}</h4>
                                <div class="py-2 fs-4">{asgn.machineType}</div>
                              </div>
                              <div class="px-3">
                                <button class="btn btn-sm btn-primary me-3" onClick={() => showDetail(asgn.uuid)} data-bs-toggle="modal" data-bs-target="#detailRecord"><i class="fa-solid fa-pen-to-square pe-2"></i>Details</button>
                              </div>
                            </div>
                            <hr class="text-black" />
                            <div class="d-flex flex-column p-3">
                              <h5 class="ps-4">Jobset</h5>
                              {/* <div class="ps-4 my-3">
                                {record.repair == "1" ? (
                                  <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Repair
                                    </label>
                                  </div>
                                ) : null}
                                {record.reinforce == "1" ? (
                                  <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Reinforce
                                    </label>
                                  </div>
                                ) : null}
                                {record.manufacture == "1" ? (
                                  <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Manufacture
                                    </label>
                                  </div>
                                ) : null}
                                {record.resize == "1" ? (
                                  <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Resize
                                    </label>
                                  </div>
                                ) : null}
                                {(record.repair == null && record.manufacture == null && record.resize == null && record.reinforce == null) ? (
                                  <div>No job found</div>
                                ) : null}
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
              })}
            </div>
          </div>
        </div>

        <div class="modal fade" id="detailRecord" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editing Accounts</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>
                      <fieldset disable>
                        <div class="modal-body">
                            <div class="mb-2">
                                <label htmlFor="">Client Name</label>
                                <input type="text" value={record.clientName} class="form-control" />
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Machine Type</label>
                                <input type="text" value={record.machineType} class="form-control" />
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Machine Capacity</label>
                                <input type="text" value={record.capacity} class="form-control" />
                            </div> 
                            <div class="mb-2">
                                <label htmlFor="">Jobset</label>
                                <input type="text" placeholder="jobset list" class="form-control" />
                            </div>
                        </div>
                      </fieldset>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </>
  )
  }

export default EmployeeAssignments;