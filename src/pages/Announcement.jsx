import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './styles/admin.css';

function Announcement() {
  const [data, setData] = useState([]) 
  const [values, setValues] = useState({
    title: '',
    content: ''
  })


  const [announcementContent, setAnnouncementContent] = useState([])

  // Handle add announcement function
  const handleSubmit = (e) => {
    axios.post('http://localhost:8800/announcements', values)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  // Handle delete announcement hook
  const handleDelete = (id) => {
    axios.delete('http://localhost:8800/announcements/'+id)
    .then(res => {
        window.location.reload();
    })
    .catch(err => console.log(err))
  }

  const showDetail = (id) => {
    axios.get('http://localhost:8800/announcements/'+id)
        .then(res => {
            console.log(res)
            setAnnouncementContent(res.data[0])
        })
        .catch(err => console.log(err))
  }

  //handle update announcement hook
  const handleUpdate = (id) => {
    axios.put('http://localhost:8800/announcements/'+id, announcementContent)
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

  // Handle show announcement hook
  useEffect(() => {
    axios.get('http://localhost:8800/announcements')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])

  // Admin show announcements function
  return (
    <>
      <div class="admin-container d-flex vh-100 justify-content-center">
        <div class="w-100 bg-white rounded p-4">
            <h2 class="pb-3">Active Announcement</h2>
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addAnnouncement">
                    Add Announcement
                </button>
            </div>
            <table class="table table-hover align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    {data.map((annc, index) => {
                        return <tr key={index}>
                            <td>{annc.id}</td>
                            <td>{annc.title}</td>
                            <td>
                                {/*Handle edit*/}
                                <button class="btn btn-sm btn-primary me-1" onClick={() => showDetail(annc.id)} data-bs-toggle="modal" data-bs-target="#editAnnouncement"><i class="fa-solid fa-pen-to-square"></i></button>
                                {/*Handle delete*/}
                                <button class="btn btn-sm btn-danger me-1" onClick={() => handleDelete(annc.id)}><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>

        {/*Modal function to add new announcement*/}
        <div class="modal fade" id="addAnnouncement" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Adding Accounts</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="modal-body">
                            <div class="mb-2">
                                <label htmlFor="">Title</label>
                                <input type="text" placeholder="Enter Title" class="form-control" 
                                onChange={e => setValues({...values, title: e.target.value})}/>
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Content</label>
                                <textarea placeholder="Content" class="form-control" 
                                onChange={e => setValues({...values, content: e.target.value})}/>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-success">Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        {/*Modal function to edit announcement*/}
        <div class="modal fade" id="editAnnouncement" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editing Accounts</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={() => handleUpdate(announcementContent.id)}>
                        <div class="modal-body">
                            <div class="mb-2">
                                <label htmlFor="">Title</label>
                                <input type="text" value={announcementContent.title} class="form-control" 
                                onChange={e => setAnnouncementContent({...announcementContent, title: e.target.value})}/>
                            </div>
                            <div class="mb-2">
                                <label htmlFor="">Content</label>
                                <textarea value={announcementContent.content} class="form-control" 
                                onChange={e => setAnnouncementContent({...announcementContent, content: e.target.value})}/>
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

export default Announcement;