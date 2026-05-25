'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface Coupon {
  id: string;
  code: string;
  discount: number;
  limit: number;
  used: number;
  active: boolean;
  expiry: string;
  applicableCourses: number[];
}

interface Course {
  id: number;
  title: string;
  selected: boolean;
}

interface Slide {
  image: string;
  link: string;
}

interface SiteSettings {
  logoUrl: string;
  slides: Slide[];
}

const ADMIN_EMAIL = 'jaman2152@gmail.com'; // Change to your email

const initialCourses: Course[] = [
  { id: 1, title: 'Web Development', selected: false },
  { id: 2, title: 'UI/UX Design', selected: false },
  { id: 3, title: 'Digital Marketing', selected: false },
  { id: 4, title: 'Python Data Science', selected: false },
];

export default function AdminDashboard() {
  const { data: session } = useSession();

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  
  const [settings, setSettings] = useState<SiteSettings>({
    logoUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100',
    slides: [
      { image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600', link: 'https://t.me/Education_Flow' },
      { image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600', link: 'https://t.me/Education_Flow' },
      { image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600', link: 'https://t.me/Education_Flow' },
      { image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600', link: 'https://t.me/Education_Flow' },
    ]
  });

  const [newCoupon, setNewCoupon] = useState({
    discount: '',
    limit: '',
    expiry: '',
    customCode: '',
    useCustom: false,
  });

  const [newSlide, setNewSlide] = useState({ image: '', link: '' });
  const [newLogo, setNewLogo] = useState('');

  // Check admin
  if (!session || session.user?.email !== ADMIN_EMAIL) {
    redirect('/main');
  }

  // Generate Random Coupon Code
  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  const addCoupon = () => {
    const selectedCourseIds = courses.filter(c => c.selected).map(c => c.id);
    
    const coupon: Coupon = {
      id: Date.now().toString(),
      code: newCoupon.useCustom && newCoupon.customCode 
        ? newCoupon.customCode.toUpperCase() 
        : generateRandomCode(),
      discount: Number(newCoupon.discount),
      limit: Number(newCoupon.limit),
      used: 0,
      active: true,
      expiry: newCoupon.expiry || '2026-12-31',
      applicableCourses: selectedCourseIds.length > 0 ? selectedCourseIds : [1, 2, 3, 4],
    };
    
    setCoupons([...coupons, coupon]);
    setNewCoupon({ discount: '', limit: '', expiry: '', customCode: '', useCustom: false });
    // Reset course selection
    setCourses(initialCourses);
  };

  const toggleCourse = (id: number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, selected: !c.selected } : c));
  };

  const toggleCoupon = (id: string) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter(c => c.id !== id));
  };

  // Site Settings Functions
  const updateLogo = () => {
    if (newLogo) {
      setSettings({ ...settings, logoUrl: newLogo });
      setNewLogo('');
    }
  };

  const addSlide = () => {
    if (newSlide.image && newSlide.link) {
      setSettings({
        ...settings,
        slides: [...settings.slides, { ...newSlide }]
      });
      setNewSlide({ image: '', link: '' });
    }
  };

  const removeSlide = (index: number) => {
    setSettings({
      ...settings,
      slides: settings.slides.filter((_, i) => i !== index)
    });
  };

  const updateSlideLink = (index: number, newLink: string) => {
    const updatedSlides = [...settings.slides];
    updatedSlides[index].link = newLink;
    setSettings({ ...settings, slides: updatedSlides });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-500">Admin Dashboard</h1>
            <p className="text-green-600">Manage site settings, coupons & courses</p>
          </div>
          <Link href="/main" className="text-green-400 border border-green-500 px-4 py-2 rounded hover:bg-green-900/30">
            ← Back to Site
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#111] p-4 rounded-xl border border-green-900/50">
            <h3 className="text-green-600 text-sm">Active Coupons</h3>
            <p className="text-2xl font-bold text-white">{coupons.filter(c => c.active).length}</p>
          </div>
          <div className="bg-[#111] p-4 rounded-xl border border-green-900/50">
            <h3 className="text-green-600 text-sm">Total Used</h3>
            <p className="text-2xl font-bold text-white">{coupons.reduce((a, c) => a + c.used, 0)}</p>
          </div>
          <div className="bg-[#111] p-4 rounded-xl border border-green-900/50">
            <h3 className="text-green-600 text-sm">Total Slides</h3>
            <p className="text-2xl font-bold text-white">{settings.slides.length}</p>
          </div>
        </div>

        {/* Site Settings */}
        <div className="bg-[#111] rounded-xl border border-purple-900/50 p-6 mb-8">
          <h2 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
            <span>🎨</span> Site Settings
          </h2>
          
          {/* Logo Settings */}
          <div className="mb-6">
            <h3 className="text-green-400 text-sm mb-3 font-bold">Front Page Logo</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 glow-blue flex-shrink-0">
                <img src={settings.logoUrl} alt="Current Logo" className="w-full h-full object-cover"/>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter new logo image URL"
                  className="bg-black border border-purple-500 p-3 rounded text-purple-400 w-full mb-2"
                  value={newLogo}
                  onChange={(e) => setNewLogo(e.target.value)}
                />
                <button 
                  onClick={updateLogo}
                  className="bg-purple-600 text-black px-4 py-2 rounded font-bold text-sm hover:bg-purple-500"
                >
                  Update Logo
                </button>
              </div>
            </div>
          </div>

          {/* Slideshow Settings */}
          <div>
            <h3 className="text-green-400 text-sm mb-3 font-bold">Slideshow Images</h3>
            
            {/* Add New Slide */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <input
                type="text"
                placeholder="Image URL"
                className="bg-black border border-purple-500 p-3 rounded text-purple-400"
                value={newSlide.image}
                onChange={(e) => setNewSlide({...newSlide, image: e.target.value})}
              />
              <input
                type="text"
                placeholder="Telegram Channel Link"
                className="bg-black border border-purple-500 p-3 rounded text-purple-400"
                value={newSlide.link}
                onChange={(e) => setNewSlide({...newSlide, link: e.target.value})}
              />
            </div>
            <button 
              onClick={addSlide}
              className="w-full bg-purple-600 text-black py-2 rounded font-bold hover:bg-purple-500 mb-4"
            >
              + Add Slide
            </button>

            {/* Slide List */}
            <div className="space-y-3">
              {settings.slides.map((slide, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-black rounded-xl border border-purple-900/30">
                  <div className="relative w-20 h-12 flex-shrink-0">
                    <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded"/>
                    <span className="absolute top-0 left-0 bg-purple-600 text-black text-xs px-1.5 py-0.5 rounded-br font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={slide.link}
                      onChange={(e) => updateSlideLink(index, e.target.value)}
                      className="bg-transparent border-b border-purple-900 text-purple-400 text-xs w-full focus:outline-none focus:border-purple-500"
                    />
                    <p className="text-gray-600 text-xs mt-1 truncate">{slide.image}</p>
                  </div>
                  <button 
                    onClick={() => removeSlide(index)}
                    className="text-red-400 border border-red-500 px-2 py-1 rounded text-xs hover:bg-red-900/30 flex-shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coupon Generator */}
        <div className="bg-[#111] rounded-xl border border-blue-900/50 p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
            <span>🎫</span> Coupon Generator
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <input
              type="number"
              placeholder="Discount %"
              className="bg-black border border-blue-500 p-3 rounded text-blue-400"
              value={newCoupon.discount}
              onChange={e => setNewCoupon({...newCoupon, discount: e.target.value})}
            />
            <input
              type="number"
              placeholder="Usage Limit"
              className="bg-black border border-blue-500 p-3 rounded text-blue-400"
              value={newCoupon.limit}
              onChange={e => setNewCoupon({...newCoupon, limit: e.target.value})}
            />
            <input
              type="date"
              className="bg-black border border-blue-500 p-3 rounded text-blue-400"
              value={newCoupon.expiry}
              onChange={e => setNewCoupon({...newCoupon, expiry: e.target.value})}
            />
            <div className="flex items-center gap-2 bg-black border border-blue-500 p-3 rounded">
              <input
                type="checkbox"
                checked={newCoupon.useCustom}
                onChange={e => setNewCoupon({...newCoupon, useCustom: e.target.checked})}
                className="w-4 h-4 accent-blue-500"
              />
              <span className="text-blue-400 text-sm">Custom Code</span>
            </div>
          </div>

          {newCoupon.useCustom && (
            <input
              type="text"
              placeholder="Enter Custom Code (e.g. SAVE20)"
              className="bg-black border border-blue-500 p-3 rounded text-blue-400 w-full mb-4"
              value={newCoupon.customCode}
              onChange={e => setNewCoupon({...newCoupon, customCode: e.target.value})}
            />
          )}

          {/* Applicable Courses */}
          <div className="mb-4">
            <p className="text-blue-400 text-sm mb-2 font-bold">Applicable Courses:</p>
            <div className="flex gap-2 flex-wrap">
              {courses.map(course => (
                <button
                  key={course.id}
                  onClick={() => toggleCourse(course.id)}
                  className={`px-3 py-1.5 rounded text-xs border transition-all ${
                    course.selected 
                      ? 'bg-blue-600 text-black border-blue-500' 
                      : 'bg-black text-blue-400 border-blue-800 hover:border-blue-600'
                  }`}
                >
                  {course.selected ? '✓ ' : ''}{course.title}
                </button>
              ))}
            </div>
            <p className="text-gray-600 text-xs mt-2">If none selected, coupon applies to all courses</p>
          </div>

          <button 
            onClick={addCoupon}
            className="w-full bg-blue-600 text-black font-bold py-3 rounded hover:bg-blue-500 transition-all"
          >
            {newCoupon.useCustom ? 'Create Custom Coupon' : 'Generate Random Coupon'}
          </button>
        </div>

        {/* Coupon List */}
        <div className="bg-[#111] rounded-xl border border-green-900/50 p-6">
          <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <span>📋</span> Active Coupons
          </h2>
          
          {coupons.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No coupons created yet</p>
          ) : (
            <div className="space-y-3">
              {coupons.map(coupon => (
                <div key={coupon.id} className="flex justify-between items-center p-4 bg-black rounded-xl border border-green-900/30">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono font-bold text-blue-400 text-lg">{coupon.code}</span>
                      <span className="text-green-400 font-bold">{coupon.discount}% OFF</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${coupon.active ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
                        {coupon.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="text-gray-500 text-xs">
                      Used: {coupon.used}/{coupon.limit} | Expires: {coupon.expiry} | Courses: {coupon.applicableCourses.length}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleCoupon(coupon.id)} className="text-blue-400 border border-blue-500 px-3 py-1.5 rounded hover:bg-blue-900/30 text-sm">
                      {coupon.active ? 'Disable' : 'Enable'}
                    </button>
                    <button onClick={() => deleteCoupon(coupon.id)} className="text-red-400 border border-red-500 px-3 py-1.5 rounded hover:bg-red-900/30 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  }
'use client';

// Add to state
const [settings, setSettings] = useState<<SiteSettings>({
  logoUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100',
  slides: [
    { image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600', link: 'https://t.me/yourchannel1' },
  ]
});

// Load from localStorage on mount
useEffect(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('education_flow_settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }
}, []);

// Save to localStorage
const saveSettings = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('education_flow_settings', JSON.stringify(settings));
    alert('Settings saved! (Note: This is temporary without server)');
  }
};
