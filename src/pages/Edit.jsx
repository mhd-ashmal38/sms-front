import React, { useContext, useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate, useParams } from 'react-router-dom';
import { allUsers, editUser } from '../services/AllApi';
import { BASE_URL } from '../services/baseUrl';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editContext } from './Contextshare';

function Edit() {

    const{editData, setEditData}=useContext(editContext)

    const navigate=useNavigate()

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
            profile ? data.append("profile", profile) : data.append("profile", existingImg)
            data.append("location", location)
            data.append("faculty", faculty)
            data.append("subject1", subject1)
            data.append("subject2", subject2)
            data.append("subject3", subject3)
            data.append("subject4", subject4)
            data.append("subject5", subject5)
            data.append("subject6", subject6)


            // header
            if (profile) {
                var headers = {
                    "content-type": "multipart/form-data"
                }
            } else {
                var headers = ""
            }

            // api call for edit
            const response = await editUser(id, data, headers)
            console.log(response);

            setEditData(response.data)
            navigate('/home')



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


    // to get image from backend
    const [existingImg, setExistingImg] = useState("")


    // useeffect
    useEffect(() => {
        getUser()
    }, [])


    // edit a single student details
    const { id } = useParams()
    // console.log(id);

    // to get allUsers from database
    const getUser = async () => {
        const { data } = await allUsers("")
        // console.log(data);
        let existingUser = data.find(item => item._id === id)
        // console.log(existingUser);
        setNormalUserInput(existingUser)
        setGender(existingUser.gender)
        setYear(existingUser.year)
        setDepartment(existingUser.department)
        setExistingImg(existingUser.profile)
    }



    return (

        <>
            {
                showspin ? <LoadingSpinner /> :
                    <div className='xl:p-16 p-6'>


                        <form >
                            <h2 className='font-medium pb-5 text-4xl text-center'>Update Student Details</h2>
                            <div className='border p-3 rounded shadow-md md:p-10'>
                                <div className="avatar flex justify-center pb-8">
                                    <div className="mask mask-squircle w-20 h-20 ">
                                        <img src={preview ? preview : `${BASE_URL}/uploads/${existingImg}`} alt="No Image" />
                                    </div>
                                </div>
                                <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">First name</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='fname' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.fname} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">Last name</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='lname' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.lname} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">E-mail</span>
                                            </div>
                                            <input type="email" placeholder="Type here" name='email' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.email} className="input input-bordered w-full" />
                                        </label>

                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">Mobile</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='mobile' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.mobile} className="input input-bordered w-full" />
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
                                                onChange={handleGenderChange} value={gender}>
                                                <option disabled>Please Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className='flex justify-center'>
                                        <label className="form-control w-full max-w-xs">
                                            <div className="label">
                                                <span className="label-text font-medium">Year</span>
                                            </div>
                                            <select className="select select-bordered"
                                                onChange={handleYearChange} value={year}>
                                                <option disabled>Please Select</option>
                                                <option value="1st Year">1st Year</option>
                                                <option value="2nd Year">2nd Year</option>
                                                <option value="3rd Year">3rd Year</option>
                                                <option value="4th Year">4th Year</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className='flex justify-center'>
                                        <label className="form-control w-full max-w-xs">
                                            <div className="label">
                                                <span className="label-text font-medium">Department</span>
                                            </div>
                                            <select className="select select-bordered"
                                                onChange={handleDepartmentChange} value={department}>
                                                <option disabled>Please Select</option>
                                                <option value="CSE">CSE</option>
                                                <option value="CE">CE</option>
                                                <option value="ME">ME</option>
                                                <option value="EEE">EEE</option>
                                                <option value="EC">EC</option>
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
                                            <input type="text" placeholder="Type here" name='father' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.father} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">Mother's Name</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='mother' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.mother} className="input input-bordered w-full" />
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
                                            <input type="text" placeholder="Type here" name='location' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.location} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <h2 className='font-medium p-10 text-4xl text-center'>Update Academic Details</h2>
                            <div className='border p-10 rounded shadow-md'>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text font-medium">Faculty Advisor</span>
                                    </div>
                                    <input type="text" placeholder="Type here" name='faculty' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.faculty} className="input input-bordered w-full max-w-xs" />
                                </label>
                                <h2 className='font-medium py-5 text-3xl'>Marks obtained : </h2>
                                <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">MAT</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='subject1' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.subject1} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">CST</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='subject2' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.subject2} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">MCN</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='subject3' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.subject3} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">HUT</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='subject4' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.subject4} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">EST</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='subject5' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.subject5} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-medium">CSL</span>
                                            </div>
                                            <input type="text" placeholder="Type here" name='subject6' onChange={e => getandsetNormalInputs(e)} value={normalUserInput.subject6} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                </div>

                            </div >


                            <div className='flex justify-end'><button onClick={e => handleSubmit(e)} type="submit" class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button></div>
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

export default Edit