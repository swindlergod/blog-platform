import React, {useState} from "react";
import './edit-profile-form.css'
import { editUser } from "../../services/api";
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../../toolkitRedux/userSlice";

export default function EditProfile() {
    
    const {currentUser} = useSelector(state => state.user)
    const {username, image, email} = currentUser
    
    const [name, setUsername] = useState(username)
    const [mail, setEmail] = useState(email)
    const [password, setPassword] = useState('')
    const [img, setImage] = useState(image) 
    
    const dispatch = useDispatch()

    const submit = async() => {
        await editUser({
            user:{
                username: name,
                email: mail,
                password: password,
                image: img,
            }
        })
        .then(res => {
            dispatch(userInfo(res.user))
        })
    }

    const {register, watch, handleSubmit, formState: { errors }} = useForm({
        mode: 'onBlur'
    })
    
    return (
        <div className="form-page">
        <div className="form form__edit">
            <p className="form__title">Edit profile</p>
            <form className="form__inputs" onSubmit={handleSubmit(submit)}>
                <label htmlFor='username'>Username</label>
                <input className="username-input" id="username" placeholder="Username" name="username" autoComplete="off" defaultValue={username} onChange={e => setUsername(e.target.value)}/>
                <label htmlFor='email'>Email address</label>
                <input className="email-input" id="email" placeholder="Email address" name="email" type="mail" autoComplete="off" defaultValue={email} onChange={e => setEmail(e.target.value)}/>
                <label htmlFor='password'>New password</label>
                <input className="password-input" id="password" placeholder="Password" name="password" type="password" autoComplete="off" onChange={e => setPassword(e.target.value)}/>
                <label htmlFor='password'>Avatar image (url)</label>
                <input className="password-input" id="avatar" placeholder="Avatar image" name="avatar" autoComplete="off" defaultValue={image} onChange={e => setImage(e.target.value)}/>
                <button className="login-button" type="submit">Save</button>
            </form>                              
        </div>            
    </div>
    )
}