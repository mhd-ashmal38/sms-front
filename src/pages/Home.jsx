import React, { useContext, useEffect, useState } from 'react'
import Table from '../components/Table'
import { Link, useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { allUsers, deleteUser } from '../services/AllApi'
import { editContext, registerContext } from './Contextshare'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

    const { registerData, setRegisterData } = useContext(registerContext)

    const { editData, setEditData } = useContext(editContext)

    const [showspin, setShowspin] = useState(true)

    const [allUserData, setAllUserData] = useState([])

    const [search, setSearch] = useState("")

    const [selectedDepartment, setSelectedDepartment] = useState("");

    const { id } = useParams()

    // console.log(id);

    useEffect(() => {

        getAllStudents()

        setTimeout(() => {
            setShowspin(false)
        }, 2000);

    }, [search, selectedDepartment])

    // to get all data call allUsers function

    const getAllStudents = async () => {
        const response = await allUsers(search)
        // console.log(response);
        let filteredData;

        if (selectedDepartment === "All") {
            filteredData = response.data;
        } else {
            filteredData = response.data.filter((user) => !selectedDepartment || user.department === selectedDepartment);
        }

        setAllUserData(filteredData);
    }

    // to delete a single data
    const removeUser = async (id) => {
        const response = await deleteUser(id)

        if (response.status === 200) {
            getAllStudents()
        } else {
            toast.error('operation failed !!! please try after some time', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }




    return (

        <>

            {
                registerData &&
                <div className='p-5'>
                    <div role="alert" className="alert alert-success p-10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{registerData.fname.toUpperCase()} registered successfully.....</span>
                        <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-3" onClick={() => {
                            setRegisterData("");
                            document.getElementById("alert-border-3").style.display = "none";
                        }}
                            aria-label="Close">
                            <span className="sr-only">Dismiss</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            }


            {
                editData &&
                <div className='p-5'>
                    <div role="alert" className="alert alert-success ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{editData.fname.toUpperCase()} updated successfully.....</span>
                        <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-3" onClick={() => {
                            setEditData("");
                            document.getElementById("alert-border-3").style.display = "none";
                        }}
                            aria-label="Close">
                            <span className="sr-only">Dismiss</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            }




            {
                showspin ? <LoadingSpinner /> :
                    <div>
                        <div className='grid gap-4 px-1 pt-5 md:flex md:px-10 md:pt-10 md:justify-between'>
                            <div className="join">
                                <div>
                                    <div>
                                        <input onChange={e => setSearch(e.target.value)} className="input input-bordered join-item" placeholder="Search by name" />
                                    </div>
                                </div>
                                <select className="select select-bordered join-item" onChange={(e) => setSelectedDepartment(e.target.value)}>
                                    <option value="All">All</option>
                                    <option value="CE">CE</option>
                                    <option value="CSE">CSE</option>
                                    <option value="EC">EC</option>
                                    <option value="EEE">EEE</option>
                                    <option value="ME">ME</option>
                                </select>
                            </div>
                            <div>
                                <div className=''>
                                    <Link to={'/add'}><button  class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Students</button></Link>
                                </div>
                            </div>
                        </div>
                        <Table displayData={allUserData} removeuser={removeUser} />
                    </div>
            }


            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />

        </>
    )
}

export default Home