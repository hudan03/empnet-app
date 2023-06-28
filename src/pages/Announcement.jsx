import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './styles/admin.css';

function Announcement() {
  const [data, setData] = useState([]) 
  const [values, setValues] = useState({
    title: '',
    content: ''
  })
  const [announcementContent, setAnnouncementContent] = useState([])

  const handleSubmit = (e) => {
    axios.post('https://empnet.onrender.com/announcements', values)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    axios.delete('https://empnet.onrender.com/announcements/'+id)
    .then(res => {
        window.location.reload();
    })
    .catch(err => console.log(err))
  }

  const showDetail = (id) => {
    axios.get('https://empnet.onrender.com/announcements/'+id)
        .then(res => {
            console.log(res)
            setAnnouncementContent(res.data[0])
        })
        .catch(err => console.log(err))
  }

  const handleUpdate = (id) => {
    axios.put('https://empnet.onrender.com/announcements/'+id, announcementContent)
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

  useEffect(() => {
    axios.get('https://empnet.onrender.com/announcements')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])

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
                                <button class="btn btn-sm btn-primary me-1" onClick={() => showDetail(annc.id)} data-bs-toggle="modal" data-bs-target="#editAnnouncement"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="btn btn-sm btn-danger me-1" onClick={() => handleDelete(annc.id)}><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>

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