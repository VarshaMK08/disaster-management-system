'use client'
import './globals.css'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login'

  return (
    <html lang="en">
      <body>

        {!isLoginPage && <Navbar />}

        <div style={{ display: 'flex' }}>

          {!isLoginPage && <Sidebar />}

          <main style={{
            flex: 1,
            padding: isLoginPage ? '0' : '24px',
            marginLeft: isLoginPage ? '0' : '240px',
            marginTop: isLoginPage ? '0' : '80px',
            background: 'var(--bg)',
            minHeight: '100vh'
          }}>
            {children}
          </main>

        </div>

      </body>
    </html>
  )
}