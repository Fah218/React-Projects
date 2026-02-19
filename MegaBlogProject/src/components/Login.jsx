import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import Input from "./Input"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue } = useForm()
    const [error, setError] = useState("")

    useEffect(() => {
        if (location.state) {
            if (location.state.email) setValue("email", location.state.email)
            if (location.state.password) setValue("password", location.state.password)
        }
    }, [location.state, setValue])

    const login = async (data) => {
        setError("")
        try {
            console.log("Login: Attempting login...");
            const session = await authService.login(data)
            if (session) {
                console.log("Login: Session created, fetching user...");
                const userData = await authService.getCurrentUser()

                if (userData) {
                    console.log("Login: User found, dispatching...");
                    dispatch(authLogin({ userData }))
                    navigate("/")
                } else {
                    // Fallback: If getCurrentUser fails (due to cookie blocking), use session data
                    console.warn("Login: User data fetch failed, using session fallback");
                    const fallbackUser = {
                        $id: session.userId,
                        email: data.email,
                        name: "User" // We don't have name in session, but this unblocks the app
                    };
                    dispatch(authLogin({ userData: fallbackUser }))
                    navigate("/")
                }
            }
        } catch (error) {
            console.error("Login: Error caught", error);
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-[85vh] py-12 px-4'>
            <div className="mx-auto w-full max-w-md">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-3">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Sign in to continue to BlogSpace
                    </p>
                </div>

                {/* Form Card */}
                <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        Sign In
                    </h2>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(login)} className='space-y-5'>
                        <Input
                            label="Email Address"
                            placeholder="john@example.com"
                            type="email"
                            autoComplete="username"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <button
                            type="submit"
                            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-red-600/50 transition-all duration-300 hover:scale-[1.02]"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="font-semibold text-red-500 hover:text-red-400 transition-colors"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login