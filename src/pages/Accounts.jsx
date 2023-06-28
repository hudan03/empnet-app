import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './styles/admin.css';

function Accounts() {
  const [data, setData] = useState([]) 
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    type: ''
  })
  const [staffDetails, setStaffDetails] = useState([])

  const options = [
    {label: "Admin", value: "admin"},
    {label: "Manager", value: "manager"},
    {label: "Employee", value: "employee"},
  ]

  const handleSubmit = (e) => {
    axios.post('https://empnet.onrender.com/accounts', values)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    axios.delete('https://empnet.onrender.com/accounts/'+id)
    .then(res => {
        window.location.reload();
    })
    .catch(err => console.log(err))
  }

  const showDetail = (id) => {
    axios.get('https://empnet.onrender.com/accounts/'+id)
        .then(res => {
            console.log(res)
            setStaffDetails(res.data[0])
        })
        .catch(err => console.log(err))
  }

  const handleUpdate = (id) => {
    axios.put('https://empnet.onrender.com/accounts/'+id, staffDetails)
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

  useEffect(() => {
    axios.get('https://empnet.onrender.com/accounts')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])

  return (
    <>
      <div class="admin-container d-flex vh-100 justify-content-center">
        <div class="w-100 bg-white rounded p-4">
            <h2 class="pb-3">Staff Account List</h2>
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addAccount">
                    Add Account
                </button>
            </div>
            <table class="table table-hover align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Account Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    {data.map((staff, index) => {
                        return <tr key={index}>
                            <td>{staff.id}</td>
                            <td>{staff.name}</td>
                            <td>{staff.email}</td>
                            <td>{staff.type}</td>
                            <td>
                                <button class="btn btn-sm btn-primary me-1" onClick={() => showDetail(staff.id)} data-bs-toggle="modal" data-bs-target="#editAccount"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="btn btn-sm btn-danger me-1" onClick={() => handleDelete(staff.id)}><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>

        <div class="modal fade" id="addAccount" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Adding Accounts</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="modal-body">
                            <div class="mb-2">
                                <label htmlFor="">Name</label>
                                <input type="text" placeholder="Enter Name" class="form-control" 
                                onChange={e => setValues({...values, name: e.target.value})}/>
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Email</label>
                                <input type="email" placeholder="Enter Email" class="form-control" 
                                onChange={e => setValues({...values, email: e.target.value})}/>
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Password</label>
                                <input type="text" placeholder="Enter Password" class="form-control" 
                                onChange={e => setValues({...values, password: e.target.value})}/>
                            </div> 
                            <div class="mb-2">
                                <label htmlFor="">Account Type</label>
                                <select class="form-select" onChange={e => setValues({...values, type: e.target.value})}>
                                    {options.map(option => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
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
                    <form onSubmit={() => handleUpdate(staffDetails.id)}>
                        <div class="modal-body">
                            <div class="mb-2">
                                <label htmlFor="">Name</label>
                                <input type="text" value={staffDetails.name} class="form-control" 
                                onChange={e => setStaffDetails({...staffDetails, name: e.target.value})}/>
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Email</label>
                                <input type="email" value={staffDetails.email} class="form-control" 
                                onChange={e => setStaffDetails({...staffDetails, email: e.target.value})}/>
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Password</label>
                                <input type="text" value={staffDetails.password} class="form-control" 
                                onChange={e => setStaffDetails({...staffDetails, password: e.target.value})}/>
                            </div> 
                            <div class="mb-2">
                                <label htmlFor="">Account Type</label>
                                <select class="form-select" value={staffDetails.type}
                                onChange={e => setStaffDetails({...staffDetails, type: e.target.value})}>
                                    {options.map(option => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
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

export default Accounts;