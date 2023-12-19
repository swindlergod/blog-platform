import React from "react";
import './header.css'

export default function Header() {
    return (
        <div className="header">
            <button className="header__logo">Realworld blog</button>
            <button className="header__sign-in">Sign In</button>
            <button className="header__sign-up">Sign Up</button>
        </div>
    )
}