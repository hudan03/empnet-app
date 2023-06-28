import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './styles/admin.css';

function Assignments() {
  const [data, setData] = useState([]) 
  const [values, setValues] = useState({
    client: '',
    machinetype: '',
    capacity: '',
    repair: '',
    reinforce: '',
    manufacture: '',
    resize: ''
  })
  const [asgnDetails, setAsgnDetails] = useState([])

  const handleSubmit = (e) => {
    axios.post('https://empnet.onrender.com/assignments', values)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    axios.delete('https://empnet.onrender.com/assignments/'+id)
    .then(res => {
        window.location.reload();
    })
    .catch(err => console.log(err))
  }

  const showDetail = (id) => {
    axios.get('https://empnet.onrender.com/assignments/'+id)
        .then(res => {
            console.log(res)
            setAsgnDetails(res.data[0])
        })
        .catch(err => console.log(err))
  }

  const handleUpdate = (id) => {
    axios.put('https://empnet.onrender.com/assignments/'+id, asgnDetails)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get('https://empnet.onrender.com/assignments')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])

  return (
    <>
      <div class="admin-container d-flex vh-100 justify-content-center">
        <div class="w-100 bg-white rounded p-4">
            <h2 class="pb-3">Active Assignments list</h2>
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addAsgn">
                    Add Assignment
                </button>
            </div>
            <table class="table table-hover align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Client Name</th>
                        <th>Machine Type</th>
                        <th>Machine Capacity</th>
                        <th>Jobset</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    {data.map((asgn, index) => {
                        return <tr key={index}>
                            <td>{asgn.id}</td>
                            <td>{asgn.client}</td>
                            <td>{asgn.machinetype}</td>
                            <td>{asgn.capacity}</td>
                            <td>{asgn.jobset}</td>
                            <td>
                                <button class="btn btn-sm btn-primary me-1" onClick={() => showDetail(asgn.id)} data-bs-toggle="modal" data-bs-target="#editAccount"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="btn btn-sm btn-danger me-1" onClick={() => handleDelete(asgn.id)}><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
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
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Repair
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Reinforce
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Manufacture
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Resize
                                    </label>
                                </div>
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

        <div class="modal fade" id="editAccount" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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

export default Assignments;