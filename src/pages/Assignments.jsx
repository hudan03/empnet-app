import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './styles/admin.css';

function Assignments() {
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

  const handleDelete = async (asgnId) => {
    await axios.delete(`https://empnet-api.onrender.com/asgn/${asgnId}`);
    getAssignments();
  }

  const handleSubmit = async (e) => {
    try {
        await axios.post('https://empnet-api.onrender.com/asgn/', values);
    } catch (error) {
        if(error.response) {
            setMsg(error.response.data.msg);
        }
    }
  }

  const handleUpdate = async (userId) => {
    try {
      await axios.patch(`https://empnet-api.onrender.com/asgn/${userId}`, record);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getAssignments();
  }, [])

  // Show assignments admin view
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
                        <th>No</th>
                        <th>Client Name</th>
                        <th>Machine Type</th>
                        <th>Machine Capacity</th>
                        <th>Jobset</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    {data.map((asgn, index) => {
                        return <tr key={asgn.uuid}>
                            <td>{index + 1}</td>
                            <td>{asgn.clientName}</td>
                            <td>{asgn.machineType}</td>
                            <td>{asgn.capacity}</td>
                            <td></td>
                            <td>Incomplete</td>
                            <td>
                                {/*Handle edit*/}
                                <button class="btn btn-sm btn-primary me-1" onClick={() => showDetail(asgn.uuid)} data-bs-toggle="modal" data-bs-target="#editAccount"><i class="fa-solid fa-pen-to-square"></i></button>
                                {/*Handle delete*/}
                                <button class="btn btn-sm btn-danger me-1" onClick={() => handleDelete(asgn.uuid)}><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>

        {/*Modal functions to add accounts*/}

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
                                onChange={e => setValues({...values, clientName: e.target.value})} />
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Machine Type</label>
                                <input type="text" placeholder="Enter Machine Type" class="form-control" 
                                onChange={e => setValues({...values, machineType: e.target.value})} />
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Machine Capacity</label>
                                <input type="text" placeholder="Enter Machine Capacity" class="form-control" 
                                onChange={e => setValues({...values, capacity: e.target.value})} />
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


        {/*Modal functions to edit assignments*/}

        <div class="modal fade" id="editAccount" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editing Accounts</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={() => handleUpdate(record.uuid)}>
                        <div class="modal-body">
                            <div class="mb-2">
                                <label htmlFor="">Client Name</label>
                                <input type="text" value={record.clientName} class="form-control" 
                                onChange={e => setRecord({...record, clientName: e.target.value})}/>
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Machine Type</label>
                                <input type="text" value={record.machineType} class="form-control" 
                                onChange={e => setRecord({...record, machineType: e.target.value})}/>
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Machine Capacity</label>
                                <input type="text" value={record.capacity} class="form-control" 
                                onChange={e => setRecord({...record, capacity: e.target.value})}/>
                            </div> 
                            {/* <div class="mb-2">
                                <label htmlFor="">Jobset</label>
                                {asgnDetails.repair == "1" ? (
                                  <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Repair
                                    </label>
                                  </div>
                                ) : null}
                                {asgnDetails.reinforce == "1" ? (
                                  <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Reinforce
                                    </label>
                                  </div>
                                ) : null}
                                {asgnDetails.manufacture == "1" ? (
                                  <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Manufacture
                                    </label>
                                  </div>
                                ) : null}
                                {asgnDetails.resize == "1" ? (
                                  <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Resize
                                    </label>
                                  </div>
                                ) : null}
                                {(asgnDetails.repair == null && asgnDetails.manufacture == null && asgnDetails.resize == null && asgnDetails.reinforce == null) ? (
                                  <div>No job found</div>
                                ) : null}
                            </div> */}
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