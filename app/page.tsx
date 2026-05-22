'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < 'শেখার নতুন পথ...'.length) {
        setTypedText('শেখার নতুন পথ...'.slice(0, i + 1))
        i++
      } else clearInterval(timer)
    }, 150)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, background: 'rgba(10,10,10,0.9)', borderBottom: '1px solid #00ff8820' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: 24, fontWeight: 'bold', color: '#00ff88' }}>📚 Education Flow</span>
          </Link>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>হোম</Link>
            <Link href="/courses" style={{ color: 'white', textDecoration: 'none' }}>কোর্স</Link>
            <Link href="/admin/login" style={{ color: '#00ff88', textDecoration: 'none' }}>লগইন</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: 128, paddingBottom: 80, textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 'bold', marginBottom: 24 }}>
            <span style={{ color: 'white' }}>কম্পিউটার শিখুন </span>
            <span style={{ color: '#00ff88' }}>{typedText}</span>
            <span style={{ animation: 'blink 1s infinite' }}>|</span>
          </h1>
          <p style={{ fontSize: 18, color: '#888', marginBottom: 32 }}>
            বাংলায় সহজ ভাষায় প্রফেশনাল কোর্স। শূন্য থেকে এক্সপার্ট হোন।
          </p>
          <Link href="/courses" style={{ background: '#00ff88', color: '#000', padding: '14px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 'bold', fontSize: 18 }}>
            ফ্রি কোর্স শুরু করুন →
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {[
            { value: '১০,০০০+', label: 'শিক্ষার্থী' },
            { value: '৫০+', label: 'কোর্স' },
            { value: '৫০০+', label: 'ভিডিও' },
            { value: '৯৫%', label: 'সাফল্য' },
          ].map((stat, i) => (
            <div key={i} style={{ padding: 20, borderRadius: 12, border: '1px solid #00ff8840', textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 'bold', color: '#00ff88' }}>{stat.value}</div>
              <div style={{ color: '#888', fontSize: 14 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section style={{ padding: '60px 20px', background: '#0d0d0d' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 32, textAlign: 'center' }}>জনপ্রিয় কোর্স</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
            {[
              { title: 'Complete Web Development', price: '৳২,৫০০', old: '৳৫,০০০', icon: '💻' },
              { title: 'UI/UX Design Masterclass', price: '৳১,৮০০', old: '৳৩,৬০০', icon: '🎨' },
              { title: 'Digital Marketing Pro', price: '৳১,৫০০', old: '৳৩,০০০', icon: '📈' },
            ].map((course, i) => (
              <div key={i} style={{ background: '#111', borderRadius: 16, overflow: 'hidden', border: '1px solid #00ff8810' }}>
                <div style={{ height: 160, background: 'linear-gradient(135deg, #001a0d, #0a0a0a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
                  {course.icon}
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>{course.title}</h3>
                  <div>
                    <span style={{ background: '#00ff88', color: '#000', padding: '4px 12px', borderRadius: 6, fontWeight: 'bold' }}>{course.price}</span>
                    <span style={{ color: '#666', textDecoration: 'line-through', marginLeft: 8 }}>{course.old}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #00ff8820', padding: '32px 20px', textAlign: 'center' }}>
        <p style={{ fontSize: 20, fontWeight: 'bold', color: '#00ff88', marginBottom: 8 }}>📚 Education Flow</p>
        <p style={{ color: '#666', fontSize: 14 }}>© ২০২৪ Education Flow</p>
      </footer>
    </div>
  )
        }
