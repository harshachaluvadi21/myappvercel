import { useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"

function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
        navigate("/login")
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
            <div className="glass-card" style={{ padding: '60px', maxWidth: '800px', width: '100%' }}>
                <h1 style={{ fontSize: '56px', fontWeight: '800', marginBottom: '24px', background: 'linear-gradient(to right, #6366f1, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Antigravity Enterprise
                </h1>
                <p style={{ fontSize: '20px', color: 'var(--text-muted)', marginBottom: '40px', lineHeight: '1.6' }}>
                    The ultimate platform for modern company management. Experience power, speed, and premium design in one unified interface.
                </p>

                {user ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <p style={{ fontSize: '18px', fontWeight: '500' }}>Welcome back, <span style={{ color: 'var(--primary)' }}>{user.username}</span></p>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            {(user.role === 'HR' || user.role === 'MANAGER') && (
                                <button className="btn-premium" onClick={() => navigate("/dashboard")}>
                                    Go to Dashboard
                                </button>
                            )}
                            <button className="btn-premium" style={{ background: 'transparent', border: '1px solid var(--glass-border)' }} onClick={logout}>
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Link to="/login" className="btn-premium" style={{ textDecoration: 'none' }}>Get Started</Link>
                        <Link to="/reg" className="btn-premium" style={{ textDecoration: 'none', background: 'transparent', border: '1px solid var(--glass-border)' }}>Join Us</Link>
                    </div>
                )}
            </div>

            <div style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', maxWidth: '1000px', width: '100%' }}>
                {['Security', 'Insights', 'Cloud'].map((feature) => (
                    <div key={feature} className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '12px' }}>{feature}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Enterprise-grade performance and reliability for your business.</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;