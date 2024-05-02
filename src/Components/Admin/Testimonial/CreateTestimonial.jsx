import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import formValidation from "../../CustomValidation/formValidation"
import { addTestimonial, getTestimonial } from "../../../Store/ActionCreators/TestimonialActionCreators"
export default function CreateTestimonial() {
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field Must",
        profile: "Profile Field Must",
        message: "Message Field Must",
        pic: "Pic Field Must"
    })
    let [show, setShow] = useState(false)
    let [data, setData] = useState({
        name: "",
        profile: "",
        pic: "",
        message: ""
    })
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let TestimonialStateData = useSelector((state) => state.TestimonialStateData)
    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: formValidation(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function getInputFile(e) {
        let { name, files } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: ""
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: files[0]
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        let error = Object.keys(errorMessage).find(x => errorMessage[x] && errorMessage[x].length !== 0)
        if (!error) {
            var formData = new FormData()
            formData.append("name", data.name)
            formData.append("profile", data.profile)
            formData.append("message", data.message)
            formData.append("pic", data.pic)
            dispatch(addTestimonial(formData))
            navigate("/admin/testimonial")
        }
        else
            setShow(true)
    }
    function getAPIData() {
        dispatch(getTestimonial())
    }
    useEffect(() => {
        getAPIData()
    }, [TestimonialStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light p-2 text-center'>Testimonial</h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" name='name' onChange={getInputData} className='form-control' placeholder='Name' />
                                {
                                    show ? <p className='text-danger'>{errorMessage.name}</p> : ""
                                }
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Profile</label>
                                    <input type="text" name='profile' onChange={getInputData} className='form-control' placeholder='Profile' />
                                    {
                                        show ? <p className='text-danger'>{errorMessage.profile}</p> : ""
                                    }
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file" name='pic' onChange={getInputFile} className='form-control' />
                                    {
                                        show ? <p className='text-danger'>{errorMessage.pic}</p> : ""
                                    }
                                </div>
                            </div>
                            <div className="mb-3">
                                <label>Message</label>
                                <textarea name="message" rows="5" placeholder='Message...' onChange={getInputData} className='form-control'></textarea>
                                {
                                    show ? <p className='text-danger'>{errorMessage.message}</p> : ""
                                }
                            </div>
                            <div className="mb-3">
                                <button type='button' className='btn btn-success w-50' onClick={() => window.history.back()}>Back</button>
                                <button type="submit" className='btn btn-primary w-50'>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
