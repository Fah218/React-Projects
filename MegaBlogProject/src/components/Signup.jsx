import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import Input from './Input'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const session = await authService.createAccount(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login({ userData }));
                    navigate("/")
                } else {
                    setError("Failed to fetch user data. Please try again.")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[85vh] py-12 px-4">
            <div className="mx-auto w-full max-w-md">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-3">
                        Join BlogSpace
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Create your account and start blogging
                    </p>
                </div>

                {/* Form Card */}
                <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        Sign Up
                    </h2>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(create)} className="space-y-5">
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email Address"
                            placeholder="john@example.com"
                            type="email"
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
                            placeholder="Enter a strong password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <button
                            type="submit"
                            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-red-600/50 transition-all duration-300 hover:scale-[1.02]"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-semibold text-red-500 hover:text-red-400 transition-colors"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup