// src/components/Navbar.js
export default function Navbar() {
    return (
        <header className="gov-header" style={{ padding: '0', borderBottom: '4px solid #d4450c' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 24px', gap: '16px' }}>
                <div style={{ fontSize: '40px' }}>🇮🇳</div>
                <div>
                    <div style={{ color: '#fbbf24', fontSize: '11px', fontWeight: '600', letterSpacing: '1px' }}>
                        GOVERNMENT OF INDIA
                    </div>
                    <div style={{ color: 'white', fontSize: '20px', fontWeight: '700', fontFamily: 'Georgia, serif' }}>
                        National Disaster Management System
                    </div>
                    <div style={{ color: '#93c5fd', fontSize: '11px' }}>
                        Ministry of Home Affairs | NDMA Portal
                    </div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <div style={{ color: '#fbbf24', fontSize: '12px', fontWeight: '600' }}>🔴 LIVE MONITORING</div>
                    <div style={{ color: '#93c5fd', fontSize: '11px' }}>{new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}</div>
                </div>
            </div>
        </header>
    )
}