import React, {useState} from 'react'
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

    const {register, handleSubmit, watch, formState: { errors }} = useForm()

    const password = watch("password")   // 👈 confirm password check karega

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
      Already have an account?{" "}
      <Link to="/login" className="signin-link">Sign In</Link>
    </p>

    {error && <p className="error-text">{error}</p>}

    <form onSubmit={handleSubmit(create)}>
      <div className="form-space">

        <Input
          label="Email:"
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: "Email is required",
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be valid",
            }
          })}
        />
        {errors.email && <p className="error-small">{errors.email.message}</p>}

        <Input
          label="Password:"
          type="text"
          placeholder="Enter your password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="error-small">{errors.password.message}</p>}

        <Input
          label="Confirm Password:"
          type="password"
          placeholder="Confirm your password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Incorrect! Passwords do not match"
          })}
        />
        {errors.confirmPassword && <p className="error-small">{errors.confirmPassword.message}</p>}

        <Button type="submit" className="btn-full">
          Create Account
        </Button>

      </div>
    </form>

  </div>
</div>
  )
}

export default Signup