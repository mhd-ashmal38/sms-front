import React from 'react'
import { FcViewDetails } from "react-icons/fc";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';
import { IoIosMale } from "react-icons/io";
import { IoIosFemale } from "react-icons/io";

function Table({ displayData, removeuser, percentage }) {

    // console.log(displayData);
    return (
        <div>

            <div className="overflow-x-auto px-2 py-8 md:p-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Year</th>
                            <th>Department</th>
                            <th>E-mail</th>
                            <th>Mobile</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {

                            displayData.length > 0 ?

                                displayData.map((item, index) => (

                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={`${BASE_URL}/uploads/${item.profile}`} alt="no image" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{item.fname} {item.lname}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.year}</td>
                                        <td>{item.department}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.gender === 'Male' ? <IoIosMale /> : <IoIosFemale />}</td>
                                        <td className='mt-3 flex items-center'>
                                            <Link to={`/view/${item._id}`}><FcViewDetails size={25} /></Link>
                                            <Link to={`/edit/${item._id}`}><BiEdit size={23} color='#0096FF' /></Link>
                                            <MdDelete className='hover:cursor-pointer' onClick={() => removeuser(item._id)} size={25} color='red' />
                                        </td>
                                    </tr>

                                )) : <tr className='w-100 font-semibold mt-5 text-center'>Nothing to display</tr>
                        }
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default Table