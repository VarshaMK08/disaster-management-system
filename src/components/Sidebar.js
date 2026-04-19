'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const navItems = [
    { href: '/', label: 'Dashboard', icon: '🏠' },
    { href: '/disasters', label: 'Disasters', icon: '🌊' },
    { href: '/victims', label: 'Victims', icon: '👥' },
    { href: '/relief-camps', label: 'Relief Camps', icon: '🏕️' },
    { href: '/volunteers', label: 'Volunteers', icon: '🙋' },
    { href: '/resources', label: 'Resources', icon: '📦' },
    { href: '/alerts', label: 'Alerts', icon: '🚨' },
    { href: '/agencies', label: 'Agencies', icon: '🏢' },
    { href: '/reports', label: 'Reports', icon: '📊' },
]

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) {
            router.push('/login')
        } else {
            setUser(storedUser)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user')
        router.push('/login')
    }

    return (
        <aside
            className="gov-sidebar"
            style={{
                width: '220px',
                minHeight: '100vh',
                paddingTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between' // 👈 important
            }}
        >
            {/* Top Navigation */}
            <div>
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '12px 20px', cursor: 'pointer',
                            backgroundColor: pathname === item.href ? '#003087' : 'transparent',
                            borderLeft: pathname === item.href ? '4px solid #d4450c' : '4px solid transparent',
                            color: pathname === item.href ? 'white' : '#93c5fd',
                            fontSize: '14px',
                            fontWeight: pathname === item.href ? '600' : '400',
                        }}>
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Bottom User Section */}
            <div style={{
                padding: '16px',
                borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>
                    {user}
                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: '6px',
                        background: 'none',
                        border: 'none',
                        color: '#f87171',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }}
                >
                    Logout
                </button>
            </div>
        </aside>
    )
}