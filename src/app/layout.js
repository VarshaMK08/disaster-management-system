// src/app/layout.js
import './globals.css'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export const metadata = {
  title: 'National Disaster Management System',
  description: 'Government of India - NDMS Portal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '24px', backgroundColor: '#f0f4f8' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}