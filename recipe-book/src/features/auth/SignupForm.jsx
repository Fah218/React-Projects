import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from './authSlice'

function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const { name, email, password, confirmPassword } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            alert(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }

        const userData = {
            name,
            email,
            password,
        }

        dispatch(register(userData))
    }

    if (isLoading) {
        return <div className="text-center mt-20 text-xl font-bold">Loading...</div>
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <section className='mb-6 text-center'>
                    <h1 className="text-3xl font-bold mb-2">Register</h1>
                    <p className="text-gray-600">Please create an account</p>
                </section>

                <section className='form'>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className='form-group'>
                            <input
                                type='text'
                                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                id='name'
                                name='name'
                                value={name}
                                placeholder='Enter your name'
                                onChange={onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='email'
                                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                id='email'
                                name='email'
                                value={email}
                                placeholder='Enter your email'
                                onChange={onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='password'
                                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                id='password'
                                name='password'
                                value={password}
                                placeholder='Enter password'
                                onChange={onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='password'
                                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                id='confirmPassword'
                                name='confirmPassword'
                                value={confirmPassword}
                                placeholder='Confirm password'
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200'>
                                Submit
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default SignupForm
