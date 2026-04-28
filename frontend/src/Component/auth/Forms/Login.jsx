import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setLoading, setError } from '../../../utils/authSlice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setErrorMsg] = useState("");
    const [isLoading, setIsLoadingLocal] = useState(false);

    const { email, password } = formData;

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
            if (!email || !password) {
                throw new Error("Please fill in all fields");
            }

            const response = await fetch("http://localhost:8000/api/v1/users/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.data) {
                dispatch(setUser(data.data));
                localStorage.setItem("user", JSON.stringify(data.data));
                navigate("/");
            } else {
                throw new Error(data.message || "Login failed");
            }
        } catch (error) {
            const errorMsg = error.message || "Error while logging in";
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
                <h1 className='text-2xl font-bold text-white mb-6 text-center'>Login to MyMusic</h1>
                
                {error && (
                    <div className='mb-4 p-3 bg-red-500 text-white rounded'>
                        {error}
                    </div>
                )}
                
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
                
                <div className='mb-6'>
                    <label className='block text-white text-sm font-bold mb-2' htmlFor='password'>
                        Password
                    </label>
                    <input
                        type="password"
                        name='password'
                        value={password}
                        onChange={handleChange}
                        placeholder="Enter your password"
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
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </div>
                
                <div className='text-center'>
                    <p className='text-gray-300'>
                        Don't have an account?{' '}
                        <Link to="/auth" className='text-blue-400 hover:text-blue-300 font-bold'>
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
