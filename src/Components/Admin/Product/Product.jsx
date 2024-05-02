import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'react-data-table-component';

import { deleteProduct, getProduct } from "../../../Store/ActionCreators/ProductActionCreators"
export default function Product() {
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
            name: 'Maincategory',
            selector: row => row.maincategory,
            sortable: true,
        },
        {
            name: 'Subcategory',
            selector: row => row.subcategory,
            sortable: true,
        },
        {
            name: 'Brand',
            selector: row => row.brand,
            sortable: true,
        },
        {
            name: 'Base Price',
            selector: row =><p>&#8377;{row.baseprice}</p>,
            sortable: true,
        },
        {
            name: 'Discount',
            selector: row =><p>{row.discount}% off</p>,
            sortable: true,
        },
        {
            name: 'Base Price',
            selector: row =><p>&#8377;{row.finalprice}</p>,
            sortable: true,
        },
        {
            name: 'Color',
            selector: row => row.color,
            sortable: true,
        },
        {
            name: 'Size',
            selector: row => row.size,
            sortable: true,
        },
        {
            name: 'Stock',
            selector: row => row.stock,
            sortable: true,
        },
        {
            name: 'Pic1',
            selector: row =><a href={`${process.env.REACT_APP_SERVER}/${row.pic1}`} target='_blank' rel="noreferrer"><img src={`/${row.pic1}`} height="50px" width="50px" alt="" /></a>,
            sortable: true,
        },
        {
            name: 'Pic2',
            selector: row =><a href={`${process.env.REACT_APP_SERVER}/${row.pic2}`} target='_blank' rel="noreferrer"><img src={`/${row.pic2}`} height="50px" width="50px" alt="" /></a>,
            sortable: true,
        },
        {
            name: 'Pic3',
            selector: row =><a href={`${process.env.REACT_APP_SERVER}/${row.pic3}`} target='_blank' rel="noreferrer"><img src={`/${row.pic3}`} height="50px" width="50px" alt="" /></a>,
            sortable: true,
        },
        {
            name: 'Pic4',
            selector: row =><a href={`${process.env.REACT_APP_SERVER}/${row.pic4}`} target='_blank' rel="noreferrer"><img src={`/${row.pic4}`} height="50px" width="50px" alt="" /></a>,
            sortable: true,
        },
        {
            name: 'Edit',
            sortable: false,
            selector:row=><Link to={`/admin/maincategory/update/${row._id}`}><i className='fa fa-edit text-success'></i></Link>
        },
        {
            name: 'Delete',
            sortable: false,
            selector:row=><button className='btn' onClick={()=>deleteItem(row._id)}><i className='fa fa-trash text-danger'></i></button>
        },
    ]
    let [data, setData] = useState([])
    let dispatch = useDispatch()
    let ProductStateData = useSelector((state) => state.ProductStateData)
    function deleteItem(_id) {
        if (window.confirm("Are You Sure!!! You Want to Delete tha Item! Please Cofirm : ")) {
            dispatch(deleteProduct({ _id: _id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getProduct())
        if (ProductStateData.length) {
            setData(ProductStateData)
        }
    }
    useEffect(() => {
        getAPIData()
    }, [ProductStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light p-2 text-center'>Product <Link to="/admin/product/create"><i className='fa fa-plus text-light float-end'></i></Link></h5>
                        <div className="table-responsive">
                            {/* <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Color/Size</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Pic1</th>
                                        <th>Pic2</th>
                                        <th>Pic3</th>
                                        <th>Pic4</th>
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
                                                <td>{item.maincategory}/{item.subcategory}/{item.brand}</td>
                                                <td>{item.color}/{item.size}</td>
                                                <td><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup>{item.discount}%Off</sup></td>
                                                <td>{item.stock}</td>
                                                <td><a href={`/${item.pic1}`} target="_blank" rel='noreferrer'><img src={`/${item.pic1}`} height="80px" width="80px" className='rounded' alt="" /></a></td>
                                                <td><a href={`/${item.pic2}`} target="_blank" rel='noreferrer'><img src={`/${item.pic2}`} height="80px" width="80px" className='rounded' alt="" /></a></td>
                                                <td><a href={`/${item.pic3}`} target="_blank" rel='noreferrer'><img src={`/${item.pic3}`} height="80px" width="80px" className='rounded' alt="" /></a></td>
                                                <td><a href={`/${item.pic4}`} target="_blank" rel='noreferrer'><img src={`/${item.pic4}`} height="80px" width="80px" className='rounded' alt="" /></a></td>
                                                <td><Link to={`/admin/product/update/${item._id}`}><i className='fa fa-edit text-success'></i></Link></td>
                                                <td><button className='btn' onClick={() => deleteItem(item._id)}><i className='fa fa-trash text-danger'></i></button></td>
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
                                paginationPerPage={5}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
