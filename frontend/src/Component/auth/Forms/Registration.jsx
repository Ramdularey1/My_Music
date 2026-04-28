import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading, setError } from '../../../utils/authSlice';

function Registration() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        username: "",
        fullname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setErrorMsg] = useState("");
    const [isLoading, setIsLoadingLocal] = useState(false);

    const { username, fullname, email, password, confirmPassword } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setIsLoadingLocal(true);
        dispatch(setLoading(true));

        try {
            // Validation
            if (!username || !fullname || !email || !password || !confirmPassword) {
                throw new Error("Please fill in all fields");
            }

            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            if (password.length < 6) {
                throw new Error("Password must be at least 6 characters");
            }

            const response = await fetch("http://localhost:8000/api/v1/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    fullname,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok && data.data) {
                navigate("/login");
            } else {
                throw new Error(data.message || "Registration failed");
            }
        } catch (error) {
            const errorMsg = error.message || "Error while registering user";
            setErrorMsg(errorMsg);
            dispatch(setError(errorMsg));
            console.log("Error:", error);
        } finally {
            setIsLoadingLocal(false);
            dispatch(setLoading(false));
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-black p-4 sm:p-10'>
            <form onSubmit={handleSubmit} className='bg-slate-800 w-full max-w-md p-8 rounded-lg shadow-lg'>
                <h1 className='text-2xl font-bold text-white mb-6 text-center'>Register to MyMusic</h1>

                {error && (
                    <div className='mb-4 p-3 bg-red-500 text-white rounded'>
                        {error}
                    </div>
                )}

                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2' htmlFor='username'>
                        Username
                    </label>
                    <input
                        type="text"
                        name='username'
                        value={username}
                        onChange={handleChange}
                        placeholder="Choose a username"
                        required
                        className='w-full px-3 py-2 text-black leading-tight border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2' htmlFor='fullname'>
                        Full Name
                    </label>
                    <input
                        type="text"
                        name='fullname'
                        value={fullname}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className='w-full px-3 py-2 text-black leading-tight border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2' htmlFor='email'>
                        Email
                    </label>
                    <input
                        type="email"
                        name='email'
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className='w-full px-3 py-2 text-black leading-tight border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2' htmlFor='password'>
                        Password
                    </label>
                    <input
                        type="password"
                        name='password'
                        value={password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        required
                        className='w-full px-3 py-2 text-black leading-tight border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='mb-6'>
                    <label className='block text-white text-sm font-bold mb-2' htmlFor='confirmPassword'>
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                        className='w-full px-3 py-2 text-black leading-tight border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='flex items-center justify-center mb-4'>
                    <button
                        type='submit'
                        disabled={isLoading}
                        className='bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline w-full transition'
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </div>

                <div className='text-center'>
                    <p className='text-gray-300'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-blue-400 hover:text-blue-300 font-bold'>
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Registration;
