'use client'
import { useState } from 'react'
import { initialAgencies } from '@/lib/data'

const emptyForm = { name: '', fullName: '', type: 'Central', contact: '', headOffice: '', activeDeployments: '' }

export default function AgenciesPage() {
    const [data, setData] = useState(initialAgencies)
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState(emptyForm)
    const [editId, setEditId] = useState(null)
    const [search, setSearch] = useState('')

    const filtered = data.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.fullName.toLowerCase().includes(search.toLowerCase()) ||
        d.headOffice.toLowerCase().includes(search.toLowerCase())
    )

    const handleSubmit = () => {
        if (!form.name || !form.fullName) return alert('Fill required fields')
        if (editId) {
            setData(data.map(d => d.id === editId ? { ...form, id: editId, activeDeployments: Number(form.activeDeployments) } : d))
        } else {
            setData([...data, { ...form, id: Date.now(), activeDeployments: Number(form.activeDeployments) }])
        }
        setShowModal(false); setForm(emptyForm); setEditId(null)
    }

    const handleEdit = (row) => { setForm(row); setEditId(row.id); setShowModal(true) }
    const handleDelete = (id) => { if (confirm('Delete this agency?')) setData(data.filter(d => d.id !== id)) }

    const typeColor = (t) =>
        t === 'Central'
            ? { bg: '#e0f2fe', color: '#1d4ed8' }
            : t === 'State'
                ? { bg: '#dcfce7', color: '#166534' }
                : { bg: '#fef3c7', color: '#92400e' }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1 style={{ color: '#1a3a5c', fontSize: '22px', fontWeight: '700' }}>🏢 Response Agencies</h1>
                    <p style={{ color: '#6b7280', fontSize: '13px' }}>Manage government and partner agencies</p>
                </div>
                <button className="gov-btn-primary" onClick={() => { setForm(emptyForm); setEditId(null); setShowModal(true) }}>+ Add Agency</button>
            </div>

            <div style={{ background: 'white', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
                <input className="gov-input" placeholder="🔍 Search by name or office..." value={search}
                    onChange={e => setSearch(e.target.value)} style={{ maxWidth: '400px', marginBottom: 0 }} />
            </div>

            <div style={{ background: 'white', borderRadius: '6px', overflowX: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <table className="gov-table">
                    <thead>
                        <tr><th>#</th><th>Short Name</th><th>Full Name</th><th>Type</th><th>Contact</th><th>Head Office</th><th>Active Deployments</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={8} style={{ textAlign: 'center', color: '#6b7280', padding: '32px' }}>No agencies found</td></tr>
                        ) : filtered.map((d, i) => {
                            const tc = typeColor(d.type)
                            return (
                                <tr key={d.id}>
                                    <td>{i + 1}</td>
                                    <td style={{ fontWeight: '700', color: '#0f172a' }}>{d.name}</td>
                                    <td>{d.fullName}</td>
                                    <td><span style={{ background: tc.bg, color: tc.color, padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>{d.type}</span></td>
                                    <td>{d.contact}</td>
                                    <td>{d.headOffice}</td>
                                    <td>
                                        <span style={{
                                            fontWeight: '700',
                                            color: '#0f172a',
                                            fontSize: '16px'
                                        }}>
                                            {d.activeDeployments}
                                        </span>
                                    </td>
                                    <td style={{ display: 'flex', gap: '6px' }}>
                                        <button className="gov-btn-edit" onClick={() => handleEdit(d)}>Edit</button>
                                        <button className="gov-btn-danger" onClick={() => handleDelete(d.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: '8px', padding: '32px', width: '500px', maxHeight: '90vh', overflowY: 'auto', borderTop: '4px solid #003087' }}>
                        <h2 style={{ color: '#1a3a5c', marginBottom: '20px', fontSize: '18px' }}>{editId ? 'Edit Agency' : 'Add New Agency'}</h2>
                        {[['Short Name (e.g. NDRF) *', 'name', 'text'], ['Full Name *', 'fullName', 'text'], ['Contact Number', 'contact', 'text'], ['Head Office Location', 'headOffice', 'text'], ['Active Deployments', 'activeDeployments', 'number']].map(([label, key, type]) => (
                            <div key={key}>
                                <label className="gov-label">{label}</label>
                                <input className="gov-input" type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                            </div>
                        ))}
                        <div>
                            <label className="gov-label">Agency Type</label>
                            <select className="gov-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                                {['Central', 'State', 'Advisory', 'NGO', 'International'].map(s => <option key={s}>{s}</option>)}
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