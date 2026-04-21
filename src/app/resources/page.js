'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const emptyForm = { name: '', type: '', quantity: '', unit: '', assignedCamp: '', status: 'Available' }

export default function ResourcesPage() {
    const [data, setData] = useState(initialResources)
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState(emptyForm)
    const [editId, setEditId] = useState(null)
    const [search, setSearch] = useState('')

    const filtered = data.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.type.toLowerCase().includes(search.toLowerCase())
    )

    const handleSubmit = () => {
        if (!form.name || !form.type) return alert('Fill required fields')
        if (editId) {
            setData(data.map(d => d.id === editId ? { ...form, id: editId, quantity: Number(form.quantity), assignedCamp: Number(form.assignedCamp) } : d))
        } else {
            setData([...data, { ...form, id: Date.now(), quantity: Number(form.quantity), assignedCamp: Number(form.assignedCamp) }])
        }
        setShowModal(false); setForm(emptyForm); setEditId(null)
    }

    const handleEdit = (row) => { setForm(row); setEditId(row.id); setShowModal(true) }
    const handleDelete = (id) => { if (confirm('Delete this record?')) setData(data.filter(d => d.id !== id)) }

    const statusColor = (s) => s === 'Available' ? { bg: '#f0fdf4', color: '#059669' } : s === 'Low' ? { bg: '#fffbeb', color: '#c8960c' } : { bg: '#fef2f2', color: '#d4450c' }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1 style={{ color: '#1a3a5c', fontSize: '22px', fontWeight: '700' }}>📦 Resources Management</h1>
                    <p style={{ color: '#6b7280', fontSize: '13px' }}>Track and manage all relief resources and supplies</p>
                </div>
                <button className="gov-btn-primary" onClick={() => { setForm(emptyForm); setEditId(null); setShowModal(true) }}>+ Add Resource</button>
            </div>

            <div style={{ background: 'white', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
                <input className="gov-input" placeholder="🔍 Search by name or type..." value={search}
                    onChange={e => setSearch(e.target.value)} style={{ maxWidth: '400px', marginBottom: 0 }} />
            </div>

            <div style={{ background: 'white', borderRadius: '6px', overflowX: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <table className="gov-table">
                    <thead>
                        <tr><th>#</th><th>Resource Name</th><th>Type</th><th>Quantity</th><th>Unit</th><th>Assigned Camp</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={8} style={{ textAlign: 'center', color: '#6b7280', padding: '32px' }}>No records found</td></tr>
                        ) : filtered.map((d, i) => {
                            const sc = statusColor(d.status)
                            return (
                                <tr key={d.id}>
                                    <td>{i + 1}</td>
                                    <td style={{ fontWeight: '600' }}>{d.name}</td>
                                    <td><span style={{ background: '#eff6ff', color: '#003087', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>{d.type}</span></td>
                                    <td style={{ fontWeight: '700', color: '#1a3a5c' }}>{Number(d.quantity).toLocaleString()}</td>
                                    <td>{d.unit}</td>
                                    <td>Camp #{d.assignedCamp}</td>
                                    <td><span style={{ background: sc.bg, color: sc.color, padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>{d.status}</span></td>
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
                        <h2 style={{ color: '#1a3a5c', marginBottom: '20px', fontSize: '18px' }}>{editId ? 'Edit Resource' : 'Add New Resource'}</h2>
                        {[['Resource Name *', 'name', 'text'], ['Quantity', 'quantity', 'number'], ['Unit (e.g. Packets, Liters)', 'unit', 'text'], ['Assigned Camp ID', 'assignedCamp', 'number']].map(([label, key, type]) => (
                            <div key={key}>
                                <label className="gov-label">{label}</label>
                                <input className="gov-input" type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                            </div>
                        ))}
                        <div>
                            <label className="gov-label">Type</label>
                            <select className="gov-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                                {['Food', 'Water', 'Medical', 'Shelter', 'Clothing', 'Fuel', 'Equipment'].map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="gov-label">Status</label>
                            <select className="gov-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                                {['Available', 'Low', 'Out of Stock', 'In Transit'].map(s => <option key={s}>{s}</option>)}
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