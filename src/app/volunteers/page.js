'use client'
import { useState } from 'react'
import { initialVolunteers } from '@/lib/data'

const emptyForm = { name: '', skill: '', phone: '', assignedDisaster: '', status: 'Active', organization: '' }

export default function VolunteersPage() {
    const [data, setData] = useState(initialVolunteers)
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState(emptyForm)
    const [editId, setEditId] = useState(null)
    const [search, setSearch] = useState('')

    const filtered = data.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.organization.toLowerCase().includes(search.toLowerCase()) ||
        d.skill.toLowerCase().includes(search.toLowerCase())
    )

    const handleSubmit = () => {
        if (!form.name || !form.phone) return alert('Fill required fields')
        if (editId) {
            setData(data.map(d => d.id === editId ? { ...form, id: editId, assignedDisaster: Number(form.assignedDisaster) } : d))
        } else {
            setData([...data, { ...form, id: Date.now(), assignedDisaster: Number(form.assignedDisaster) }])
        }
        setShowModal(false); setForm(emptyForm); setEditId(null)
    }

    const handleEdit = (row) => { setForm(row); setEditId(row.id); setShowModal(true) }
    const handleDelete = (id) => { if (confirm('Delete this record?')) setData(data.filter(d => d.id !== id)) }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1 style={{ color: '#1a3a5c', fontSize: '22px', fontWeight: '700' }}>🙋 Volunteers Registry</h1>
                    <p style={{ color: '#6b7280', fontSize: '13px' }}>Manage volunteer deployments and skills</p>
                </div>
                <button className="gov-btn-primary" onClick={() => { setForm(emptyForm); setEditId(null); setShowModal(true) }}>+ Add Volunteer</button>
            </div>

            <div style={{ background: 'white', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
                <input className="gov-input" placeholder="🔍 Search by name, skill or organization..." value={search}
                    onChange={e => setSearch(e.target.value)} style={{ maxWidth: '400px', marginBottom: 0 }} />
            </div>

            <div style={{ background: 'white', borderRadius: '6px', overflowX: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <table className="gov-table">
                    <thead>
                        <tr><th>#</th><th>Name</th><th>Skill</th><th>Phone</th><th>Organization</th><th>Assigned Disaster</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={8} style={{ textAlign: 'center', color: '#6b7280', padding: '32px' }}>No records found</td></tr>
                        ) : filtered.map((d, i) => (
                            <tr key={d.id}>
                                <td>{i + 1}</td>
                                <td style={{ fontWeight: '600' }}>{d.name}</td>
                                <td>
                                    <span style={{ background: '#eff6ff', color: '#003087', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>{d.skill}</span>
                                </td>
                                <td>{d.phone}</td>
                                <td>{d.organization}</td>
                                <td>{d.assignedDisaster || '—'}</td>
                                <td>
                                    <span style={{ background: d.status === 'Active' ? '#f0fdf4' : '#f9fafb', color: d.status === 'Active' ? '#059669' : '#6b7280', padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>{d.status}</span>
                                </td>
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
                        <h2 style={{ color: '#1a3a5c', marginBottom: '20px', fontSize: '18px' }}>{editId ? 'Edit Volunteer' : 'Add New Volunteer'}</h2>
                        {[['Name *', 'name', 'text'], ['Phone *', 'phone', 'text'], ['Organization', 'organization', 'text'], ['Assigned Disaster ID', 'assignedDisaster', 'number']].map(([label, key, type]) => (
                            <div key={key}>
                                <label className="gov-label">{label}</label>
                                <input className="gov-input" type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                            </div>
                        ))}
                        <div>
                            <label className="gov-label">Skill</label>
                            <select className="gov-input" value={form.skill} onChange={e => setForm({ ...form, skill: e.target.value })}>
                                {['Medical', 'Search & Rescue', 'Logistics', 'Communication', 'Engineering', 'Counseling', 'Food Distribution'].map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="gov-label">Status</label>
                            <select className="gov-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                                {['Active', 'Inactive', 'On Leave', 'Deployed'].map(s => <option key={s}>{s}</option>)}
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