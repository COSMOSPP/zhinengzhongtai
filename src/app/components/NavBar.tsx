import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  Database, Monitor, LogIn, BellRing,
  ChevronDown, Tag, Activity, Brain,
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  dropdown?: { label: string; path: string; icon: React.ComponentType<{ className?: string }> }[];
}

const navItems: NavItem[] = [
  { label: '首页', path: '/' },
  { label: '能力开放', path: '/capability-dev' },
  { label: '数据治理', path: '/data-governance' },
  { label: '大数据开发工具', path: '/dev-tools' },
  {
    label: 'AI能力',
    path: '/ai',
    dropdown: [
      { label: 'AI 标注', path: '/ai/annotation', icon: Tag },
      { label: 'AI 训练', path: '/ai/training', icon: Activity },
      { label: 'AI 推理', path: '/ai/inference', icon: Brain },
    ],
  },
  { label: '系统管理', path: '/system-mgmt' },
];

export function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav
      className="h-14 flex items-center justify-between px-4 shadow-lg fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        background: 'linear-gradient(135deg, #070e1f 0%, #0c1a3a 55%, #091528 100%)',
        borderColor: 'rgba(250,84,28,0.20)',
      }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 min-w-max shrink-0">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md"
          style={{ background: 'linear-gradient(135deg,#fa541c,#ff7a45)' }}
        >
          <Database className="w-4 h-4 text-white" />
        </div>
        <span
          className="whitespace-nowrap bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(90deg,#ff9c6e,#fa541c,#ffc069)',
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.6px',
          }}
        >
          数据智能中台
        </span>
      </Link>

      {/* Nav links */}
      <div ref={dropdownRef} className="flex items-center gap-0.5 flex-1 justify-center px-3">
        {navItems.map((item) => {
          const active = isActive(item.path);

          if (item.dropdown) {
            const dropOpen = openDropdown === item.label;
            return (
              <div key={item.path} className="relative">
                <button
                  onClick={() => setOpenDropdown(dropOpen ? null : item.label)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                    active || dropOpen
                      ? 'text-[#fa541c] bg-[#fa541c]/15 border border-[#fa541c]/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/8'
                  }`}
                  style={{ fontSize: '13px' }}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown panel */}
                {dropOpen && (
                  <div
                    className="absolute top-full left-0 mt-1.5 min-w-[140px] rounded-xl overflow-hidden shadow-2xl border"
                    style={{
                      background: 'linear-gradient(135deg,#0c1a3a,#0f2040)',
                      borderColor: 'rgba(250,84,28,0.25)',
                      zIndex: 100,
                    }}
                  >
                    {item.dropdown.map((sub, idx) => {
                      const subActive = location.pathname === sub.path || location.pathname.startsWith(sub.path + '/');
                      return (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          onClick={() => setOpenDropdown(null)}
                          className={`flex items-center gap-2.5 px-4 py-2.5 transition-all ${
                            idx < item.dropdown!.length - 1 ? 'border-b' : ''
                          } ${
                            subActive
                              ? 'text-[#fa541c] bg-[#fa541c]/12'
                              : 'text-slate-300 hover:text-white hover:bg-white/8'
                          }`}
                          style={{
                            fontSize: '13px',
                            borderColor: 'rgba(255,255,255,0.06)',
                          }}
                        >
                          <sub.icon className={`w-3.5 h-3.5 shrink-0 ${subActive ? 'text-[#fa541c]' : 'text-slate-400'}`} />
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                active
                  ? 'text-[#fa541c] bg-[#fa541c]/15 border border-[#fa541c]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/8'
              }`}
              style={{ fontSize: '13px' }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button className="relative w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:text-yellow-400 hover:bg-yellow-400/10 transition-all">
          <BellRing className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-slate-900" />
        </button>

        <div className="flex items-center gap-0.5 border-x border-slate-700 px-2 mx-1">
          <Link
            to="/system-mgmt"
            title="系统管理"
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-all ${
              isActive('/system-mgmt')
                ? 'text-[#fa541c] bg-[#fa541c]/15'
                : 'text-slate-400 hover:text-[#fa541c] hover:bg-[#fa541c]/10'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </Link>
        </div>

        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white transition-all shadow-md"
          style={{
            background: 'linear-gradient(135deg,#fa541c,#ff7a45)',
            fontSize: '13px',
          }}
        >
          <LogIn className="w-3.5 h-3.5" />
          登录 / 注册
        </button>
      </div>
    </nav>
  );
}