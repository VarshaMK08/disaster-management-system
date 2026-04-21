'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

/* 🔹 STAT CARD */
const StatCard = ({ icon, label, value, color, onClick }) => (
  <div
    onClick={onClick}
    style={{
      cursor: 'pointer',
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      border: '1px solid #e5e7eb'
    }}
  >
    <div style={{
      fontSize: '32px',
      background: '#f1f5f9',
      padding: '12px',
      borderRadius: '10px'
    }}>
      {icon}
    </div>

    <div>
      <div style={{
        fontSize: '24px',
        fontWeight: '700',
        color: color
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '13px',
        color: '#6b7280'
      }}>
        {label}
      </div>
    </div>
  </div>
)

export default function Dashboard() {

  const [disasters, setDisasters] = useState([])
  const [victims, setVictims] = useState([])
  const [camps, setCamps] = useState([])
  const [volunteers, setVolunteers] = useState([])
  const [resources, setResources] = useState([])

  const router = useRouter()

  /* 🔹 FETCH DATA */
  const fetchData = async () => {
    console.log("🚀 Fetching dashboard data...")

    const { data: disastersData } = await supabase.from('disasters').select('*')
    const { data: victimsData } = await supabase.from('victims').select('*')
    const { data: campsData } = await supabase.from('relief_camps').select('*')
    const { data: volunteersData } = await supabase.from('volunteers').select('*')
    const { data: resourcesData } = await supabase.from('resources').select('*')

    setDisasters(disastersData || [])
    setVictims(victimsData || [])
    setCamps(campsData || [])
    setVolunteers(volunteersData || [])
    setResources(resourcesData || [])
  }

  useEffect(() => {
    fetchData()
  }, [])

  /* 🔹 CALCULATIONS */
  const activeDisasters = disasters.filter(d => d.status === 'Active').length

  const totalAffected = disasters.reduce(
    (sum, d) => sum + (d.affectedPeople || 0),
    0
  )

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    }}>
      {/* 🔵 HEADER */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{
          fontSize: '26px',
          fontWeight: '400',
          color: '#1e293b'
        }}>
          📊 Dashboard
        </h1>

        <p style={{ color: '#64748b' }}>
          Monitor disaster management operations across India
        </p>
      </div>

      {/* 🟡 STATS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '18px',
        marginBottom: '30px'
      }}>
        <StatCard icon="🌊" label="Active Disasters" value={activeDisasters} color="#ef4444" onClick={() => router.push('/disasters')} />
        <StatCard icon="👥" label="Total Victims" value={victims.length} color="#2563eb" onClick={() => router.push('/victims')} />
        <StatCard icon="🏕️" label="Relief Camps" value={camps.length} color="#0f172a" onClick={() => router.push('/relief-camps')} />
        <StatCard icon="🙋" label="Volunteers" value={volunteers.length} color="#f59e0b" onClick={() => router.push('/volunteers')} />
        <StatCard icon="📦" label="Resources" value={resources.length} color="#10b981" onClick={() => router.push('/resources')} />
        <StatCard icon="🧑‍🤝‍🧑" label="People Affected" value={totalAffected.toLocaleString()} color="#7c3aed" onClick={() => router.push('/disasters')} />
      </div>

      {/* 🖼️ IMAGE SLIDER */}
      <div style={{
        overflow: 'hidden',
        borderRadius: '12px',
        marginBottom: '30px',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          gap: '20px',
          width: 'max-content',
          animation: 'scroll 20s linear infinite'
        }}>
          {[
            'https://images.unsplash.com/photo-1547683905-f686c993aae5',
            'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
            'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4',
            'https://images.unsplash.com/photo-1473448912268-2022ce9509d8',
            'https://images.unsplash.com/photo-1509099836639-18ba1795216d'
          ]
            // 🔥 DUPLICATE ARRAY
            .concat([
              'https://images.unsplash.com/photo-1547683905-f686c993aae5',
              'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
              'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4',
              'https://images.unsplash.com/photo-1473448912268-2022ce9509d8',
              'https://images.unsplash.com/photo-1509099836639-18ba1795216d'
            ])
            .map((img, i) => (
              <img
                key={i}
                src={img}
                style={{
                  width: '300px',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '10px'
                }}
              />
            ))}
        </div>
      </div>

      {/* 📘 ABOUT */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '20px',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700' }}>
          🌍 About Us
        </h2>

        <p style={{ color: '#475569', marginTop: '10px', lineHeight: '1.6' }}>
          Our Disaster Management System is designed to monitor, track, and respond
          to disasters in real-time across India. It connects authorities,
          volunteers, and resources to ensure faster response and better coordination
          during emergencies.
        </p>
      </div>

      {/* 📞 CONTACT */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700' }}>
          📞 Contact Us
        </h2>

        <p style={{ color: '#475569', marginTop: '10px' }}>
          📍 New Delhi, India
        </p>
        <p style={{ color: '#475569' }}>
          📧 support@disastermanagement.in
        </p>
        <p style={{ color: '#475569' }}>
          📱 +91 98765 43210
        </p>
        <p style={{ color: '#475569' }}>
          🌐 www.disastermanagement.in
        </p>
      </div>

      {/* 🎬 ANIMATION */}
      <style jsx>{`
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`}</style>

    </div>
  )
}