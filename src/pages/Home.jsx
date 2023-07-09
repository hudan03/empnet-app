import React, { useEffect, useState } from 'react'
import './styles/staff.css';
import axios from 'axios'

function Home() {
    // const [data, setData] = useState([]) 

    // useEffect(() => {
    //     axios.get('http://localhost:8800/home')
    //     .then(res => setData(res.data))
    //     .catch(err => console.log(err));
    //   }, [])

    return (
        <>
            <div class="staff-container d-flex my-5">
                <div class="w-100 bg-white rounded p-5">
                    <h2 class="ms-4 mb-5">Welcome to the system</h2>

                    {/* {data.map((news, index) => {
                        return (
                            <>
                                <div key={index}>
                                    <div class="ms-4 mb-4">
                                        <h4>{news.title}</h4>
                                        <div>{news.content}</div>
                                    </div>
                                </div>
                            </>
                        )
                    })} */}
                </div>
            </div>
        </>
    );
}

export default Home;