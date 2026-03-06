import axios from "axios"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Reg() {
    const navigate = useNavigate()
    const [data, setdata] = useState({
        username: "",
        email: "",
        password: "",
        role: "EMPLOYEE"
    })

    const changeName = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("https://backendrender-4w2u.onrender.com/register", data)
            alert(res.data)
            navigate("/login")
        } catch (err) {
            alert(err.response?.data || "Registration failed")
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '450px', padding: '40px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '8px', textAlign: 'center' }}>Create Account</h1>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '32px' }}>Join our premium network</p>

                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input
                        className="input-premium"
                        onChange={changeName}
                        name="username"
                        placeholder="Full Name"
                        required
                    />
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
                    <select
                        className="input-premium"
                        name="role"
                        onChange={changeName}
                        style={{ appearance: 'none' }}
                    >
                        <option value="EMPLOYEE">Employee</option>
                        <option value="MANAGER">Manager</option>
                        <option value="HR">HR</option>
                    </select>

                    <button type="submit" className="btn-premium" style={{ marginTop: '12px' }}>
                        Register Now
                    </button>
                </form>

                <p style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Reg;
