import React, { useEffect, useState } from 'react'
import './styles/staff.css';
import './styles/staffCard.css';
import axios from 'axios'

function ManagerAssignments() {
  const [data, setData] = useState([]) 
  const [values, setValues] = useState({
    client: '',
    machinetype: '',
    capacity: ''
  })
  const [asgnDetails, setAsgnDetails] = useState([])

  const handleSubmit = (e) => {
    axios.post('https://empnet.onrender.com/managerAssignments', values)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    axios.delete('https://empnet.onrender.com/managerAssignments/'+id)
    .then(res => {
        window.location.reload();
    })
    .catch(err => console.log(err))
  }

  const showDetail = (id) => {
    axios.get('https://empnet.onrender.com/managerAssignments/'+id)
        .then(res => {
            console.log(res)
            setAsgnDetails(res.data[0])
        })
        .catch(err => console.log(err))
  }

  const handleUpdate = (id) => {
    axios.put('https://empnet.onrender.com/managerAssignments/'+id, asgnDetails)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  useEffect(() => {
      axios.get('https://empnet.onrender.com/managerAssignments')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
    }, [])


  return (
    <>
      <div class="staff-container d-flex my-5">
        <div class="w-100 bg-white rounded p-5">
          <h2 class="pb-3 ms-4">Active Assignments</h2>
          <div class="d-flex">
            <button type="button" class="btn btn-success ms-4" data-bs-toggle="modal" data-bs-target="#addAsgn">
              Add Assignment
            </button>
          </div>

          <div class="asgn-container justify-content-center p-4 mt-3">
            <div class="row row-cols-2">
              {data.map((record, index) => {
                  console.log(record);
                  return (
                    <>
                      <div class="col">
                        <div key={index}>
                          <div class="record-container">
                            <div class="d-flex align-items-center justify-content-between p-3">
                              <div class="mt-3 ps-4">
                                <h4>{record.client}</h4>
                                <div class="py-2 fs-4">{record.machinetype}</div>
                              </div>
                              <div class="px-3">
                                <button class="btn btn-sm btn-primary me-3" onClick={() => showDetail(record.id)} data-bs-toggle="modal" data-bs-target="#editAsgn"><i class="fa-solid fa-pen-to-square pe-2"></i>Edit</button>
                                <button class="btn btn-sm btn-danger me-3" onClick={() => handleDelete(record.id)}><i class="fa-solid fa-trash pe-2"></i>Delete</button>
                              </div>
                            </div>
                            <hr class="text-black" />
                            <div class="d-flex flex-column p-3">
                              <h5 class="ps-4">Jobset</h5>
                              <div class="ps-4 my-3">
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
                              </div>
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

        <div class="modal fade" id="addAsgn" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Adding Assignments</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="modal-body">
                            <div class="mb-2">
                                <label htmlFor="">Client Name</label>
                                <input type="text" placeholder="Enter Client Name" class="form-control" 
                                onChange={e => setValues({...values, client: e.target.value})}/>
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Machine Type</label>
                                <input type="text" placeholder="Enter Machine Type" class="form-control" 
                                onChange={e => setValues({...values, machinetype: e.target.value})}/>
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Machine Capacity</label>
                                <input type="text" placeholder="Enter Machine Capacity" class="form-control" 
                                onChange={e => setValues({...values, capacity: e.target.value})}/>
                            </div> 
                            <div class="mb-2">
                                <label htmlFor="">Jobset</label>
                                <input type="text" placeholder="Enter Jobset" class="form-control" 
                                onChange={e => setValues({...values, jobset: e.target.value})}/>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-success">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal fade" id="editAsgn" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editing Accounts</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={() => handleUpdate(asgnDetails.id)}>
                        <div class="modal-body">
                            <div class="mb-2">
                                <label htmlFor="">Client Name</label>
                                <input type="text" value={asgnDetails.client} class="form-control" 
                                onChange={e => setAsgnDetails({...asgnDetails, client: e.target.value})}/>
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Machine Type</label>
                                <input type="text" value={asgnDetails.machinetype} class="form-control" 
                                onChange={e => setAsgnDetails({...asgnDetails, machinetype: e.target.value})}/>
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Machine Capacity</label>
                                <input type="text" value={asgnDetails.capacity} class="form-control" 
                                onChange={e => setAsgnDetails({...asgnDetails, capacity: e.target.value})}/>
                            </div> 
                            <div class="mb-2">
                                <label htmlFor="">Jobset</label>
                                <input type="text" value={asgnDetails.jobset} class="form-control" 
                                onChange={e => setAsgnDetails({...asgnDetails, jobset: e.target.value})}/>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-success">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default ManagerAssignments