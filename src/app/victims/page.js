'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useEffect } from 'react'

const emptyForm = { name: '', age: '', gender: 'Male', disasterId: '', location: '', status: 'In Relief Camp', contact: '' }

export default function VictimsPage() {
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState(emptyForm)
    const [editId, setEditId] = useState(null)
    const [search, setSearch] = useState('')

    const filtered = data.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.location.toLowerCase().includes(search.toLowerCase())
    )
    const fetchVictims = async () => {
        const { data, error } = await supabase
            .from('victims')
            .select('*')
            .order('id', { ascending: false })

        console.log("FETCH VICTIMS:", data, error)

        if (!error) setData(data)
    }
    useEffect(() => {
        fetchVictims()
    }, [])
    const handleSubmit = async () => {
        if (!form.name || !form.location) return alert('Fill required fields')

        if (editId) {
            const { error } = await supabase
                .from('victims')
                .update({
                    ...form,
                    age: Number(form.age),
                    disasterId: Number(form.disasterId)
                })
                .eq('id', editId)

            console.log("UPDATE ERROR:", error)

        } else {
            const { error } = await supabase
                .from('victims')
                .insert([
                    {
                        ...form,
                        age: Number(form.age),
                        disasterId: Number(form.disasterId)
                    }
                ])

            console.log("INSERT ERROR:", error)
        }

        setShowModal(false)
        setForm(emptyForm)
        setEditId(null)

        fetchVictims()
    }

    const handleEdit = (row) => { setForm(row); setEditId(row.id); setShowModal(true) }
    const handleDelete = async (id) => {
        if (confirm('Delete this record?')) {
            const { error } = await supabase
                .from('victims')
                .delete()
                .eq('id', id)

            console.log("DELETE ERROR:", error)

            fetchVictims()
        }
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1 style={{ color: '#1a3a5c', fontSize: '22px', fontWeight: '700' }}>👥 Victims Registry</h1>
                    <p style={{ color: '#6b7280', fontSize: '13px' }}>Manage all disaster-affected victim records</p>
                </div>
                <button className="gov-btn-primary" onClick={() => { setForm(emptyForm); setEditId(null); setShowModal(true) }}>+ Add Victim</button>
            </div>

            <div style={{ background: 'white', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
                <input className="gov-input" placeholder="🔍 Search by name or location..." value={search}
                    onChange={e => setSearch(e.target.value)} style={{ maxWidth: '400px', marginBottom: 0 }} />
            </div>

            <div style={{ background: 'white', borderRadius: '6px', overflowX: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <table className="gov-table">
                    <thead>
                        <tr><th>#</th><th>Name</th><th>Age</th><th>Gender</th><th>Disaster ID</th><th>Location</th><th>Status</th><th>Contact</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={9} style={{ textAlign: 'center', color: '#6b7280', padding: '32px' }}>No records found</td></tr>
                        ) : filtered.map((d, i) => (
                            <tr key={d.id}>
                                <td>{i + 1}</td>
                                <td style={{ fontWeight: '600' }}>{d.name}</td>
                                <td>{d.age}</td>
                                <td>{d.gender}</td>
                                <td>{d.disasterId}</td>
                                <td>{d.location}</td>
                                <td>
                                    <span style={{
                                        background: d.status === 'Missing' ? '#fef2f2' : d.status === 'Rescued' ? '#f0fdf4' : '#eff6ff',
                                        color: d.status === 'Missing' ? '#d4450c' : d.status === 'Rescued' ? '#059669' : '#003087',
                                        padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600'
                                    }}>{d.status}</span>
                                </td>
                                <td>{d.contact}</td>
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
                        <h2 style={{ color: '#1a3a5c', marginBottom: '20px', fontSize: '18px' }}>{editId ? 'Edit Victim' : 'Add New Victim'}</h2>
                        {[['Name *', 'name', 'text'], ['Age', 'age', 'number'], ['Disaster ID', 'disasterId', 'number'], ['Location *', 'location', 'text'], ['Contact', 'contact', 'text']].map(([label, key, type]) => (
                            <div key={key}>
                                <label className="gov-label">{label}</label>
                                <input className="gov-input" type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                            </div>
                        ))}
                        <div>
                            <label className="gov-label">Gender</label>
                            <select className="gov-input" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                                {['Male', 'Female', 'Other'].map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="gov-label">Status</label>
                            <select className="gov-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                                {['In Relief Camp', 'Missing', 'Rescued', 'Hospitalized', 'Deceased'].map(s => <option key={s}>{s}</option>)}
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