import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllAccounts } from '../services/AllApi';

function Login() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllAccounts();
                // console.log(response); // Log the response data to the console
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };

        fetchData();
    }, []);


    const handleLogin = async () => {
        try {
            const response = await getAllAccounts();
            const accounts = response.data;
            const user = accounts.find(account => account.email === email && account.password === password);
            if (user) {
                // Authentication successful, navigate to authenticated route or perform other actions
                console.log('Authentication successful:', user);
                navigate('/home')
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
            setError('Internal server error');
        }
    };

    


    return (
        <div>

            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-medium">Your email</span>
                                        </div>
                                        <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Type here" className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <div>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-medium">Password</span>
                                        </div>
                                        <input type="password" name='password' value={password} onChange={e => setPassword(e.target.value)} placeholder="Type here" className="input input-bordered w-full" />
                                    </label>
                                </div>
                            </form>
                            <button onClick={handleLogin} type='submit' className="w-full text-white btn bg-blue-700 hover:bg-blue-800">Sign in</button>
                            {error && <p className="text-red-500">{error}</p>}

                            <p className="text-sm text-gray-800 dark:text-gray-400">
                                Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-200">Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Login


