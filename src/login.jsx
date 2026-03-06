import axios from "axios"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Login() {
    const navigate = useNavigate()
    const [data, setdata] = useState({
        email: "",
        password: ""
    })

    const changeName = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:8080/login", data)
            const user = res.data
            localStorage.setItem("user", JSON.stringify(user))
            alert("Login Successful!")

            // Role-based redirection
            if (user.role === "MANAGER" || user.role === "HR") {
                navigate("/dashboard")
            } else {
                navigate("/h") // Employee home
            }
        } catch (err) {
            alert(err.response?.data || "Login failed")
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '450px', padding: '40px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '8px', textAlign: 'center' }}>Welcome Back</h1>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '32px' }}>Enter your credentials to continue</p>

                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input
                        className="input-premium"
                        onChange={changeName}
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        required
                    />
                    <input
                        className="input-premium"
                        onChange={changeName}
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                    />

                    <button type="submit" className="btn-premium" style={{ marginTop: '12px' }}>
                        Sign In
                    </button>
                </form>

                <p style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link to="/reg" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;
