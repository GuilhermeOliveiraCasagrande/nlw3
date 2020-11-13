import React from "react"
import { Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"

import LoginBanner from "../components/loginBanner/index"

import "../styles/pages/dashboard.css"

export default function Dashboard() {
    return (
        <main>
            <div className="baner">
                <LoginBanner></LoginBanner>
            </div>
            <div className="login">
                <Link to="/" className="go-back">
                    <FiArrowLeft size={32} color="#15C3D6" />
                </Link>
                <title>Fazer login</title>
                <form action="/login">
                    <div className="input-wrapper">
                        <label htmlFor="username">Usuario</label>
                        <input type="text" name="username" id="username" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Senha</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <div className="options-wrapper">
                        <div className="remember-wrapper">
                            <input type="checkbox" name="remember" id="remember" />
                            <label htmlFor="remember">Lembrar-me</label>
                        </div>
                        <Link to="/forgot">Esqueci minha senha</Link>
                    </div>
                    <button type="submit">Entrar</button>
                </form>
            </div>

        </main>
    )
}