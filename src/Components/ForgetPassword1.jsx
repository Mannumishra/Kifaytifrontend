import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgetPassword1() {
    let [data, setData] = useState({
        username: ""
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()
    function getInputData(e) {
        var { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        let response = await fetch("/api/user/forget-password-1", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ username: data.username })
        })
        response = await response.json()
        if (response.status === 200) {
            localStorage.setItem("password-reset-username", data.username)
            navigate("/forget-password-2")
        }
        else
            setShow(true)
    }
    return (
        <>
            <div className="container-fluid my-3">
                <div className="w-75 m-auto">
                    <h5 className='text-center bg-primary p-2 text-light'><span className='text-warning fs-3'>Reset</span> Password</h5>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <label>Username</label>
                            <input type="text" name="username" onChange={getInputData} placeholder='User Name' className='form-control' />
                            {
                                show ?
                                    <p className='text-danger'>Invalid Username</p>
                                    : ""
                            }                        
                        </div>
                        <div className="mb-3">
                            <div className="btn-group w-100">
                                <Link to="/login" className='btn btn-success'>Login</Link>
                                <button type="submit" className='btn btn-primary'>Send OTP</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
