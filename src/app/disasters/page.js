'use client'
import { useState } from 'react'
import { initialDisasters } from '@/lib/data'

const emptyForm = { name: '', type: '', severity: 'Medium', location: '', date: '', status: 'Active', affectedPeople: '' }

export default function DisastersPage() {
    const [data, setData] = useState(initialDisasters)
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState(emptyForm)
    const [editId, setEditId] = useState(null)
    const [search, setSearch] = useState('')

    const filtered = data.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.location.toLowerCase().includes(search.toLowerCase())
    )

    const handleSubmit = () => {
        if (!form.name || !form.location) return alert('Fill required fields')
        if (editId) {
            setData(data.map(d => d.id === editId ? { ...form, id: editId, affectedPeople: Number(form.affectedPeople) } : d))
        } else {
            setData([...data, { ...form, id: Date.now(), affectedPeople: Number(form.affectedPeople) }])
        }
        setShowModal(false); setForm(emptyForm); setEditId(null)
    }

    const handleEdit = (row) => { setForm(row); setEditId(row.id); setShowModal(true) }
    const handleDelete = (id) => { if (confirm('Delete this record?')) setData(data.filter(d => d.id !== id)) }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1 style={{ color: '#1a3a5c', fontSize: '22px', fontWeight: '700' }}>🌊 Disasters Registry</h1>
                    <p style={{ color: '#6b7280', fontSize: '13px' }}>Manage all disaster records</p>
                </div>
                <button className="gov-btn-primary" onClick={() => { setForm(emptyForm); setEditId(null); setShowModal(true) }}>
                    + Add Disaster
                </button>
            </div>

            <div style={{ background: 'white', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
                <input className="gov-input" placeholder="🔍 Search by name or location..." value={search}
                    onChange={e => setSearch(e.target.value)} style={{ maxWidth: '400px', marginBottom: 0 }} />
            </div>

            <div style={{ background: 'white', borderRadius: '6px', overflowX: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <table className="gov-table">
                    <thead>
                        <tr><th>#</th><th>Name</th><th>Type</th><th>Severity</th><th>Location</th><th>Date</th><th>Status</th><th>Affected</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={9} style={{ textAlign: 'center', color: '#6b7280', padding: '32px' }}>No records found</td></tr>
                        ) : filtered.map((d, i) => (
                            <tr key={d.id}>
                                <td>{i + 1}</td>
                                <td style={{ fontWeight: '600' }}>{d.name}</td>
                                <td>{d.type}</td>
                                <td><span style={{ color: d.severity === 'Critical' ? '#d4450c' : d.severity === 'High' ? '#c8960c' : '#059669', fontWeight: '600' }}>{d.severity}</span></td>
                                <td>{d.location}</td>
                                <td>{d.date}</td>
                                <td><span style={{ background: d.status === 'Active' ? '#fef2f2' : '#f0fdf4', color: d.status === 'Active' ? '#d4450c' : '#059669', padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>{d.status}</span></td>
                                <td>{Number(d.affectedPeople).toLocaleString()}</td>
                                <td style={{ display: 'flex', gap: '6px' }}>
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
                    <div style={{ background: 'white', borderRadius: '8px', padding: '32px', width: '500px', maxHeight: '90vh', overflowY: 'auto', borderTop: '4px solid #003087' }}>
                        <h2 style={{ color: '#1a3a5c', marginBottom: '20px', fontSize: '18px' }}>{editId ? 'Edit Disaster' : 'Add New Disaster'}</h2>
                        {[['Name *', 'name', 'text'], ['Type', 'type', 'text'], ['Location *', 'location', 'text'], ['Date', 'date', 'date'], ['Affected People', 'affectedPeople', 'number']].map(([label, key, type]) => (
                            <div key={key}>
                                <label className="gov-label">{label}</label>
                                <input className="gov-input" type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                            </div>
                        ))}
                        <div>
                            <label className="gov-label">Severity</label>
                            <select className="gov-input" value={form.severity} onChange={e => setForm({ ...form, severity: e.target.value })}>
                                {['Low', 'Medium', 'High', 'Critical'].map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="gov-label">Status</label>
                            <select className="gov-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                                {['Active', 'Resolved', 'Monitoring'].map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                            <button className="gov-btn-primary" onClick={handleSubmit}>{editId ? 'Update' : 'Save'}</button>
                            <button onClick={() => setShowModal(false)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #d1d5db', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}