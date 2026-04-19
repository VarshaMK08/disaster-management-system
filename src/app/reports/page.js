'use client'
import { initialDisasters, initialVictims, initialReliefCamps, initialVolunteers, initialResources, initialAlerts, initialAgencies } from '@/lib/data'

export default function ReportsPage() {
    const totalAffected = initialDisasters.reduce((s, d) => s + d.affectedPeople, 0)
    const activeDisasters = initialDisasters.filter(d => d.status === 'Active').length
    const missingVictims = initialVictims.filter(v => v.status === 'Missing').length
    const totalCapacity = initialReliefCamps.reduce((s, c) => s + c.capacity, 0)
    const totalOccupancy = initialReliefCamps.reduce((s, c) => s + c.currentOccupancy, 0)
    const activeVolunteers = initialVolunteers.filter(v => v.status === 'Active').length
    const lowResources = initialResources.filter(r => r.status === 'Low' || r.status === 'Out of Stock').length
    const activeAlerts = initialAlerts.filter(a => a.status === 'Active').length

    const Section = ({ title, children }) => (
        <div style={{ background: 'white', borderRadius: '6px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ color: '#1a3a5c', fontSize: '16px', fontWeight: '700', marginBottom: '16px', borderBottom: '2px solid #003087', paddingBottom: '8px' }}>{title}</h2>
            {children}
        </div>
    )

    const Row = ({ label, value, highlight }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
            <span style={{ color: '#374151', fontSize: '14px' }}>{label}</span>
            <span style={{ fontWeight: '700', color: highlight || '#1a3a5c', fontSize: '15px' }}>{value}</span>
        </div>
    )

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ color: '#1a3a5c', fontSize: '22px', fontWeight: '700' }}>📊 Summary Reports</h1>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Consolidated overview of all disaster management operations</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <Section title="🌊 Disaster Summary">
                    <Row label="Total Disasters Recorded" value={initialDisasters.length} />
                    <Row label="Active Disasters" value={activeDisasters} highlight="#d4450c" />
                    <Row label="Resolved Disasters" value={initialDisasters.length - activeDisasters} highlight="#059669" />
                    <Row label="Total People Affected" value={totalAffected.toLocaleString()} highlight="#003087" />
                    <Row label="Critical Severity" value={initialDisasters.filter(d => d.severity === 'Critical').length} highlight="#d4450c" />
                </Section>

                <Section title="👥 Victims Summary">
                    <Row label="Total Victims Registered" value={initialVictims.length} />
                    <Row label="In Relief Camps" value={initialVictims.filter(v => v.status === 'In Relief Camp').length} />
                    <Row label="Rescued" value={initialVictims.filter(v => v.status === 'Rescued').length} highlight="#059669" />
                    <Row label="Missing" value={missingVictims} highlight="#d4450c" />
                    <Row label="Hospitalized" value={initialVictims.filter(v => v.status === 'Hospitalized').length} highlight="#c8960c" />
                </Section>

                <Section title="🏕️ Relief Camps Summary">
                    <Row label="Total Camps Operational" value={initialReliefCamps.length} />
                    <Row label="Active Camps" value={initialReliefCamps.filter(c => c.status === 'Active').length} />
                    <Row label="Total Capacity" value={totalCapacity.toLocaleString()} />
                    <Row label="Current Occupancy" value={totalOccupancy.toLocaleString()} />
                    <Row label="Overall Utilization" value={`${Math.round((totalOccupancy / totalCapacity) * 100)}%`} highlight={totalOccupancy / totalCapacity > 0.8 ? '#d4450c' : '#059669'} />
                </Section>

                <Section title="🙋 Volunteers Summary">
                    <Row label="Total Volunteers" value={initialVolunteers.length} />
                    <Row label="Active Volunteers" value={activeVolunteers} highlight="#059669" />
                    <Row label="Inactive / On Leave" value={initialVolunteers.length - activeVolunteers} highlight="#6b7280" />
                    <Row label="Organizations Involved" value={[...new Set(initialVolunteers.map(v => v.organization))].length} />
                    <Row label="Skills Covered" value={[...new Set(initialVolunteers.map(v => v.skill))].length} />
                </Section>

                <Section title="📦 Resources Summary">
                    <Row label="Total Resource Types" value={initialResources.length} />
                    <Row label="Available" value={initialResources.filter(r => r.status === 'Available').length} highlight="#059669" />
                    <Row label="Low Stock / Out of Stock" value={lowResources} highlight="#d4450c" />
                    <Row label="In Transit" value={initialResources.filter(r => r.status === 'In Transit').length} highlight="#c8960c" />
                </Section>

                <Section title="🚨 Alerts & Agencies Summary">
                    <Row label="Total Alerts Issued" value={initialAlerts.length} />
                    <Row label="Active Alerts" value={activeAlerts} highlight="#d4450c" />
                    <Row label="Resolved Alerts" value={initialAlerts.length - activeAlerts} highlight="#059669" />
                    <Row label="Total Agencies" value={initialAgencies.length} />
                    <Row label="Total Active Deployments" value={initialAgencies.reduce((s, a) => s + a.activeDeployments, 0)} highlight="#003087" />
                </Section>
            </div>
        </div>
    )
}