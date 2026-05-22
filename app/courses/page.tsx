'use client'

import { useState } from 'react'
import Link from 'next/link'

const courses = [
  { id: 1, title: 'Web Development', category: 'প্রোগ্রামিং', price: '৳২,৫০০', old: '৳৫,০০০', level: 'বিগিনার', icon: '💻' },
  { id: 2, title: 'Python Basics', category: 'প্রোগ্রামিং', price: '৳১,৮০০', old: '৳৩,৬০০', level: 'বিগিনার', icon: '🐍' },
  { id: 3, title: 'UI/UX Design', category: 'ডিজাইন', price: '৳২,০০০', old: '৳৪,০০০', level: 'মিডলেভেল', icon: '🎨' },
  { id: 4, title: 'Digital Marketing', category: 'মার্কেটিং', price: '৳১,৫০০', old: '৳৩,০০০', level: 'বিগিনার', icon: '📈' },
  { id: 5, title: 'Machine Learning', category: 'ডাটা সায়েন্স', price: '৳৩,০০০', old: '৳৬,০০০', level: 'এডভান্সড', icon: '🤖' },
  { id: 6, title: 'React & Next.js', category: 'প্রোগ্রামিং', price: '৳২,২০০', old: '৳৪,৪০০', level: 'মিডলেভেল', icon: '⚛️' },
]

const categories = ['সব', 'প্রোগ্রামিং', 'ডিজাইন', 'মার্কেটিং', 'ডাটা সায়েন্স']

export default function Courses() {
  const [selected, setSelected] = useState('সব')

  const filtered = selected === 'সব' ? courses : courses.filter(c => c.category === selected)

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: 36, fontWeight: 'bold', color: '#00ff88', textAlign: 'center', marginBottom: 32 }}>সব কোর্স</h1>

        {/* Filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 32 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                border: 'none',
                background: selected === cat ? '#00ff88' : '#111',
                color: selected === cat ? '#000' : '#888',
                fontWeight: selected === cat ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
          {filtered.map(course => (
            <div key={course.id} style={{ background: '#111', borderRadius: 16, padding: 20, border: '1px solid #00ff8810' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{course.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>{course.title}</h3>
              <span style={{ color: '#00ff88', fontSize: 12, background: '#00ff8810', padding: '2px 8px', borderRadius: 4 }}>{course.category}</span>
              <span style={{ color: '#888', fontSize: 12, marginLeft: 8 }}>{course.level}</span>
              <div style={{ marginTop: 12 }}>
                <span style={{ background: '#00ff88', color: '#000', padding: '4px 12px', borderRadius: 6, fontWeight: 'bold' }}>{course.price}</span>
                <span style={{ color: '#666', textDecoration: 'line-through', marginLeft: 8 }}>{course.old}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888', padding: 40 }}>কোনো কোর্স পাওয়া যায়নি</p>
        )}
      </div>
    </div>
  )
   }
