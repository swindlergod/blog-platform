import React from "react";
import './sign-up-form.css'
import { Link } from "react-router-dom";
import { registerUser } from "../../services/api";
import { useForm } from 'react-hook-form'

export default function SignUp(){
    
    const submit = async(data) => {
        const newUser = await registerUser({
            user:{
                username: data.username,
                email: data.email,
                password: data.password,
            }
        })
        await window.localStorage.setItem('token', newUser.user.token)
    }

    const {register, watch, handleSubmit, formState: { errors }} = useForm({
        mode: 'onBlur'
    })


    return(
        <div className="form-page">
            <div className="form">
                <p className="form__title">Create new account</p>
                <form className="form__inputs" onSubmit={handleSubmit(submit)}>
                    <label htmlFor='username'>Username</label>
                    <input 
                    className={`username-input ${errors.username?.message && 'invalid'}`}
                    id="username" 
                    placeholder="Username" 
                    name="username" 
                    autoComplete="off" 
                    {...register('username', {
                        required: 'Username is required',
                        minLength: {
                            value: 3,
                            message: 'Your username must be at least 3 characters'
                        },
                        maxLength: {
                            value: 20,
                            message: 'Your username must be less than 20 characters'
                        }
                    })}  />
                    <p className="validation"> {errors.username?.message} </p>
                    
                    <label htmlFor='email'>Email address</label>
                    <input className={`email-input ${errors.email?.message && 'invalid'}`} id="email" placeholder="Email address" name="email" type="mail" autoComplete="off" 
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Enter a valid e-mail address',
                        }                        
                    })}  />
                    <p className="validation"> {errors.email?.message} </p>
                    <label htmlFor='password'>Password</label>
                    <input className={`password-input ${errors.password?.message && 'invalid'}`} id="password" placeholder="Password" name="password" type="password" autoComplete="off" 
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Your password must be at least 6 characters'
                        },
                        maxLength: {
                            value: 40,
                            message: 'Your password must be less than 40 characters'
                        }
                    })}  />
                    <p className="validation"> {errors.password?.message} </p>
                    <label htmlFor='repeat'>Repeat password</label>
                    <input className={`repeat-input ${errors.repeat?.message && 'invalid'}`} id="repeat" placeholder="Repeat password" name="repeat" type="password" autoComplete="off" 
                    {...register('repeat', {
                        required: 'Confirm your password',
                        validate: (val) => {
                            if (watch('password') !== val) {
                                return "Your passwords do no match";
                              }
                        }
                    })}  /> 
                    <p className="validation"> {errors.repeat?.message} </p>                   
                    <label className="agreement">
                        <input className="agreement-input" id="agreement" name="agreement" type="checkbox" 
                        {...register('agreement', {
                            required: 'You should confirm the agreement',
                        })}/>
                        <p className="agreement-text">I agree to the processing of my personal information</p>
                    </label>
                    <p className="validation"> {errors.agreement?.message} </p>
                    <button type='submit' className="login-button">Create</button>                    
                </form>
                <p className="login-sign">Already have an account? <Link to="/sign-in" className="login-link">Sign In.</Link></p>                
            </div>            
        </div>
    )
}