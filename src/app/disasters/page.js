'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useEffect } from 'react'
const emptyForm = {
    name: '',
    type: '',
    severity: 'Medium',
    location: '',
    date: '',
    status: 'Active',
    affectedPeople: ''
}

export default function DisastersPage() {
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState(emptyForm)
    const [editId, setEditId] = useState(null)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchDisasters()
    }, [])

    const fetchDisasters = async () => {
        console.log("🚀 Fetching disasters...")

        const { data, error } = await supabase
            .from('disasters')
            .select('*')
            .order('id', { ascending: false })

        console.log("✅ FETCH DATA:", data)
        console.log("❌ FETCH ERROR:", error)

        if (error) {
            console.error("Fetch failed:", error.message)
            return
        }

        setData(data || [])
    }

    const filtered = data.filter(d =>
        (d.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (d.location || '').toLowerCase().includes(search.toLowerCase())
    )

    const handleSubmit = async () => {
        if (!form.name || !form.location) {
            alert('Fill required fields')
            return
        }

        console.log("📤 Submitting form:", form)

        let error

        if (editId) {
            const res = await supabase
                .from('disasters')
                .update({
                    ...form,
                    affectedPeople: form.affectedPeople
                        ? Number(form.affectedPeople)
                        : null,
                    date: form.date ? new Date(form.date).toISOString() : null
                })
                .eq('id', editId)

            error = res.error

        } else {
            const res = await supabase
                .from('disasters')
                .insert([
                    {
                        ...form,
                        affectedPeople: form.affectedPeople
                            ? Number(form.affectedPeople)
                            : null,
                        date: form.date ? new Date(form.date).toISOString() : null
                    }
                ])

            error = res.error
        }

        console.log("❌ INSERT/UPDATE ERROR:", error)

        if (error) {
            alert("Error: " + error.message)
            return
        }

        console.log("✅ Success!")

        setShowModal(false)
        setForm(emptyForm)
        setEditId(null)

        await fetchDisasters()
    }

    const handleEdit = (row) => {
        setForm(row)
        setEditId(row.id)
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        if (confirm('Delete this record?')) {
            await supabase
                .from('disasters')
                .delete()
                .eq('id', id)

            fetchDisasters()
        }
    }

    const severityStyle = (s) => {
        switch (s) {
            case 'Critical':
                return { bg: '#fff1f2', color: '#9f1239' }   // soft rose
            case 'High':
                return { bg: '#fff7ed', color: '#9a3412' }    // soft orange
            case 'Medium':
                return { bg: '#eff6ff', color: '#1d4ed8' }    // soft blue
            default:
                return { bg: '#f0fdf4', color: '#166534' }     // soft green
        }
    }

    const statusStyle = (s) => {
        switch (s) {
            case 'Active':
                return { bg: '#fff1f2', color: '#9f1239' }
            case 'Resolved':
                return { bg: '#f0fdf4', color: '#166534' }
            default:
                return { bg: '#eff6ff', color: '#1d4ed8' }
        }
    }

    return (
        <div>

            {/* HEADER */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <div>
                    <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>
                        🌊 Disasters Registry
                    </h1>
                    <p style={{ fontSize: '13px', color: '#64748b' }}>
                        Manage all disaster events in real-time
                    </p>
                </div>

                <button className="gov-btn-primary" onClick={() => {
                    setForm(emptyForm)
                    setEditId(null)
                    setShowModal(true)
                }}>
                    + Add Disaster
                </button>
            </div>

            {/* SEARCH */}
            <div style={{
                background: 'white',
                borderRadius: '10px',
                padding: '14px',
                marginBottom: '16px',
                border: '1px solid #e2e8f0'
            }}>
                <input
                    className="gov-input"
                    placeholder="Search disasters by name or location..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ marginBottom: 0 }}
                />
            </div>

            {/* TABLE CARD */}
            <div style={{
                background: 'white',
                borderRadius: '12px',
                overflowX: 'auto',
                border: '1px solid #e2e8f0'
            }}>
                <table className="gov-table">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Severity</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Affected</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={9} style={{
                                    textAlign: 'center',
                                    padding: '30px',
                                    color: '#64748b'
                                }}>
                                    No disaster records found
                                </td>
                            </tr>
                        ) : filtered.map((d, i) => {
                            const sev = severityStyle(d.severity)
                            const st = statusStyle(d.status)

                            return (
                                <tr key={d.id}>
                                    <td>{i + 1}</td>

                                    <td style={{ fontWeight: '600' }}>
                                        {d.name}
                                    </td>

                                    <td>{d.type}</td>

                                    {/* SEVERITY BADGE */}
                                    <td>
                                        <span style={{
                                            background: sev.bg,
                                            color: sev.color,
                                            padding: '4px 10px',
                                            borderRadius: '999px',
                                            fontSize: '12px',
                                            fontWeight: '600'
                                        }}>
                                            {d.severity}
                                        </span>
                                    </td>

                                    <td>{d.location}</td>
                                    <td>{d.date}</td>

                                    {/* STATUS BADGE */}
                                    <td>
                                        <span style={{
                                            background: st.bg,
                                            color: st.color,
                                            padding: '4px 10px',
                                            borderRadius: '999px',
                                            fontSize: '12px',
                                            fontWeight: '600'
                                        }}>
                                            {d.status}
                                        </span>
                                    </td>

                                    <td style={{ fontWeight: '600' }}>
                                        {Number(d.affectedPeople).toLocaleString()}
                                    </td>

                                    <td style={{ display: 'flex', gap: '6px' }}>
                                        <button className="gov-btn-edit" onClick={() => handleEdit(d)}>
                                            Edit
                                        </button>
                                        <button className="gov-btn-danger" onClick={() => handleDelete(d.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>

            {/* MODAL */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(15,23,42,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '28px',
                        width: '520px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        border: '1px solid #e2e8f0'
                    }}>

                        <h2 style={{
                            fontSize: '18px',
                            fontWeight: '700',
                            marginBottom: '18px'
                        }}>
                            {editId ? 'Edit Disaster' : 'Add New Disaster'}
                        </h2>

                        {[
                            ['Name *', 'name', 'text'],
                            ['Type', 'type', 'text'],
                            ['Location *', 'location', 'text'],
                            ['Date', 'date', 'date'],
                            ['Affected People', 'affectedPeople', 'number']
                        ].map(([label, key, type]) => (
                            <div key={key}>
                                <label className="gov-label">{label}</label>
                                <input
                                    className="gov-input"
                                    type={type}
                                    value={form[key]}
                                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                                />
                            </div>
                        ))}

                        {/* SEVERITY */}
                        <label className="gov-label">Severity</label>
                        <select
                            className="gov-input"
                            value={form.severity}
                            onChange={e => setForm({ ...form, severity: e.target.value })}
                        >
                            {['Low', 'Medium', 'High', 'Critical'].map(s => (
                                <option key={s}>{s}</option>
                            ))}
                        </select>

                        {/* STATUS */}
                        <label className="gov-label">Status</label>
                        <select
                            className="gov-input"
                            value={form.status}
                            onChange={e => setForm({ ...form, status: e.target.value })}
                        >
                            {['Active', 'Resolved', 'Monitoring'].map(s => (
                                <option key={s}>{s}</option>
                            ))}
                        </select>

                        {/* ACTIONS */}
                        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                            <button className="gov-btn-primary" onClick={handleSubmit}>
                                {editId ? 'Update' : 'Save'}
                            </button>

                            <button onClick={() => setShowModal(false)} style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                border: '1px solid #e2e8f0',
                                cursor: 'pointer',
                                background: 'white'
                            }}>
                                Cancel
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}