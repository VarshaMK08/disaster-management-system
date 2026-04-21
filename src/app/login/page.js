'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()

    // -------- STATE --------
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [showOtp, setShowOtp] = useState(false)
    const [mode, setMode] = useState('phone')

    // -------- PHONE LOGIN --------
    const handlePhoneSubmit = () => {
        if (!phone) return alert('Enter phone number')
        setShowOtp(true)
        alert('Dummy OTP: 1234')
    }

    // -------- EMAIL LOGIN --------
    const handleEmailSubmit = () => {
        if (!email) return alert('Enter email')
        setShowOtp(true)
        alert('Dummy OTP: 1234')
    }

    // -------- OTP VERIFY --------
    const verifyOtp = () => {
        if (otp !== '1234') return alert('Invalid OTP')
        localStorage.setItem('user', phone || email)
        router.push('/')
    }

    return (
        // 🔴 BACKGROUND IMAGE
        <div style={{
            height: '100vh',
            backgroundImage: "url('/bg.jpg')", // 👉 put image in /public/bg.jpg
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>

            {/* 🟢 OVERLAY */}
            <div style={{
                height: '100%',
                width: '100%',
                background: 'rgba(0,0,0,0)', // overlay for readability
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                {/* 🟡 LOGIN CARD */}
                <div style={{
                    background: 'white',
                    padding: '35px',
                    borderRadius: '12px',
                    width: '340px',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.3)'
                }}>

                    {/* 🔵 TITLE INSIDE CARD */}
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}>
                        <div style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#003087',
                            letterSpacing: '1px'
                        }}>
                            🇮🇳 NDMS
                        </div>

                        <div style={{
                            fontSize: '13px',
                            color: '#6b7280'
                        }}>
                            National Disaster Management System
                        </div>
                    </div>

                    {/* 🔄 SWITCH */}
                    <div style={{
                        display: 'flex',
                        marginBottom: '15px'
                    }}>
                        <button onClick={() => setMode('phone')} style={modeBtn(mode === 'phone')}>
                            Phone
                        </button>
                        <button onClick={() => setMode('email')} style={modeBtn(mode === 'email')}>
                            Email
                        </button>
                    </div>

                    {/* 📱 PHONE LOGIN */}
                    {mode === 'phone' && (
                        <>
                            <input
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                style={input}
                            />
                            <button onClick={handlePhoneSubmit} style={primaryBtn}>
                                Continue
                            </button>
                        </>
                    )}

                    {/* 📧 EMAIL LOGIN */}
                    {mode === 'email' && (
                        <>
                            <input
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={input}
                            />
                            <button onClick={handleEmailSubmit} style={primaryBtn}>
                                Send Code
                            </button>
                        </>
                    )}
                </div>

                {/* 🔴 OTP MODAL */}
                {showOtp && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.6)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            background: 'white',
                            padding: '25px',
                            borderRadius: '10px',
                            width: '300px',
                            textAlign: 'center'
                        }}>
                            <h3>Enter OTP</h3>

                            <input
                                placeholder="Enter 1234"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                style={input}
                            />

                            <button onClick={verifyOtp} style={primaryBtn}>
                                Verify
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

/* ---------- STYLES ---------- */

const input = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc'
}

const primaryBtn = {
    width: '100%',
    padding: '10px',
    background: '#d4450c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer'
}

const modeBtn = (active) => ({
    flex: 1,
    padding: '8px',
    background: active ? '#003087' : '#eee',
    color: active ? 'white' : 'black',
    border: 'none',
    cursor: 'pointer'
})