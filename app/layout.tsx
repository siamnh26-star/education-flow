export const metadata = {
  title: 'Education Flow - শেখার নতুন পথ',
  description: 'বাংলায় প্রফেশনাল কোর্স শিখুন',
}

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body style={{ margin: 0, padding: 0, background: '#0a0a0a', color: 'white', fontFamily: 'Segoe UI, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
