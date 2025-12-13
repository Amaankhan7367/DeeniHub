import React, { useState, useEffect } from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import'./Signup.css'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit,watch} = useForm()
    
    const name = watch("name")

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="signup-container">
          <div className="signup-card">
            <div className="logo-wrap">
                    <span className="logo-box">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="signup-title">Sign up to create account</h2>
                 <p className="signin-text">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                
                
                {error && <p className="error-text">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                  <div className="form-space">

                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        
                                                <Input
                        label="Password: "
                        placeholder="Enter your Password"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        
                        <Input
                        label="confirm Password: "
                        type="password"
                        placeholder="confirm your password"
                        {...register("password", {
                            required: true,
                          validate: (value)=>value === name ||"Incorrect! Password do not match "
                        })}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup