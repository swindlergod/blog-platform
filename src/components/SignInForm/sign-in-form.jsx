import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './sign-in-form.css'
import { loginUser } from "../../services/api";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginStatus } from "../../toolkitRedux/userSlice";

export default function SignIn(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const submit = async(data) => {
        await loginUser({
            user:{
                email: data.email,
                password: data.password,
            }
        })    
        .then(({user}) => {
            window.localStorage.setItem('token', user.token)
            window.localStorage.setItem('isLogged', true)
            dispatch(loginStatus(true))
            navigate('/') 
        })
    }

    const {register, handleSubmit, formState: { errors }} = useForm({
        mode: 'onBlur'
    })

    return(
        <div className="form-page">
            <div className="form form__sign-in">
                <p className="form__title">Sign in</p>
                <form className="form__inputs" onSubmit={handleSubmit(submit)}>
                    <label htmlFor='email'>Email address</label>
                    <input className={`email-input ${errors.email?.message && 'invalid'}`} id="email" placeholder="Email address" name="email" type="mail" autoComplete="off" required="" 
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Enter a valid e-mail address',
                        }                        
                    })}/>
                    <p className="validation"> {errors.email?.message} </p>
                    <label htmlFor='password'>Password</label>
                    <input className={`password-input ${errors.password?.message && 'invalid'}`} id="password" placeholder="Password" name="password" type="password" autoComplete="off" required=""
                    {...register('password', {
                        required: 'Password is required',
                    })}/>
                    <p className="validation"> {errors.password?.message} </p>
                    <button className="login-button" type="submit">Login</button>
                </form>                    
                    <p className="login-sign">Don't have an account? <Link to="/sign-up" className="login-link">Sign Up.</Link></p>                
            </div>            
        </div>
    )
}