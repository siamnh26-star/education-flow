'use client'

import { useState } from 'react'
import Link from 'next/link'

const courses = [
  { id: 1, title: 'Web Development', students: 1200, price: '৳৩০,০০০' },
  { id: 2, title: 'Python Basics', students: 950, price: '৳১৭,১০০' },
  { id: 3, title: 'UI/UX Design', students: 800, price: '৳১৬,০০০' },
]

export default function Dashboard() {
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      {/* Sidebar */}
      <div style={{ padding: 20, borderBottom: '1px solid #00ff8820' }}>
        <h2 style={{ color: '#00ff88', fontSize: 20, fontWeight: 'bold' }}>⚙️ Admin Panel</h2>
      </div>

      {/* Main */}
      <div style={{ padding: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>ড্যাশবোর্ড</h1>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'মোট কোর্স', value: '৫০+' },
            { label: 'শিক্ষার্থী', value: '১০,০০০+' },
            { label: 'মোট আয়', value: '৳৫লাখ' },
            { label: 'এক্টিভ', value: '৪৫' },
          ].map((s, i) => (
            <div key={i} style={{ padding: 16, borderRadius: 12, border: '1px solid #00ff8840' }}>
              <div style={{ fontSize: 20, fontWeight: 'bold', color: '#00ff88' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#888' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Add Button */}
        <button onClick={() => setShowAdd(true)} style={{ background: '#00ff88', color: '#000', padding: '10px 20px', borderRadius: 8, border: 'none', fontWeight: 'bold', marginBottom: 20, cursor: 'pointer' }}>
          + নতুন কোর্স
        </button>

        {/* Course List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {courses.map(c => (
            <div key={c.id} style={{ padding: 16, borderRadius: 12, background: '#111', border: '1px solid #00ff8810', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontWeight: 'bold' }}>{c.title}</h3>
                <span style={{ color: '#888', fontSize: 12 }}>👥 {c.students}</span>
              </div>
              <div>
                <span style={{ color: '#00ff88', fontWeight: 'bold' }}>{c.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 50 }}>
          <div style={{ background: '#111', borderRadius: 16, padding: 24, width: '100%', maxWidth: 500, border: '1px solid #00ff8840' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontWeight: 'bold' }}>নতুন কোর্স</h2>
              <button onClick={() => setShowAdd(false)} style={{ background: 'none', border: 'none', color: '#888', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input placeholder="কোর্স নাম" style={{ padding: 12, borderRadius: 8, background: '#0a0a0a', border: '1px solid #00ff8820', color: 'white' }} />
              <input placeholder="দাম" style={{ padding: 12, borderRadius: 8, background: '#0a0a0a', border: '1px solid #00ff8820', color: 'white' }} />
              <button style={{ background: '#00ff88', color: '#000', padding: 12, borderRadius: 8, border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                যোগ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: 20 }}>
        <Link href="/" style={{ color: '#ff6b6b', textDecoration: 'none' }}>🚪 লগআউট</Link>
      </div>
    </div>
  )
      }
