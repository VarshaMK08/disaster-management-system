// src/app/page.js
'use client'
import { initialDisasters, initialVictims, initialReliefCamps, initialVolunteers, initialResources } from '@/lib/data'

const StatCard = ({ icon, label, value, color }) => (
  <div style={{
    background: 'white', borderRadius: '6px', padding: '20px',
    borderTop: `4px solid ${color}`, boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    display: 'flex', alignItems: 'center', gap: '16px'
  }}>
    <div style={{ fontSize: '36px' }}>{icon}</div>
    <div>
      <div style={{ fontSize: '28px', fontWeight: '700', color: color }}>{value}</div>
      <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '600' }}>{label}</div>
    </div>
  </div>
)

export default function Dashboard() {
  const activeDisasters = initialDisasters.filter(d => d.status === 'Active').length
  const totalAffected = initialDisasters.reduce((sum, d) => sum + d.affectedPeople, 0)

  return (
    <div>
      <h1 style={{ color: '#1a3a5c', fontSize: '22px', fontWeight: '700', marginBottom: '4px' }}>
        📋 Dashboard Overview
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '13px' }}>
        Real-time status of disaster management operations across India
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <StatCard icon="🌊" label="Active Disasters" value={activeDisasters} color="#d4450c" />
        <StatCard icon="👥" label="Total Victims" value={initialVictims.length} color="#003087" />
        <StatCard icon="🏕️" label="Relief Camps" value={initialReliefCamps.length} color="#1a3a5c" />
        <StatCard icon="🙋" label="Volunteers" value={initialVolunteers.length} color="#c8960c" />
        <StatCard icon="📦" label="Resource Types" value={initialResources.length} color="#059669" />
        <StatCard icon="🧑‍🤝‍🧑" label="People Affected" value={totalAffected.toLocaleString()} color="#7c3aed" />
      </div>

      <div style={{ background: 'white', borderRadius: '6px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h2 style={{ color: '#1a3a5c', fontSize: '16px', fontWeight: '700', marginBottom: '16px', borderBottom: '2px solid #003087', paddingBottom: '8px' }}>
          🌊 Recent Disasters
        </h2>
        <table className="gov-table">
          <thead>
            <tr>
              <th>Name</th><th>Type</th><th>Location</th><th>Severity</th><th>Status</th><th>Affected</th>
            </tr>
          </thead>
          <tbody>
            {initialDisasters.map(d => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.type}</td>
                <td>{d.location}</td>
                <td><span style={{ color: d.severity === 'Critical' ? '#d4450c' : d.severity === 'High' ? '#c8960c' : '#059669', fontWeight: '600' }}>{d.severity}</span></td>
                <td><span style={{ background: d.status === 'Active' ? '#fef2f2' : '#f0fdf4', color: d.status === 'Active' ? '#d4450c' : '#059669', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>{d.status}</span></td>
                <td>{d.affectedPeople.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}