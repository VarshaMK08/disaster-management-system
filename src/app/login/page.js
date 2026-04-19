'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [name, setName] = useState('')
    const router = useRouter()

    const handleLogin = () => {
        if (!name) return alert('Enter your name')

        // store user in localStorage
        localStorage.setItem('user', name)

        router.push('/') // go to dashboard
    }

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #003087, #1a3a5c)'
        }}>
            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '12px',
                width: '320px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
                <h2 style={{ marginBottom: '20px', color: '#003087' }}>
                    🚨 Disaster Management System
                </h2>

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '20px',
                        borderRadius: '6px',
                        border: '1px solid #ccc'
                    }}
                />

                <button onClick={handleLogin} style={{
                    width: '100%',
                    padding: '10px',
                    background: '#d4450c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}>
                    Login
                </button>
            </div>
        </div>
    )
}