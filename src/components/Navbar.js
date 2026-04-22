export default function Navbar() {
    return (
        <header style={{
            background: 'linear-gradient(90deg, #e0f2fe, #f0fdfa)',
            padding: '22px 28px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000
        }}>

            {/* LEFT */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ fontSize: '32px' }}>🌍</div>

                <div>
                    <div style={{
                        color: '#0f172a',
                        fontSize: '12px',
                        fontWeight: '600',
                        letterSpacing: '1px'
                    }}>
                        DISASTER RESPONSE SYSTEM
                    </div>

                    <div style={{
                        color: '#0f172a',
                        fontSize: '20px',
                        fontWeight: '800'
                    }}>
                        National Disaster Management System
                    </div>

                    <div style={{
                        color: '#64748b',
                        fontSize: '12px'
                    }}>
                        Real-time coordination & relief tracking
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            <div style={{ textAlign: 'right' }}>
                <div style={{
                    color: '#ef4444',
                    fontWeight: '700',
                    fontSize: '13px'
                }}>
                    ● LIVE
                </div>

                <div style={{
                    color: '#64748b',
                    fontSize: '12px'
                }}>
                    {new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
                </div>
            </div>

        </header>
    )
}