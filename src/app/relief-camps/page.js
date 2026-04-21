'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useEffect } from 'react'

const emptyForm = { name: '', location: '', capacity: '', current_occupancy: '', disaster_id: '', status: 'Active', in_charge: '' }

export default function ReliefCampsPage() {
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState(emptyForm)
    const [editId, setEditId] = useState(null)
    const [search, setSearch] = useState('')

    const filtered = data.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.location.toLowerCase().includes(search.toLowerCase())
    )
    const fetchCamps = async () => {
        const { data, error } = await supabase
            .from('relief_camps')
            .select('*')
            .order('id', { ascending: false })

        console.log("CAMPS:", data, error)

        if (!error) setData(data)
    }
    useEffect(() => {
        fetchCamps()
    }, [])
    const handleSubmit = async () => {
        if (!form.name || !form.location) return alert('Fill required fields')

        const payload = {
            name: form.name,
            location: form.location,
            capacity: Number(form.capacity),
            current_occupancy: Number(form.current_occupancy),
            disaster_id: Number(form.disaster_id),
            status: form.status,
            in_charge: form.in_charge
        }

        if (editId) {
            const { error } = await supabase
                .from('relief_camps')
                .update(payload)
                .eq('id', editId)

            console.log("UPDATE ERROR:", error)

        } else {
            const { error } = await supabase
                .from('relief_camps')
                .insert([payload])

            console.log("INSERT ERROR:", error)
        }

        setShowModal(false)
        setForm(emptyForm)
        setEditId(null)

        fetchCamps()
    }

    const handleEdit = (row) => { setForm(row); setEditId(row.id); setShowModal(true) }
    const handleDelete = async (id) => {
        if (confirm('Delete this record?')) {
            const { error } = await supabase
                .from('relief_camps')
                .delete()
                .eq('id', id)

            console.log("DELETE ERROR:", error)

            fetchCamps()
        }
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1 style={{ color: '#1a3a5c', fontSize: '22px', fontWeight: '700' }}>🏕️ Relief Camps</h1>
                    <p style={{ color: '#6b7280', fontSize: '13px' }}>Manage relief camp operations and occupancy</p>
                </div>
                <button className="gov-btn-primary" onClick={() => { setForm(emptyForm); setEditId(null); setShowModal(true) }}>+ Add Camp</button>
            </div>

            <div style={{ background: 'white', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
                <input className="gov-input" placeholder="🔍 Search by name or location..." value={search}
                    onChange={e => setSearch(e.target.value)} style={{ maxWidth: '400px', marginBottom: 0 }} />
            </div>

            <div style={{ background: 'white', borderRadius: '6px', overflowX: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <table className="gov-table">
                    <thead>
                        <tr><th>#</th><th>Camp Name</th><th>Location</th><th>Capacity</th><th>Occupancy</th><th>Disaster ID</th><th>In-Charge</th><th>Status</th><th>Utilization</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={10} style={{ textAlign: 'center', color: '#6b7280', padding: '32px' }}>No records found</td></tr>
                        ) : filtered.map((d, i) => {
                            const pct = Math.round((d.current_occupancy / d.capacity) * 100)
                            return (
                                <tr key={d.id}>
                                    <td>{i + 1}</td>
                                    <td style={{ fontWeight: '600' }}>{d.name}</td>
                                    <td>{d.location}</td>
                                    <td>{d.capacity}</td>
                                    <td>{d.current_occupancy}</td>
                                    <td>{d.disaster_id}</td>
                                    <td>{d.in_charge}</td>
                                    <td>
                                        <span style={{ background: d.status === 'Active' ? '#fef2f2' : '#f0fdf4', color: d.status === 'Active' ? '#d4450c' : '#059669', padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>{d.status}</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ flex: 1, background: '#e5e7eb', borderRadius: '4px', height: '8px' }}>
                                                <div style={{ width: `${pct}%`, background: pct > 80 ? '#d4450c' : '#003087', height: '8px', borderRadius: '4px' }} />
                                            </div>
                                            <span style={{ fontSize: '12px', fontWeight: '600', color: pct > 80 ? '#d4450c' : '#374151' }}>{pct}%</span>
                                        </div>
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
                        <h2 style={{ color: '#1a3a5c', marginBottom: '20px', fontSize: '18px' }}>{editId ? 'Edit Camp' : 'Add New Camp'}</h2>
                        {[['Camp Name *', 'name', 'text'], ['Location *', 'location', 'text'], ['Capacity', 'capacity', 'number'], ['Current Occupancy', 'current_occupancy', 'number'], ['Disaster ID', 'disaster_id', 'number'], ['In-Charge Officer', 'in_charge', 'text']].map(([label, key, type]) => (
                            <div key={key}>
                                <label className="gov-label">{label}</label>
                                <input className="gov-input" type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                            </div>
                        ))}
                        <div>
                            <label className="gov-label">Status</label>
                            <select className="gov-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                                {['Active', 'Closed', 'Full', 'Standby'].map(s => <option key={s}>{s}</option>)}
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