'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const navItems = [
    { href: '/', label: 'Dashboard', icon: '🏠' },
    { href: '/disasters', label: 'Disasters', icon: '🌊' },
    { href: '/victims', label: 'Victims', icon: '👥' },
    { href: '/relief-camps', label: 'Camps', icon: '🏕️' },
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
        if (!storedUser) router.push('/login')
        else setUser(storedUser)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user')
        router.push('/login')
    }

    return (
        <aside style={{
            position: 'fixed',
            top: '120px',
            left: 0,
            width: '240px',
            height: 'calc(100vh - 120px)',
            background: 'var(--card)',
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto'
        }}>

            {/* NAV */}
            <div style={{ paddingTop: '12px' }}>
                {navItems.map(item => (
                    <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            margin: '4px 10px',
                            borderRadius: '8px',
                            background: pathname === item.href ? '#e0f2fe' : 'transparent',
                            color: pathname === item.href ? 'var(--primary)' : 'var(--text)',
                            cursor: 'pointer'
                        }}>
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* USER */}
            <div style={{
                padding: '16px',
                borderTop: '1px solid var(--border)'
            }}>
                <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                    👤 {user}
                </div>

                <button onClick={handleLogout} style={{
                    background: 'var(--danger)',
                    color: 'white',
                    border: 'none',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                }}>
                    Logout
                </button>
            </div>

        </aside>
    )
}