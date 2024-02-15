
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { regUser } from '../services/AllApi';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [userData, setUserData] = useState({
        uname: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { uname, email, password } = userData;

        if (!uname || !email || !password) {
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
            return;
        }

        if (password.length < 8) {
            // alert("Password must be at least 8 characters long");
            toast.warning('Password must be at least 8 characters long', {
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
            return;
        }

        try {
            const response = await regUser(userData);
            console.log(response);
            // Optionally, handle success response
            if (response.status === 200) {
                // alert("Registration successful!");
                toast.success('Registration successful!', {
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
                navigate('/home')
            } else if (response.status === 406) {
                // alert("User already exists");
                toast.warning('User already exists', {
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
                // alert("Registration failed. Please try again.");
                toast.error('Registration failed. Please try again', {
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
        } catch (error) {
            console.error("Registration failed:", error);
            // alert("Registration failed. Please try again.");
            toast.error('Registration failed. Please try again.', {
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
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-medium">Username</span>
                                        </div>
                                        <input type="text" name="uname" value={userData.uname} onChange={handleChange} placeholder="Type here" className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <div>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-medium">Email</span>
                                        </div>
                                        <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Type here" className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <div>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-medium">Password</span>
                                        </div>
                                        <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Type here" className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <button type="submit" className="w-full text-white btn bg-blue-700 hover:bg-blue-800">Create an account</button>
                                <p className="text-sm  text-gray-800 dark:text-gray-400">
                                    Already have an account? <Link to={'/'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

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

        </div>

        
    );
}

export default Register;
