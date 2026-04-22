'use client'
import { useState } from 'react'
import { initialAlerts } from '@/lib/data'

const emptyForm = { title: '', type: 'Warning', region: '', issuedBy: '', date: '', severity: 'Medium', status: 'Active' }

export default function AlertsPage() {
    const [data, setData] = useState(initialAlerts)
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState(emptyForm)
    const [editId, setEditId] = useState(null)
    const [search, setSearch] = useState('')

    const filtered = data.filter(d =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.region.toLowerCase().includes(search.toLowerCase())
    )

    const handleSubmit = () => {
        if (!form.title || !form.region) return alert('Fill required fields')
        if (editId) {
            setData(data.map(d => d.id === editId ? { ...form, id: editId } : d))
        } else {
            setData([...data, { ...form, id: Date.now() }])
        }
        setShowModal(false); setForm(emptyForm); setEditId(null)
    }

    const handleEdit = (row) => { setForm(row); setEditId(row.id); setShowModal(true) }
    const handleDelete = (id) => { if (confirm('Delete this alert?')) setData(data.filter(d => d.id !== id)) }

    const sevColor = (s) => s === 'Critical' ? '#d4450c' : s === 'High' ? '#c8960c' : '#059669'

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1 style={{ color: '#1a3a5c', fontSize: '22px', fontWeight: '700' }}>🚨 Alerts & Warnings</h1>
                    <p style={{ color: '#6b7280', fontSize: '13px' }}>Issue and manage disaster alerts across regions</p>
                </div>
                <button className="gov-btn-primary" onClick={() => { setForm(emptyForm); setEditId(null); setShowModal(true) }}>+ Issue Alert</button>
            </div>

            <div style={{ background: 'white', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
                <input className="gov-input" placeholder="🔍 Search by title or region..." value={search}
                    onChange={e => setSearch(e.target.value)} style={{ maxWidth: '400px', marginBottom: 0 }} />
            </div>

            <div style={{ background: 'white', borderRadius: '6px', overflowX: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <table className="gov-table">
                    <thead>
                        <tr><th>#</th><th>Alert Title</th><th>Type</th><th>Region</th><th>Issued By</th><th>Date</th><th>Severity</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={9} style={{ textAlign: 'center', color: '#6b7280', padding: '32px' }}>No alerts found</td></tr>
                        ) : filtered.map((d, i) => (
                            <tr key={d.id}>
                                <td>{i + 1}</td>
                                <td style={{ fontWeight: '600' }}>{d.title}</td>
                                <td>
                                    <span style={{
                                        background: '#e0f2fe',
                                        color: '#1d4ed8',
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}>
                                        {d.type}
                                    </span>
                                </td>
                                <td>{d.region}</td>
                                <td>{d.issuedBy}</td>
                                <td>{d.date}</td>
                                <td><span style={{ color: sevColor(d.severity), fontWeight: '700' }}>⚠ {d.severity}</span></td>
                                <td>
                                    <span style={{
                                        background: d.status === 'Active' ? '#fee2e2' : '#dcfce7',
                                        color: d.status === 'Active' ? '#9f1239' : '#166534',
                                        padding: '2px 10px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}>
                                        {d.status}
                                    </span>
                                </td>                                <td style={{ display: 'flex', gap: '6px' }}>
                                    <button className="gov-btn-edit" onClick={() => handleEdit(d)}>Edit</button>
                                    <button className="gov-btn-danger" onClick={() => handleDelete(d.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: '8px', padding: '32px', width: '500px', maxHeight: '90vh', overflowY: 'auto', borderTop: '4px solid #d4450c' }}>
                        <h2 style={{ color: '#1a3a5c', marginBottom: '20px', fontSize: '18px' }}>{editId ? 'Edit Alert' : 'Issue New Alert'}</h2>
                        {[['Alert Title *', 'title', 'text'], ['Region *', 'region', 'text'], ['Issued By', 'issuedBy', 'text'], ['Date', 'date', 'date']].map(([label, key, type]) => (
                            <div key={key}>
                                <label className="gov-label">{label}</label>
                                <input className="gov-input" type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                            </div>
                        ))}
                        <div>
                            <label className="gov-label">Type</label>
                            <select className="gov-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                                {['Warning', 'Watch', 'Advisory', 'Emergency', 'All Clear'].map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="gov-label">Severity</label>
                            <select className="gov-input" value={form.severity} onChange={e => setForm({ ...form, severity: e.target.value })}>
                                {['Low', 'Medium', 'High', 'Critical'].map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="gov-label">Status</label>
                            <select className="gov-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                                {['Active', 'Resolved', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                            <button className="gov-btn-primary" onClick={handleSubmit}>{editId ? 'Update' : 'Issue Alert'}</button>
                            <button onClick={() => setShowModal(false)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #d1d5db', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}