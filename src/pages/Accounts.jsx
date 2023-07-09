import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styles/admin.css';

function Accounts() {
  const [data, setData] = useState([]) 
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: '',
    role: ''
  })
  const [msg, setMsg] = useState("");
  const [staffName, setStaffName] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [staffConfPassword, setStaffConfPassword] = useState("");
  const [staffRole, setStaffRole] = useState("");
  const [staffUUID, setStaffUUID] = useState("");

  const options = [
    {label: "Admin", value: "admin"},
    {label: "Manager", value: "manager"},
    {label: "Employee", value: "employee"},
  ]

  const getUsers = async () => {
    const response = await axios.get('http://localhost:8800/users');
    setData(response.data);
  }

  const showDetail = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:8800/users/${userId}`);
        setStaffUUID(response.data.uuid);
        setStaffName(response.data.name);
        setStaffEmail(response.data.email);
        setStaffRole(response.data.role);
    } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
    }
  }

  const handleDelete = async (userId) => {
    await axios.delete(`http://localhost:8800/users/${userId}`);
    getUsers();
  }

  const handleSubmit = async (e) => {
    try {
        await axios.post('http://localhost:8800/users/', values);
    } catch (error) {
        if(error.response) {
            setMsg(error.response.data.msg);
        }
    }
  }

  const handleUpdate = async (userId) => {
    try {
      await axios.patch(`http://localhost:8800/users/${userId}`, {
        name: staffName,
        email: staffEmail,
        password: staffPassword,
        confPassword: staffConfPassword,
        role: staffRole,
      });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getUsers();
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
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Account Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    {data.map((staff, index) => {
                        return <tr key={staff.uuid}>
                            <td>{index + 1}</td>
                            <td>{staff.name}</td>
                            <td>{staff.email}</td>
                            <td>{staff.role}</td>
                            <td>
                                {/*Handle edit*/}
                                <button class="btn btn-sm btn-primary me-1" onClick={() => showDetail(staff.uuid)} data-bs-toggle="modal" data-bs-target="#editAccount"><i class="fa-solid fa-pen-to-square"></i></button>
                                {/*Handle delete*/}
                                <button class="btn btn-sm btn-danger me-1" onClick={() => handleDelete(staff.uuid)}><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>

        {/*Modal functions to add accounts*/}

        <div class="modal fade" id="addAccount" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Adding Accounts</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <p>{msg}</p>
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
                                <label htmlFor="">Confirm Password</label>
                                <input type="text" placeholder="Confirm Password" class="form-control" 
                                onChange={e => setValues({...values, confPassword: e.target.value})}/>
                            </div> 
                            <div class="mb-2">
                                <label htmlFor="">Account Role</label>
                                <select class="form-select" onChange={e => setValues({...values, role: e.target.value})}>
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


        {/*Modal functions to edit accounts*/}

        <div class="modal fade" id="editAccount" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editing Accounts</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={() => handleUpdate(staffUUID)}>
                        <div class="modal-body">
                            <div class="mb-2">
                                <label htmlFor="">Name</label>
                                <input type="text" value={staffName} class="form-control" 
                                onChange={(e) => setStaffName(e.target.value)}/>
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Email</label>
                                <input type="email" value={staffEmail} class="form-control" 
                                onChange={(e) => setStaffEmail(e.target.value)}/>
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Password</label>
                                <input type="text" placeholder="********" class="form-control" 
                                onChange={(e) => setStaffPassword(e.target.value)}/>
                            </div> 
                            <div class="mb-2">
                                <label htmlFor="">Confirm Password</label>
                                <input type="text" placeholder="********" class="form-control" 
                                onChange={(e) => setStaffConfPassword(e.target.value)}/>
                            </div> 
                            <div class="mb-2">
                                <label htmlFor="">Account Type</label>
                                <select class="form-select" value={staffRole}
                                onChange={(e) => setStaffRole(e.target.value)}>
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