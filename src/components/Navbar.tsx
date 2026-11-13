import React from 'react';
import { LayoutDashboard, Newspaper, BookOpen, GraduationCap, Lock, ShieldCheck, Moon, Sun } from 'lucide-react';
import { DivisionSettings } from '../types';

interface NavbarProps {
  activeTab: 'dashboard' | 'news' | 'books' | 'works' | 'admin';
  setActiveTab: (tab: 'dashboard' | 'news' | 'books' | 'works' | 'admin') => void;
  settings: DivisionSettings;
  isAdmin: boolean;
  onOpenAdmin: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  settings,
  isAdmin,
  onOpenAdmin,
  isDark,
  onToggleTheme,
}) => {
  const mobileTabs: Array<{
    id: 'dashboard' | 'news' | 'books' | 'works';
    label: string;
    icon: React.ReactNode;
  }> = [
    { id: 'dashboard', label: 'ภาพรวม', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'news', label: 'ข่าวสาร', icon: <Newspaper className="w-5 h-5" /> },
    { id: 'books', label: 'คลังเอกสาร', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'works', label: 'ผลงานวิจัย', icon: <GraduationCap className="w-5 h-5" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0A192F]/95 backdrop-blur-md text-white border-b border-slate-800 shadow-md transition-colors">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2.5 sm:gap-6">
            {/* Zone 1: Brand Wordmark */}
            <div
              className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 md:flex-initial cursor-pointer"
              onClick={() => setActiveTab('dashboard')}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-inner shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="font-bold text-xs sm:text-base leading-snug tracking-normal text-white truncate sm:max-w-[260px]">
                  {settings.divisionName}
                </h1>
                <p className="text-[10px] sm:text-[11px] text-slate-300 truncate sm:max-w-[280px]">
                  {settings.organizationName}
                </p>
              </div>
            </div>

            {/* Zone 2: Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-3 py-2 text-xs lg:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>แดชบอร์ดภาพรวม</span>
              </button>

              <button
                onClick={() => setActiveTab('news')}
                className={`flex items-center gap-2 px-3 py-2 text-xs lg:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'news'
                    ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Newspaper className="w-4 h-4" />
                <span>ข่าวและประกาศ</span>
              </button>

              <button
                onClick={() => setActiveTab('books')}
                className={`flex items-center gap-2 px-3 py-2 text-xs lg:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'books'
                    ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>คลังหนังสือ/เอกสาร</span>
              </button>

              <button
                onClick={() => setActiveTab('works')}
                className={`flex items-center gap-2 px-3 py-2 text-xs lg:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'works'
                    ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>ผลงานวิชาการ/วิจัย</span>
              </button>
            </nav>

            {/* Zone 3: Primary Action (Admin Access) & Theme Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={onOpenAdmin}
                className={`flex items-center justify-center gap-1.5 min-h-[40px] sm:min-h-0 px-3 sm:px-3.5 py-2 text-xs font-semibold rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-emerald-500 text-slate-950'
                    : isAdmin
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                {isAdmin ? <ShieldCheck className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isAdmin ? 'หน้าจัดการ Admin' : 'จัดการ Admin'}</span>
                <span className="sm:hidden">{isAdmin ? 'Admin' : 'Admin'}</span>
              </button>

              <button
                onClick={onToggleTheme}
                title={isDark ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'}
                className="min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0 flex items-center justify-center p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                aria-label="สลับโหมดการแสดงผล"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-200" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Thumb-Zone Navigation */}
      <nav
        aria-label="เมนูหลักมือถือ"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] pb-safe"
      >
        <div className="grid grid-cols-4 items-center h-14 px-1">
          {mobileTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center min-h-[48px] rounded-xl transition-colors cursor-pointer active:scale-95 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-blue-50 dark:bg-blue-950/60' : ''}`}>
                  {tab.icon}
                </div>
                <span className="text-[10px] leading-none mt-0.5 whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
