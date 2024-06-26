import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteContactUs, getContactUs, updateContactUs } from "../../../Store/ActionCreators/ContactUsActionCreators"
export default function ShowContact() {
    let { _id } = useParams()
    let [data, setData] = useState([])
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let ContactUsStateData = useSelector((state) => state.ContactUsStateData)
    function updateItem() {
        dispatch(updateContactUs({ ...data, active: false }))
        setData((old) => {
            return {
                ...old,
                'active': false
            }
        })
    }
    function deleteItem() {
        if (window.confirm("Are You Sure!!! You Want to Delete tha Item! Please Cofirm : ")) {
            dispatch(deleteContactUs({ _id: _id }))
            getAPIData()
        }
        navigate("/admin/contactus")
    }
    function getAPIData() {
        dispatch(getContactUs())
        if (ContactUsStateData.length) {
            setData(ContactUsStateData.find((x) => x._id === _id))
        }
    }
    useEffect(() => {
        getAPIData()
    }, [ContactUsStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light p-2 text-center'>ContactUs Query</h5>
                        <table className='table table-bordered table-striped table-hover'>
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{data._id}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{data.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{data.phone}</td>
                                </tr>
                                <tr>
                                    <th>Subject</th>
                                    <td>{data.subject}</td>
                                </tr>
                                <tr>
                                    <th>Message</th>
                                    <td>{data.message}</td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>{new Date(data.date).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{data.active?"Active":"Inactive"}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        {
                                            data.active === true ?
                                                <button className='btn btn-success w-100 text-light' onClick={updateItem}>Update Status to Done</button> :
                                                <button className='btn btn-primary w-100 text-light' onClick={deleteItem}>Delete</button>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
