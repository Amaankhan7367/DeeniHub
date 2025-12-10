import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"
import './Login.css'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (<div className="login-container">
  <div className="login-card">
    
    <div className="logo-wrap">
      <span className="logo-box">
        <Logo width="100%" />
      </span>
    </div>

    <h2 className="login-title">Sign in to your account</h2>

    <p className="login-subtext">
      Don't have any account?{" "}
      <Link to="/signup" className="signin-link">Sign Up</Link>
    </p>

    {error && <p className="error-text">{error}</p>}

    <form onSubmit={handleSubmit(login)}>
      <div className="form-space">

        <Input
          label="Email:"
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            }
          })}
        />

        <Input
          label="Password:"
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: true })}
        />

        <Button type="submit" className="btn-full">
          Sign in
        </Button>
      </div>
    </form>

  </div>
</div>
)
}

export default Login