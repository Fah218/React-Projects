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
            const userData = await authService.createAccount(data)
            if (userData) {
                navigate("/login", {
                    state: {
                        email: data.email,
                        password: data.password
                    }
                })
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[85vh] py-16 px-4">
            <div className="mx-auto w-full max-w-lg">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-3">
                        Join BlogSpace
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Create your account and start blogging
                    </p>
                </div>

                {/* Form Card */}
                <div className="glass-card p-10">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">
                        Sign Up
                    </h2>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(create)} className="space-y-6">
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            autoComplete="name"
                            {...register("name", {
                                required: true,
                            })}
                        />
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
                            placeholder="Enter a strong password"
                            autoComplete="new-password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <button
                            type="submit"
                            className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-red-600/50 transition-all duration-300 hover:scale-[1.02]"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-8 text-center">
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