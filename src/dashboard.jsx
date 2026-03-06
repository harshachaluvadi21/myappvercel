import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Dashboard() {
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            const user = JSON.parse(storedUser)
            setCurrentUser(user)
            fetchUsers()
        } else {
            navigate("/login")
        }
    }, [navigate])

    const fetchUsers = async () => {
        try {
            const res = await axios.get("https://backendrender-4w2u.onrender.com/users")
            setUsers(res.data)
        } catch (err) {
            console.error("Error fetching users", err)
        }
    }

    const logout = () => {
        localStorage.removeItem("user")
        navigate("/login")
    }

    const isAuthorized = currentUser?.role === "HR" || currentUser?.role === "MANAGER";

    return (
        <div style={{ padding: '40px', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '36px', fontWeight: '800' }}>{isAuthorized ? 'Admin Dashboard' : 'User Dashboard'}</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Welcome back, {currentUser?.username} ({currentUser?.role})</p>
                </div>
                <button className="btn-premium" onClick={logout} style={{ background: '#ef4444' }}>
                    Logout
                </button>
            </div>

            {isAuthorized ? (
                <div className="glass-card" style={{ padding: '32px', overflowX: 'auto' }}>
                    <h2 style={{ marginBottom: '24px', fontSize: '20px' }}>User Directory</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                                <th style={{ padding: '16px' }}>ID</th>
                                <th style={{ padding: '16px' }}>Username</th>
                                <th style={{ padding: '16px' }}>Email</th>
                                <th style={{ padding: '16px' }}>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <td style={{ padding: '16px' }}>{user.id}</td>
                                    <td style={{ padding: '16px', fontWeight: '600' }}>{user.username}</td>
                                    <td style={{ padding: '16px' }}>{user.email}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            background: user.role === 'HR' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                                            color: user.role === 'HR' ? '#10b981' : '#6366f1',
                                            fontSize: '12px',
                                            fontWeight: '700'
                                        }}>
                                            {user.role}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    <div className="glass-card" style={{ padding: '32px' }}>
                        <h2 style={{ marginBottom: '24px', fontSize: '20px' }}>My Profile</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '4px' }}>Username</p>
                                <p style={{ fontSize: '18px', fontWeight: '600' }}>{currentUser?.username}</p>
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '4px' }}>Email Address</p>
                                <p style={{ fontSize: '18px', fontWeight: '600' }}>{currentUser?.email}</p>
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '4px' }}>Department Role</p>
                                <p style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary)' }}>{currentUser?.role}</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '32px' }}>
                        <h2 style={{ marginBottom: '24px', fontSize: '20px' }}>Quick Stats</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center' }}>
                                <p style={{ fontSize: '24px', fontWeight: '800', margin: '0' }}>12</p>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Tasks</p>
                            </div>
                            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center' }}>
                                <p style={{ fontSize: '24px', fontWeight: '800', margin: '0' }}>4</p>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Projects</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard;
