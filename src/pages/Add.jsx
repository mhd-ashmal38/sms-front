import React, { useContext, useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import { addUser } from '../services/AllApi';
import { useNavigate } from 'react-router-dom';
import { registerContext } from './Contextshare';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add() {

    const { registerData, setRegisterData } = useContext(registerContext)

    const navigate = useNavigate()

    const [showspin, setShowspin] = useState(true)

    // create state for normal inputs
    const [normalUserInput, setNormalUserInput] = useState({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        father: "",
        mother: "",
        location: "",
        faculty: "",
        subject1: "",
        subject2: "",
        subject3: "",
        subject4: "",
        subject5: "",
        subject6: ""
    })

    // state for gender
    const [gender, setGender] = useState("")

    // state for year
    const [year, setYear] = useState("")

    // state for department
    const [department, setDepartment] = useState("")

    // state for uploading files
    const [profile, setProfile] = useState("")

    // state for storing the profile that will be converted to url
    const [preview, setPreview] = useState("")

    // define normalinput function
    const getandsetNormalInputs = (e) => {
        const { name, value } = e.target
        setNormalUserInput({ ...normalUserInput, [name]: value })
    }

    // define function
    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
    };


    // console.log(normalUserInput);
    // console.log(gender);
    // console.log(year);
    // console.log(department);

    const handlefile = (e) => {
        // console.log(e.target.files[0]);
        setProfile(e.target.files[0])
    }

    // define handlesubmit
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { fname, lname, email, mobile, father, mother, location, faculty, subject1, subject2, subject3, subject4, subject5, subject6 } = normalUserInput

        if (!fname || !lname || !email || !mobile || !gender || !year || !department || !profile || !father || !mother || !location || !faculty || !subject1 || !subject2 || !subject3 || !subject4 || !subject5 || !subject6) {
            toast.warning('please fill the form completely', {
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
        } else {
            // alert("form filled completely")

            // create form data - body
            const data = new FormData()

            data.append("fname", fname)
            data.append("lname", lname)
            data.append("email", email)
            data.append("mobile", mobile)
            data.append("gender", gender)
            data.append("year", year)
            data.append("department", department)
            data.append("father", father)
            data.append("mother", mother)
            data.append("profile", profile)
            data.append("location", location)
            data.append("faculty", faculty)
            data.append("subject1", subject1)
            data.append("subject2", subject2)
            data.append("subject3", subject3)
            data.append("subject4", subject4)
            data.append("subject5", subject5)
            data.append("subject6", subject6)


            // header
            const headers = {
                "content-type": "multipart/form-data"
            }

            // api call
            const response = await addUser(data, headers)
            console.log(response);

            if (response.status == 200) {

                setNormalUserInput({
                    ...normalUserInput,

                    fname: "",
                    lname: "",
                    email: "",
                    mobile: "",
                    father: "",
                    mother: "",
                    location: "",
                    faculty: "",
                    subject1: "",
                    subject2: "",
                    subject3: "",
                    subject4: "",
                    subject5: "",
                    subject6: ""

                })
                setGender("")
                setYear("")
                setDepartment("")
                setProfile("")
                setRegisterData(response.data)
                navigate('/home')

            }


        }
    }

    useEffect(() => {

        // converting profile into a url
        if (profile) {
            URL.createObjectURL(profile)
            setPreview(URL.createObjectURL(profile))
        }

        setTimeout(() => {
            setShowspin(false)
        }, 2000);

    }, [profile])

    return (
        <>
            {
                showspin ? <LoadingSpinner /> :
                    <div className='xl:p-16 p-6'>


                        <form >
                            <h2 className='font-medium pb-5 text-4xl text-center'>Student Details</h2>
                            <div className='border p-3 rounded shadow-md md:p-10'>
                                <div className="avatar flex justify-center pb-8">
                                    <div className="mask mask-squircle w-20 h-20 ">
                                        <img src={preview ? preview : "https://imgs.search.brave.com/s_11gCa04BgjwM6z5Mlo6svAbXyqeFYZwKvQIJh4uIY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudGhlbm91bnBy/b2plY3QuY29tL3Bu/Zy85ODU0OTgtMjAw/LnBuZw"} alt="No Image" />
                                    </div>
                                </div>
                                <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">First name</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='fname' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">Last name</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='lname' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">E-mail</span>
                                            </div>
                                            <input type="email" placeholder="Type here" name='email' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} className="input input-bordered w-full" />
                                        </label>

                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">Mobile</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='mobile' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                </div>
                                <div className='grid gap-6 mb-6 md:grid-cols-3'>
                                    <div className='flex justify-center'>
                                        <label className="form-control w-full max-w-xs">
                                            <div className="label">
                                                <span className="label-text font-medium">Gender</span>
                                            </div>
                                            <select className="select select-bordered"
                                                onChange={handleGenderChange}>
                                                <option disabled selected>Please Select</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className='flex justify-center'>
                                        <label className="form-control w-full max-w-xs">
                                            <div className="label">
                                                <span className="label-text font-medium">Year</span>
                                            </div>
                                            <select className="select select-bordered"
                                                onChange={handleYearChange}>
                                                <option disabled selected>Please Select</option>
                                                <option>1st Year</option>
                                                <option>2nd Year</option>
                                                <option>3rd Year</option>
                                                <option>4th Year</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className='flex justify-center'>
                                        <label className="form-control w-full max-w-xs">
                                            <div className="label">
                                                <span className="label-text font-medium">Department</span>
                                            </div>
                                            <select className="select select-bordered"
                                                onChange={handleDepartmentChange}>
                                                <option disabled selected>Please Select</option>
                                                <option>CE</option>
                                                <option>CSE</option>
                                                <option>EC</option>
                                                <option>EEE</option>
                                                <option>ME</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <div className='grid gap-6 mb-6 md:grid-cols-2'>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">Father's Name</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='father' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">Mother's Name</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='mother' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">Profile</span>
                                            </div>
                                            <input onChange={e => handlefile(e)} type="file" name='profile' className="file-input file-input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">Location</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='location' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <h2 className='font-medium p-10 text-4xl text-center'>Academic Details</h2>
                            <div className='border p-10 rounded shadow-md'>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text font-medium">Faculty Advisor</span>
                                    </div>
                                    <input type="text" placeholder="Type here" name='faculty' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} className="input input-bordered w-full max-w-xs" />
                                </label>
                                <h2 className='font-medium py-5 text-3xl'>Marks obtained : </h2>
                                <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">MAT</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='subject1' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">CST</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='subject2' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">MCN</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='subject3' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">HUT</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='subject4' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">EST</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='subject5' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">CSL</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='subject6' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                </div>

                            </div >


                            <div className='flex justify-end'><button onClick={e => handleSubmit(e)} type="submit" className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button></div>
                        </form>


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

export default Add