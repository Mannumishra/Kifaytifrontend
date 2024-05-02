import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'react-data-table-component';

import { deleteContactUs, getContactUs } from "../../../Store/ActionCreators/ContactUsActionCreators"
export default function ContactUs() {
    const columns = [
        {
            name: 'Id',
            selector: row => row._id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'Subject',
            selector: row => row.subject,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.active?"Active":"In active",
            sortable: true,
        },
        {
            name: 'Show',
            sortable: false,
            selector:row=><Link to={`/admin/contactus/show/${row._id}`}><i className='fa fa-eye text-success'></i></Link>
        },
        {
            name: 'Delete',
            sortable: false,
            selector:row=>row.active?"":<button className='btn' onClick={()=>deleteItem(row._id)}><i className='fa fa-trash text-danger'></i></button>
        },
    ]
    let [data, setData] = useState([])
    let dispatch = useDispatch()
    let ContactUsStateData = useSelector((state) => state.ContactUsStateData)
    function deleteItem(_id) {
        if (window.confirm("Are You Sure!!! You Want to Delete tha Item! Please Cofirm : ")) {
            dispatch(deleteContactUs({ _id: _id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getContactUs())
        if (ContactUsStateData.length) {
            setData(ContactUsStateData)
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
                        <h5 className='bg-primary text-light p-2 text-center'>ContactUs</h5>
                        <div className="table-responsive">
                            {/* <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item._id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.subject.slice(0, 100) + "..."}</td>
                                                <td>{new Date(item.date).toLocaleDateString()}</td>
                                                <td>{item.active?"Active":"Inactive"}</td>
                                                <td><Link to={`/admin/contactus/show/${item._id}`}><i className='fa fa-eye text-success'></i></Link></td>
                                                <td>
                                                    {
                                                        item.active === false ?
                                                            <button className='btn' onClick={() => deleteItem(item._id)}><i className='fa fa-trash text-danger'></i></button> :
                                                            ""
                                                    }
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table> */}
                            <DataTable
                                className='table'
                                columns={columns}
                                data={data}
                                pagination = {true}
                                load
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
